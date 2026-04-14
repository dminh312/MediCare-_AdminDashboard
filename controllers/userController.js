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
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
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
        // Delete from Firebase Auth if desired (uncomment if you want to also remove Auth accounts)
        // await adminAuth.deleteUser(uid);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
