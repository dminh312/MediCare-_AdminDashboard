const { adminAuth, db } = require('../models/firebase');
const crypto = require('crypto');

const generateRandomPassword = () => crypto.randomBytes(16).toString('hex') + 'A1!';

exports.verifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    try {
        let user;
        let newPassword = null;
        try {
            user = await adminAuth.getUserByEmail(email);
        } catch (e) {
            newPassword = generateRandomPassword();
            user = await adminAuth.createUser({
                email,
                password: newPassword,
                emailVerified: false
            });
        }
        
        const apiKey = process.env.FIREBASE_API_KEY;
        if(!apiKey) {
            return res.status(500).json({ success: false, message: 'Server missing FIREBASE_API_KEY' });
        }

        if (newPassword) {
            const signInRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: newPassword, returnSecureToken: true })
            });

            const signInData = await signInRes.json();
            if (signInData.error) throw new Error(signInData.error.message);

            const verifyRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken: signInData.idToken })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.error) throw new Error(verifyData.error.message);

            return res.json({ success: true, message: 'Verification email sent' });
        } else {
            // Unlikely in this flow, but if user existed we generate a link
            const link = await adminAuth.generateEmailVerificationLink(email);
            console.log("Verification Link (Simulated sent):", link);
            return res.json({ success: true, message: 'Verification link simulated' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.checkVerification = async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ emailVerified: false });
    try {
        const user = await adminAuth.getUserByEmail(email);
        res.json({ emailVerified: user.emailVerified });
    } catch (e) {
        res.json({ emailVerified: false });
    }
};

exports.finalize = async (req, res) => {
    const { fullName, email, phoneNumber, staffId, role } = req.body;
    try {
        const user = await adminAuth.getUserByEmail(email);
        if (!user.emailVerified) {
            return res.status(400).json({ success: false, message: 'Email must be verified first' });
        }

        await adminAuth.setCustomUserClaims(user.uid, { admin: role === 'Admin' });

        await adminAuth.updateUser(user.uid, {
            displayName: fullName,
            phoneNumber: phoneNumber || null
        });

        await db.collection('staff').doc(user.uid).set({
            uid: user.uid,
            staffId: staffId || user.uid.substring(0,6).toUpperCase(),
            fullName,
            email,
            phoneNumber: phoneNumber || '',
            role,
            createdAt: new Date().toISOString()
        });

        res.json({ success: true, message: 'Staff fully finalized' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
