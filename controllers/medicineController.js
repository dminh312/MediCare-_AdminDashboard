const { db } = require('../models/firebase');

exports.getMedicines = async (req, res) => {
    try {
        const snapshot = await db.collection('medicines').orderBy('createdAt', 'desc').get();
        const medicines = [];
        snapshot.forEach(doc => {
            medicines.push({ id: doc.id, ...doc.data() });
        });
        res.json({ success: true, medicines });
    } catch (error) {
        console.error("Get medicines error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addMedicine = async (req, res) => {
    const { name, searchName } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    try {
        const newDoc = db.collection('medicines').doc();
        const newMedicine = {
            id: newDoc.id,
            name,
            searchName: searchName || name.toLowerCase(),
            createdAt: new Date().toISOString()
        };
        await newDoc.set(newMedicine);
        res.json({ success: true, medicine: newMedicine });
    } catch (error) {
        console.error("Add medicine error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
