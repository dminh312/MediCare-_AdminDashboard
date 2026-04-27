const { db } = require('../models/firebase');

exports.getStats = async (req, res) => {
    try {
        // Total Users and Monthly Registrations
        let totalUsers = 0;
        let monthlyRegistrations = new Array(12).fill(0);
        let weeklyRegistrations = new Array(7).fill(0);
        try {
            const usersSnap = await db.collection('users').where('role', '==', 'user').get();
            if (usersSnap.size > 0) {
                totalUsers = usersSnap.size;
            }
            

            const currentYear = new Date().getFullYear();
            const now = new Date();
            const startOfWeek = new Date(now);
            const currentDayOfWeek = now.getDay() || 7; // 1(Mon) to 7(Sun)
            startOfWeek.setDate(now.getDate() - currentDayOfWeek + 1);
            startOfWeek.setHours(0, 0, 0, 0);
            
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 7);

            usersSnap.forEach(doc => {
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
                    if (!isNaN(date.getTime()) && date >= startOfWeek && date < endOfWeek) {
                        const dow = date.getDay() || 7;
                        weeklyRegistrations[dow - 1] += 1;
                    }
                }
            });
        } catch (e) {
            console.warn("Failed to get users", e);
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
                totalUsers,
                staffOnline: totalStaff, // or whatever real online metric you want
                totalStaff: totalStaff,
                activeChats,
                staffDistribution,
                monthlyRegistrations,
                weeklyRegistrations
            }
        });
    } catch (err) {
        console.error("Dashboard stats error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
