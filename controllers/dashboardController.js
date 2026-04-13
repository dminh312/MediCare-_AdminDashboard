const { db } = require('../models/firebase');

exports.getStats = async (req, res) => {
    try {
        // Total Patients and Monthly Registrations
        let totalPatients = 0;
        let monthlyRegistrations = new Array(12).fill(0);
        try {
            const patientsSnap = await db.collection('users').where('role', '==', 'user').get();
            if (patientsSnap.size > 0) {
                totalPatients = patientsSnap.size;
            }
            
            const currentYear = new Date().getFullYear();
            patientsSnap.forEach(doc => {
                const data = doc.data();
                if (data.createdAt) {
                    let date;
                    if (data.createdAt.toDate) {
                        date = data.createdAt.toDate();
                    } else {
                        date = new Date(data.createdAt);
                    }
                    if (!isNaN(date.getTime()) && date.getFullYear() === currentYear) {
                        monthlyRegistrations[date.getMonth()] += 1;
                    }
                }
            });
        } catch (e) {
            console.warn("Failed to get patients", e);
        }

        // Staff stats & distribution
        let totalStaff = 0;
        let staffDistribution = {
            Admin: 0,
            Other: 0
        };

        try {
            const staffSnap = await db.collection('staff').get();
            totalStaff = staffSnap.size;
            
            staffSnap.forEach(doc => {
                const data = doc.data();
                const role = data.role ? data.role.toLowerCase() : '';
                if (role.includes('admin')) staffDistribution.Admin += 1;
                else staffDistribution.Other += 1;
            });
        } catch (e) {
            console.warn("Failed to get staff", e);
        }

        // Active Support Chats
        let activeChats = 0;
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
                staffOnline: totalStaff, // or whatever real online metric you want
                totalStaff: totalStaff,
                activeChats,
                staffDistribution,
                monthlyRegistrations
            }
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
