const { db } = require('../models/firebase');

let ioInstance = null;

const initSocket = (io) => {
    ioInstance = io;

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        // Admin might want to send a reply via Socket.io to Firebase
        socket.on('send_message', async (data) => {
            // Data expected: { chatId: '123', text: 'Hello', senderId: 'admin' }
            try {
                const { chatId, text, senderId } = data;
                if (!chatId || !text) return;

                const messageRef = db.collection('chats').doc(chatId).collection('messages').doc();
                await messageRef.set({
                    text: text,
                    senderId: senderId || 'admin',
                    timestamp: new Date(),
                    read: false
                });

                // Update the main chat doc timestamp
                await db.collection('chats').doc(chatId).set({
                    lastMessage: text,
                    lastUpdated: new Date()
                }, { merge: true });

            } catch (error) {
                console.error("Error sending message via socket: ", error);
            }
        });
    });

    // Listen to changes in Firestore "chats" collection (all messages to notify Admin)
    // In a real scenario, we might listen to all chats. We will query the root "chats" for unread or fresh updates.
    const unsubscribeChats = db.collection('chats').orderBy('lastUpdated', 'desc')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added' || change.type === 'modified') {
                    // Alert frontend
                    const chatData = change.doc.data();
                    const chatId = change.doc.id;
                    
                    io.emit('chat_updated', {
                        chatId: chatId,
                        ...chatData
                    });

                    // If we need dot notification for *new* messages sent by users
                    // We can emit a specific ping.
                    // This is handled if last message is not by admin
                }
            });
        }, (error) => {
            console.error("Firestore listen error: ", error);
        });

    // We also need robust real-time for messages in ALL chats if we want dot notifications.
    // However, Firebase doesn't allow listening to all subcollections across the db easily without Collection Group Queries.
    // For MVP, we will use a collectionGroup query on "messages".
    const unsubscribeMessages = db.collectionGroup('messages').orderBy('timestamp', 'desc').limit(50)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const msgData = change.doc.data();
                    const msgPath = change.doc.ref.path; // e.g. chats/{chatId}/messages/{msgId}
                    const chatId = msgPath.split('/')[1];

                    // Notify frontend socket
                    io.emit('new_message', {
                        chatId: chatId,
                        messageId: change.doc.id,
                        ...msgData
                    });
                }
            });
        }, (error) => {
            console.error("Firestore message listen error: ", error);
        });
};

module.exports = {
    initSocket
};
