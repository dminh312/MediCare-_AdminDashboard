const { adminAuth, db } = require('../models/firebase');

exports.getUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').where('role', '==', 'user').get();
        let users = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            let status = 'Active'; // You can fetch real status from your design logic if available
            users.push({ 
                id: doc.id,
                name: data.fullName || data.name || data.displayName || 'Unknown Patient',
                email: data.email || 'No email',
                role: 'User',
                status: status,
                ...data
            });
        });
        
        // Sort manually by createdAt descending
        users.sort((a, b) => {
            let dateA = new Date(0), dateB = new Date(0);
            if (a.createdAt) {
                dateA = a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            }
            if (b.createdAt) {
                dateB = b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            }
            return dateB - dateA;
        });

        res.json({ success: true, users });
    } catch (err) {
        console.error("Get users error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        // Delete from Firestore
        await db.collection('users').doc(uid).delete();
        
        try {
            // Delete from Firebase Auth
            await adminAuth.deleteUser(uid);
        } catch (authErr) {
            console.warn("Could not delete from Auth (might not exist):", authErr.message);
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.addUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    try {
        const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });

        const newUser = {
            uid: userRecord.uid,
            displayName: name,
            email,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            preferences: {
                autoSyncInterval: 60,
                healthConnectEnabled: false,
                notificationsEnabled: true
            }
        };

        await db.collection('users').doc(userRecord.uid).set(newUser);
        res.json({ success: true, message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error("Add user error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
