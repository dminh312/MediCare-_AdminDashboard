const { adminAuth } = require('../models/firebase');

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
        
        // Hoặc trả về thông tin user
        res.status(200).json({ 
            success: true, 
            message: 'Đăng nhập thành công',
            user: { uid: decodedToken.uid, email: decodedToken.email }, 
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
