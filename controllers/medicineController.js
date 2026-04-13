const { db } = require('../models/firebase');

exports.getMedicines = async (req, res) => {
    try {
        const snapshot = await db.collection('medications_library').get();
        const medicines = [];
        snapshot.forEach(doc => {
            medicines.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort in memory instead so we don't miss docs without createdAt
        medicines.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB - dateA;
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
        const newDoc = db.collection('medications_library').doc();
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

exports.updateMedicine = async (req, res) => {
    const { id } = req.params;
    const { name, searchName } = req.body;
    
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

    try {
        const docRef = db.collection('medications_library').doc(id);
        const updatedData = {
            name,
            searchName: searchName || name.toLowerCase(),
            updatedAt: new Date().toISOString()
        };
        await docRef.update(updatedData);
        res.json({ success: true, medicine: { id, ...updatedData } });
    } catch (error) {
        console.error("Update medicine error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('medications_library').doc(id).delete();
        res.json({ success: true, message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error("Delete medicine error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
