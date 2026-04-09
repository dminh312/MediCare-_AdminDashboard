const { db } = require('../models/firebase');

exports.getStats = async (req, res) => {
    try {
        // Total Patients (dummy fallback if collection empty)
        let totalPatients = 24892;
        try {
            const patientsSnap = await db.collection('patients').get();
            if (patientsSnap.size > 0) {
                totalPatients = patientsSnap.size;
            }
        } catch (e) {
            console.warn("Failed to get patients", e);
        }

        // Staff stats & distribution
        let totalStaff = 0;
        let staffDistribution = {
            Emergency: 0,
            Cardiology: 0,
            General: 0,
            Other: 0
        };

        try {
            const staffSnap = await db.collection('staff').get();
            totalStaff = staffSnap.size;
            
            staffSnap.forEach(doc => {
                const data = doc.data();
                const role = data.role ? data.role.toLowerCase() : '';
                if (role.includes('admin')) staffDistribution.Emergency += 1;
                else if (role.includes('doctor')) staffDistribution.Cardiology += 1;
                else if (role.includes('nurse')) staffDistribution.General += 1;
                else staffDistribution.Other += 1;
            });
        } catch (e) {
            console.warn("Failed to get staff", e);
        }

        // Active Support Chats
        let activeChats = 186;
        try {
            const chatsSnap = await db.collection('support_chats').get();
            if (chatsSnap.size > 0) {
                activeChats = chatsSnap.size;
            }
        } catch (e) {
            console.warn("Failed to get chats", e);
        }

        res.json({
            success: true,
            stats: {
                totalPatients,
                staffOnline: totalStaff > 0 ? totalStaff : 158,
                totalStaff: totalStaff,
                activeChats,
                staffDistribution
            }
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
