<template>
  <div class="h-screen bg-slate-50 dark:bg-slate-900/50 flex flex-col overflow-hidden font-['Inter'] min-w-0">
      
      <!-- Top header -->
      <header class="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm shadow-slate-100">
          <div>
              <h2 class="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-200">Support Center</h2>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1 flex items-center gap-2">
                Live Messaging 
                <span class="inline-flex h-2 w-2 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span class="text-emerald-500 text-xs font-bold uppercase tracking-wider">Connected</span>
              </p>
          </div>
          <div class="flex items-center gap-4">
              <div class="h-10 w-10 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 font-bold overflow-hidden shadow-sm shadow-slate-200">
                  A
              </div>
          </div>
      </header>
      
      <!-- Error Banner -->
      <div v-if="errorMsg" class="bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 border-b border-red-200 p-4 shrink-0 shadow-sm z-20 flex items-start gap-3">
          <span class="material-symbols-outlined text-red-500">error</span>
          <div>
              <p class="font-bold text-red-800 dark:text-red-300 text-sm">Firebase Connection Error</p>
              <p class="text-sm font-mono text-red-600 mt-1">{{ errorMsg }}</p>
              <button @click="handleLogout" class="mt-2 text-xs bg-red-100 dark:bg-red-900/40 hover:bg-red-200 text-red-800 dark:text-red-300 px-3 py-1.5 rounded font-bold transition-colors">
                  Try Logging Out and Logging in again to fix permission errors
              </button>
          </div>
      </div>
      
      <!-- Chat Workspace -->
      <main class="flex-1 flex overflow-hidden">
          
          <!-- Chat List -->
          <div class="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0 relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
              <div class="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50">
                  <div class="relative">
                      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-lg">search</span>
                      <input type="text" placeholder="Search conversations..." class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#ff5252]/20 focus:border-[#ff5252] outline-none transition-all placeholder:text-slate-400 dark:text-slate-400 text-slate-700 dark:text-slate-200 shadow-sm">
                  </div>
              </div>
              
              <div class="flex-1 overflow-y-auto w-full custom-scrollbar">
                  <div v-if="loadingChats" class="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-400">
                      <span class="material-symbols-outlined text-4xl mb-2 animate-spin">refresh</span>
                      <p class="text-sm font-medium">Loading...</p>
                  </div>
                  <div v-else-if="chats.length === 0" class="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-400">
                      <span class="material-symbols-outlined text-4xl mb-2 opacity-50">forum</span>
                      <p class="text-sm font-medium">No conversations yet</p>
                  </div>
                  
                  <div v-for="chat in chats" :key="chat.id" 
                       @click="selectChat(chat)"
                       class="flex gap-4 p-4 cursor-pointer transition-all border-b border-slate-50 last:border-0 relative group"
                       :class="activeChatId === chat.id ? 'bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30' : 'hover:bg-slate-50'">
                      
                      <!-- Red active indicator bar -->
                      <div v-if="activeChatId === chat.id" class="absolute left-0 top-0 bottom-0 w-1 bg-[#ff5252] rounded-r-md"></div>
                      
                      <div class="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-500 font-bold text-lg flex-shrink-0 shadow-sm uppercase">
                          {{ getInitials(chat.userName || chat.userEmail || chat.id) }}
                          <!-- Unread Dot indicator -->
                          <div v-if="chat.unreadCount > 0" class="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-50 dark:bg-red-900/30 dark:bg-red-900/300 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          </div>
                      </div>
                      
                      <div class="flex-1 min-w-0 py-0.5">
                          <div class="flex items-center justify-between mb-1">
                              <h3 class="font-bold text-slate-800 dark:text-slate-200 text-sm truncate" :class="{'text-slate-900 dark:text-slate-100 font-black': chat.unreadCount > 0}">{{ chat.userName || chat.userEmail || ('User ' + chat.id.substring(0,6)) }}</h3>
                              <span class="text-xs font-semibold text-slate-400 dark:text-slate-400 whitespace-nowrap">{{ formatTime(chat.lastUpdated) }}</span>
                          </div>
                          <p class="text-sm truncate pr-2" :class="chat.unreadCount > 0 ? 'text-slate-700 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-400 dark:text-slate-400'">
                              {{ chat.lastMessage || '...' }}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- Chat Window -->
          <div class="flex-1 bg-[#f8fafc] dark:bg-slate-950 flex flex-col relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNWFlNWMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] before:opacity-100">
              
              <template v-if="activeChat">
                  <!-- Active Chat Header -->
                  <div class="h-16 px-6 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between shrink-0 z-10 sticky top-0 shadow-sm shadow-slate-100/50">
                      <div class="flex items-center gap-3">
                          <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-500 font-bold shadow-sm uppercase">
                              {{ getInitials(activeChat.userName || activeChat.userEmail || activeChat.id) }}
                          </div>
                          <div>
                              <h3 class="font-bold text-slate-800 dark:text-slate-200 text-[15px]">{{ activeChat.userName || activeChat.userEmail || ('User ' + activeChat.id.substring(0,8)) }}</h3>
                              <p class="text-xs font-medium text-emerald-500 flex items-center gap-1.5" v-if="activeChat.userEmail">{{ activeChat.userEmail }}</p>
                          </div>
                      </div>
                      <div class="flex gap-2">
                          <button class="h-9 w-9 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:text-[#ff5252] hover:bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 transition-colors shadow-sm">
                              <span class="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                      </div>
                  </div>
                  
                  <!-- Messages Area -->
                  <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-0 flex flex-col w-full" ref="chatArea">
                      <div v-if="loadingMessages" class="flex-1 flex items-center justify-center text-center px-4">
                          <div class="animate-spin text-slate-300 mb-2 material-symbols-outlined text-4xl">refresh</div>
                      </div>
                      
                      <div v-else-if="messages.length === 0" class="flex-1 flex items-center justify-center text-center px-4">
                          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 max-w-sm">
                              <div class="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span class="material-symbols-outlined text-indigo-500">waving_hand</span>
                              </div>
                              <h4 class="text-slate-800 dark:text-slate-200 font-bold mb-1">Say Hello!</h4>
                              <p class="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400 font-medium">This is the beginning of your conversation with {{ activeChat.userName || 'this user' }}.</p>
                          </div>
                      </div>
                      
                      <div v-for="msg in messages" :key="msg.id" 
                           class="flex w-full" 
                           :class="msg.isSupport ? 'justify-end' : 'justify-start'">
                          
                          <div class="max-w-[70%] group flex gap-3" :class="msg.isSupport ? 'flex-row-reverse' : ''">
                             
                             <div v-if="!msg.isSupport" class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xs flex-shrink-0 mt-auto mb-1 uppercase">
                                {{ getInitials(activeChat.userName || activeChat.userEmail || activeChat.id) }}
                             </div>
                              
                             <div class="flex flex-col" :class="msg.isSupport ? 'items-end' : 'items-start'">
                                 <div class="px-5 py-3 rounded-2xl shadow-sm relative text-[15px] font-medium leading-relaxed"
                                      :class="msg.isSupport 
                                          ? 'bg-[#ff5252] text-white dark:text-slate-200 rounded-br-sm' 
                                          : 'bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/60 rounded-bl-sm'">
                                     {{ msg.text }}
                                 </div>
                                 <div class="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                     {{ formatTimeLong(msg.timestamp) }} 
                                     <span v-if="msg.isSupport" class="ml-1 text-emerald-500 material-symbols-outlined text-[11px] align-middle">done_all</span>
                                 </div>
                             </div>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Input Area -->
                  <div class="p-4 bg-white dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700/50 shrink-0 z-10 sticky bottom-0">
                      <div class="max-w-4xl mx-auto flex items-end gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-[#ff5252]/10 transition-all">
                          <button class="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                              <span class="material-symbols-outlined text-[22px]">attach_file</span>
                          </button>
                          
                          <textarea 
                              v-model="newMessage" 
                              @keydown.enter.prevent="sendMessage"
                              placeholder="Type your message..." 
                              class="w-full bg-transparent border-0 resize-none max-h-32 min-h-[40px] py-2 focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:text-slate-400 text-[15px] font-medium custom-scrollbar"
                              rows="1"
                          ></textarea>
                          
                          <button 
                              @click="sendMessage"
                              :disabled="!newMessage.trim() || sending"
                              class="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300"
                              :class="newMessage.trim() && !sending ? 'bg-[#ff5252] text-white dark:text-slate-200 shadow-md shadow-red-500/25 hover:bg-red-600 active:scale-95' : 'bg-slate-100 text-slate-400 dark:text-slate-400'">
                              <span v-if="!sending" class="material-symbols-outlined text-[20px] ml-0.5 pointer-events-none">send</span>
                              <span v-else class="material-symbols-outlined text-[20px] ml-0.5 pointer-events-none animate-spin">refresh</span>
                          </button>
                      </div>
                  </div>
              </template>
              
              <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8 z-10">
                  <div class="h-24 w-24 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 relative">
                      <span class="material-symbols-outlined text-5xl text-slate-300">chat</span>
                      <!-- Decorative blur -->
                      <div class="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-indigo-500/10 blur-xl -z-10 rounded-full opacity-50"></div>
                  </div>
                  <h2 class="text-2xl font-black text-slate-800 dark:text-slate-200 mb-2">Select a Conversation</h2>
                  <p class="text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-sm font-medium">Choose a user from the list on the left to start providing support or view their message history.</p>
              </div>
          </div>
          
      </main>
  </div>
