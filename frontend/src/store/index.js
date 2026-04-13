import Vue from 'vue';
import Vuex from 'vuex';
import { io } from 'socket.io-client';

Vue.use(Vuex);

// Connect to Backend Socket.IO Server. Adjust URL if standard backend runs on different port during dev
// Normally proxy handles it if same origin, or specify. Here Express is on 3000 by default.
// In MVP we assume localhost:3000 for backend
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL, {
  autoConnect: false // Connect manually when needed
});

export default new Vuex.Store({
  state: {
    socket: socket,
    chats: {},         // all chats by ID
    unreadCount: 0,
    isConnected: false,
    theme: localStorage.getItem('theme_preference') || 'light'
  },
  mutations: {
    SET_CONNECTED(state, status) {
      state.isConnected = status;
    },
    ADD_MESSAGE(state, { chatId, message }) {
      if (!state.chats[chatId]) {
        Vue.set(state.chats, chatId, {
           id: chatId,
           lastMessage: message.text || "...",
           messages: []
        });
      }
      
      // avoid duplicates
      const exists = state.chats[chatId].messages.find(m => m.id === message.id);
      if (!exists) {
         state.chats[chatId].messages.push(message);
         // sort by timestamp
         state.chats[chatId].messages.sort((a,b) => {
            const ta = a.timestamp?.seconds || a.timestamp || 0;
            const tb = b.timestamp?.seconds || b.timestamp || 0;
            return ta - tb;
         });
      }
      
      // update unread if message not from admin
      if (message.senderId !== 'admin') {
         state.unreadCount += 1;
      }
    },
    RESET_UNREAD(state) {
      state.unreadCount = 0;
    },
    SET_CHAT_METADATA(state, chat) {
      if (!state.chats[chat.chatId]) {
         Vue.set(state.chats, chat.chatId, {
            id: chat.chatId,
            lastMessage: chat.lastMessage,
            messages: []
         });
      } else {
         state.chats[chat.chatId].lastMessage = chat.lastMessage;
      }
    },
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme_preference', theme);
    }
  },
  actions: {
    connectSocket({ commit, state }) {
      if (state.socket.connected) return;
      
      state.socket.connect();
      
      state.socket.on('connect', () => {
        commit('SET_CONNECTED', true);
      });
      
      state.socket.on('disconnect', () => {
        commit('SET_CONNECTED', false);
      });
      
      state.socket.on('new_message', (data) => {
        commit('ADD_MESSAGE', {
           chatId: data.chatId,
           message: {
              id: data.messageId,
              text: data.text,
              senderId: data.senderId,
              timestamp: data.timestamp
           }
        });
      });
      
      state.socket.on('chat_updated', (data) => {
        commit('SET_CHAT_METADATA', data);
      });
    },
    disconnectSocket({ state }) {
       state.socket.disconnect();
    },
    sendMessage({ state }, { chatId, text, senderId = 'admin' }) {
       state.socket.emit('send_message', {
          chatId,
          text,
          senderId: senderId
       });
    },
    markAsRead({ commit }) {
       commit('RESET_UNREAD');
    },
    initTheme({ state }) {
      const applyTheme = (theme) => {
        const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };

      // Apply initially
      applyTheme(state.theme);

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (state.theme === 'auto') {
          applyTheme('auto');
        }
      });
    },
    setTheme({ commit, state }, theme) {
      commit('SET_THEME', theme);
      
      const applyTheme = (t) => {
        const isDark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      applyTheme(theme);
    }
  }
});
