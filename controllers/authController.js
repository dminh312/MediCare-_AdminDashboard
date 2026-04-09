const { adminAuth, db } = require('../models/firebase');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email và password.' });
        }

        const apiKey = process.env.FIREBASE_API_KEY;
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        });
        
        const data = await response.json();

        if (data.error) {
           return res.status(401).json({ success: false, message: 'Thông tin đăng nhập không chính xác', error: data.error.message });
        }

        // Token from REST API
        const token = data.idToken;

        // Optionally verify using Admin SDK just to prove it works
        const decodedToken = await adminAuth.verifyIdToken(token);
        
        // Fetch user from Firestore to get their role
        let role = 'Customer Service'; // fallback
        try {
            const staffDoc = await db.collection('staff').doc(decodedToken.uid).get();
            if (staffDoc.exists && staffDoc.data().role) {
                role = staffDoc.data().role;
            } else {
                // Fallback: check by email if the document ID is not the Auth UID
                const snapshot = await db.collection('staff').where('email', '==', decodedToken.email).limit(1).get();
                if (!snapshot.empty && snapshot.docs[0].data().role) {
                    role = snapshot.docs[0].data().role;
                } else if (decodedToken.email === 'admin@medicare.com') {
                    role = 'admin'; // Ultimate fallback for super admin
                }
            }
        } catch (dbErr) {
            console.error("Error fetching staff role:", dbErr);
            if (decodedToken.email === 'admin@medicare.com') {
                role = 'admin';
            }
        }

        // Hoặc trả về thông tin user
        res.status(200).json({ 
            success: true, 
            message: 'Đăng nhập thành công',
            user: { uid: decodedToken.uid, email: decodedToken.email, role: role }, 
            token: token 
        });
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const apiKey = process.env.FIREBASE_API_KEY;
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestType: 'PASSWORD_RESET', email })
        });
        
        const data = await response.json();
        if (data.error) {
            return res.status(400).json({ success: false, message: data.error.message });
        }
        
        res.json({ success: true, message: 'Reset email sent' });
    } catch (e) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