</template>

<script>
import { db } from '../firebase';
import { 
  collection, query, orderBy, onSnapshot, 
  doc, updateDoc, writeBatch, serverTimestamp 
} from 'firebase/firestore';

export default {
  name: 'LivechatSupport',
  data() {
    return {
      activeChatId: null,
      newMessage: '',
      chats: [],
      messages: [],
      loadingChats: true,
      loadingMessages: false,
      sending: false,
      errorMsg: null,
      chatsUnsubscribe: null,
      messagesUnsubscribe: null
    }
  },
  computed: {
    activeChat() {
      if (!this.activeChatId) return null;
      return this.chats.find(c => c.id === this.activeChatId) || null;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('medicare_admin_token');
      this.$router.push('/login');
    },
    getInitials(str) {
        if (!str) return '?';
        return str.substring(0, 2);
    },
    formatTime(timestamp) {
        if (!timestamp) return '';
        let date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    formatTimeLong(timestamp) {
        if (!timestamp) return '';
        let date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    },
    listenToChats() {
      const q = query(collection(db, 'support_chats'), orderBy('lastUpdated', 'desc'));
      this.chatsUnsubscribe = onSnapshot(q, (snapshot) => {
        this.errorMsg = null;
        this.chats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.loadingChats = false;
      }, (error) => {
        console.error("Error fetching chats:", error);
        this.errorMsg = `Failed to load chats: ${error.message} (Code: ${error.code})`;
        this.loadingChats = false;
      });
    },
    selectChat(chat) {
        if (this.activeChatId === chat.id) return;
        this.activeChatId = chat.id;
        
        // Reset unread count
        if (chat.unreadCount > 0) {
            updateDoc(doc(db, 'support_chats', chat.id), {
                unreadCount: 0
            }).catch(e => console.error("Error clearing unread:", e));
        }
        
        this.listenToMessages(chat.id);
    },
    listenToMessages(userId) {
        if (this.messagesUnsubscribe) {
            this.messagesUnsubscribe();
        }
        this.loadingMessages = true;
        this.messages = [];
        
        const q = query(
            collection(db, `support_chats/${userId}/messages`), 
            orderBy('timestamp', 'asc')
        );
        
        this.messagesUnsubscribe = onSnapshot(q, (snapshot) => {
            this.errorMsg = null;
            this.messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.loadingMessages = false;
            this.scrollToBottom();
        }, (error) => {
            console.error("Error fetching messages:", error);
            this.errorMsg = `Failed to load messages: ${error.message} (Code: ${error.code})`;
            this.loadingMessages = false;
        });
    },
    async sendMessage() {
        if (!this.newMessage.trim() || !this.activeChatId) return;
        
        const text = this.newMessage.trim();
        this.sending = true;
        this.newMessage = ''; // Optimistic clear
        
        try {
            const batch = writeBatch(db);
            
            // 1. Add new message
            const newMsgRef = doc(collection(db, `support_chats/${this.activeChatId}/messages`));
            batch.set(newMsgRef, {
                text: text,
                isSupport: true,
                senderId: 'admin',
                timestamp: serverTimestamp()
            });
            
            // 2. Update parent
            const chatRef = doc(db, 'support_chats', this.activeChatId);
            batch.update(chatRef, {
                lastMessage: text,
                lastUpdated: serverTimestamp()
            });
            
            await batch.commit();
            this.scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
            // Revert optimistic clear on error
            this.newMessage = text;
        } finally {
            this.sending = false;
        }
    },
    scrollToBottom() {
        this.$nextTick(() => {
            const el = this.$refs.chatArea;
            if (el) el.scrollTop = el.scrollHeight;
        });
    }
  },
  mounted() {
      this.listenToChats();
  },
  beforeDestroy() {
      if (this.chatsUnsubscribe) this.chatsUnsubscribe();
      if (this.messagesUnsubscribe) this.messagesUnsubscribe();
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}
</style>
