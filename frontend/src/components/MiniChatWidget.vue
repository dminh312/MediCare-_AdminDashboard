<template>
  <div class="fixed bottom-8 right-8 z-50 flex flex-col items-end font-['Inter']">
    <!-- Chat Window -->
    <transition name="fade-scale">
      <div v-if="isOpen" class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden w-80 sm:w-96 mb-4 flex flex-col origin-bottom-right transition-all duration-300 h-[500px] max-h-[80vh]">
        
        <!-- Header -->
        <div class="bg-primary text-white dark:text-slate-200 p-4 flex items-center justify-between shadow-sm relative overflow-hidden shrink-0">
          <div class="absolute top-0 right-0 w-24 h-24 rounded-full bg-white dark:bg-slate-900 opacity-10 -mr-8 -mt-8"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white dark:bg-slate-900 opacity-10 -ml-4 -mb-4"></div>
          
          <div class="flex items-center gap-3 relative z-10 w-full">
            <button v-if="activeChatId" @click="goBack" class="h-8 w-8 rounded-full hover:bg-white dark:bg-slate-900/20 flex items-center justify-center transition-colors -ml-2">
                <span class="material-symbols-outlined text-lg">arrow_back_ios_new</span>
            </button>
            <div v-else class="h-9 w-9 bg-white dark:bg-slate-900/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner overflow-hidden font-bold text-sm uppercase">
              {{ getUserInitials('Admin') }}
            </div>
            
            <div class="flex-1 truncate">
              <h3 class="font-bold text-white dark:text-slate-200 text-base leading-tight truncate">
                  {{ activeChatId ? (activeChatName || 'User Chat') : 'Support Inbox' }}
              </h3>
              <p class="text-xs text-white dark:text-slate-200 opacity-90 font-medium flex items-center gap-1.5 mt-0.5">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse"></span> 
                {{ activeChatId ? 'Live' : 'Monitoring incoming queries...' }}
              </p>
            </div>
            
            <button @click="isOpen = false" class="h-8 w-8 rounded-full hover:bg-white dark:bg-slate-900/20 flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <!-- VIEWS -->
        <div class="flex-1 flex flex-col overflow-hidden relative">
            
            <!-- VIEW 1: Inbox List -->
            <div v-if="!activeChatId" class="absolute inset-0 bg-surface flex flex-col overflow-hidden">
                <div class="flex-1 overflow-y-auto custom-scrollbar">
                    <div v-if="loadingChats" class="flex items-center justify-center h-full text-outline">
                       <span class="material-symbols-outlined animate-spin text-3xl">refresh</span>
                    </div>
                    <div v-else-if="chats.length === 0" class="flex flex-col items-center justify-center h-full text-outline p-8 text-center bg-surface-container-low dark:bg-slate-900/50">
                       <div class="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center text-outline-variant mb-3">
                           <span class="material-symbols-outlined text-3xl">forum</span>
                       </div>
                       <p class="font-medium text-on-surface dark:text-slate-100 text-sm">No incoming support requests.</p>
                    </div>
                    <div v-else class="divide-y divide-surface-variant">
                        <div v-for="chat in chats" :key="chat.id" @click="openChat(chat)" class="p-4 hover:bg-surface-container-low dark:bg-slate-900/50 cursor-pointer transition-colors flex items-center gap-3 relative group">
                            <div class="relative h-12 w-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface dark:text-slate-100 font-bold flex-shrink-0" :class="chat.unreadCount > 0 ? 'bg-primary-container text-on-primary-container border-primary/20' : 'bg-surface-variant'">
                                {{ getUserInitials(chat.userName || chat.userEmail || chat.id) }}
                                <div v-if="chat.unreadCount > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-error rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-baseline mb-0.5">
                                    <h4 class="text-sm font-bold text-on-surface dark:text-slate-100 truncate pr-2" :class="{'text-primary': chat.unreadCount > 0}">{{ chat.userName || chat.userEmail || 'User' }}</h4>
                                    <span class="text-xs font-semibold text-outline shrink-0">{{ formatTimeShort(chat.lastUpdated) }}</span>
                                </div>
                                <p class="text-xs truncate" :class="chat.unreadCount > 0 ? 'text-on-surface dark:text-slate-100 font-semibold' : 'text-on-surface dark:text-slate-100'">{{ chat.lastMessage || 'Sent a picture/attachment' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VIEW 2: Chat Transcript -->
            <div v-if="activeChatId" class="absolute inset-0 bg-surface-container-low dark:bg-slate-900/50 flex flex-col">
                <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref="chatArea">
                    <div v-if="loadingMessages" class="flex items-center justify-center h-full text-outline">
                       <span class="material-symbols-outlined animate-spin text-3xl">refresh</span>
                    </div>
                    <div v-else-if="messages.length === 0" class="flex items-center justify-center h-full text-center">
                        <p class="text-sm text-outline">Start the conversation</p>
                    </div>
                    <div v-for="msg in messages" :key="msg.id" class="flex w-full" :class="msg.isSupport ? 'justify-end' : 'justify-start'">
                        <div class="flex w-10/12 gap-2 group" :class="msg.isSupport ? 'flex-row-reverse' : ''">
                           <div v-if="!msg.isSupport" class="h-6 w-6 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center flex-shrink-0 mt-auto shadow-sm text-on-surface dark:text-slate-100 font-bold text-xs uppercase">
                             {{ getUserInitials(activeChatName || 'User') }}
                           </div>
                           <div class="flex flex-col" :class="msg.isSupport ? 'items-end' : 'items-start'">
                               <div :class="msg.isSupport ? 'bg-primary text-white dark:text-slate-200 rounded-br-none' : 'bg-surface border border-outline-variant text-on-surface dark:text-slate-100 rounded-bl-sm'" class="rounded-2xl px-3 py-2 text-sm shadow-sm leading-relaxed break-words">
                                 {{ msg.text }}
                               </div>
                               <div class="text-xs font-semibold text-outline mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                   {{ formatTimeShort(msg.timestamp) }}
                               </div>
                           </div>
                        </div>
                    </div>
                </div>

                <!-- Input Form -->
                <div class="p-3 bg-surface border-t border-outline-variant shrink-0">
                  <div class="flex items-center gap-2 bg-surface-container border border-outline-variant rounded-xl p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                      <input 
                        v-model="inputText" 
                        @keyup.enter="sendMessage"
                        type="text" 
                        placeholder="Reply to user..." 
                        class="flex-1 bg-transparent border-none px-2 py-1 text-sm outline-none font-medium text-on-surface dark:text-slate-100 placeholder-outline w-full focus:ring-0"
                      >
                      <button @click="sendMessage" :disabled="!inputText.trim() || sending" class="h-8 w-8 shrink-0 bg-primary rounded-lg flex items-center justify-center text-white dark:text-slate-200 disabled:opacity-50 disabled:bg-surface-variant disabled:text-outline transition-all hover:bg-primary/90 active:scale-95 shadow-sm">
                        <span v-if="!sending" class="material-symbols-outlined text-base ml-0.5">send</span>
                        <span v-else class="material-symbols-outlined text-base animate-spin">refresh</span>
                      </button>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </transition>

    <!-- Floating Action Button with Notification -->
    <div class="relative mt-2">
      <button 
        @click="toggleWidget"
        class="relative h-14 w-14 bg-primary rounded-full shadow-[0_8px_24px_rgba(255,82,82,0.6)] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,82,82,0.7)] active:scale-95 transition-all duration-300 border-[3px] border-surface group z-50 text-white dark:text-slate-200"
      >
        <!-- Target Notification Badge -->
        <div v-if="!isOpen && totalUnread > 0" class="absolute -top-1 -right-1 z-20 flex h-6 w-6 items-center justify-center">
            <!-- Hiệu ứng tỏa sóng chớp nháy (Ping Ripple) -->
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style="background-color: #00e676; animation-duration: 2s;"></span>
            
            <!-- Numer Badge Core -->
            <span class="relative flex h-full w-full items-center justify-center rounded-full border-2 border-white shadow-sm text-white dark:text-slate-200 text-[10px] font-bold leading-none" style="background-color: #00e676;">
                {{ totalUnread > 99 ? '99+' : totalUnread }}
            </span>
        </div>
        
        <!-- Icons -->
        <span v-if="!isOpen" class="material-symbols-outlined text-[28px]">forum</span>
        <span v-if="isOpen" class="material-symbols-outlined text-[28px]">close</span>
      </button>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, writeBatch, serverTimestamp } from 'firebase/firestore';

export default {
  name: 'MiniChatWidget',
  data() {
    return {
      isOpen: false,
      chats: [],
      messages: [],
      activeChatId: null,
      activeChatName: '',
      inputText: '',
      loadingChats: true,
      loadingMessages: false,
      sending: false,
      chatsUnsubscribe: null,
      messagesUnsubscribe: null
    }
  },
  computed: {
      totalUnread() {
          return this.chats.reduce((acc, chat) => acc + (chat.unreadCount || 0), 0);
      }
  },
  methods: {
    getUserInitials(name) {
        if (!name) return '?';
        return name.substring(0, 2).toUpperCase();
    },
    formatTimeShort(timestamp) {
        if (!timestamp) return '';
        let date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },
    toggleWidget() {
      this.isOpen = !this.isOpen;
      // Fetch chats if opening the widget for first time (or we can just keep them synced)
      // Usually keeping them synced is better so unread badge shows even when closed
    },
    goBack() {
        this.activeChatId = null;
        this.activeChatName = '';
        if (this.messagesUnsubscribe) {
            this.messagesUnsubscribe();
            this.messagesUnsubscribe = null;
        }
        this.messages = [];
    },
    openChat(chat) {
        this.activeChatId = chat.id;
        this.activeChatName = chat.userName || chat.userEmail || ('User ' + chat.id.substring(0, 5));
        
        // Mark as read immediately computationally
        if (chat.unreadCount > 0) {
            updateDoc(doc(db, 'support_chats', chat.id), {
                unreadCount: 0
            }).catch(e => console.error("Could not reset unread:", e));
        }
        
        this.listenToMessages(chat.id);
    },
    listenToChats() {
      const q = query(collection(db, 'support_chats'), orderBy('lastUpdated', 'desc'));
      this.chatsUnsubscribe = onSnapshot(q, (snapshot) => {
        this.chats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.loadingChats = false;
      }, (error) => {
        console.error("MiniWidget Chat list fetch error:", error);
        this.loadingChats = false;
      });
    },
    listenToMessages(chatId) {
      this.loadingMessages = true;
      if (this.messagesUnsubscribe) this.messagesUnsubscribe();
      
      const q = query(
          collection(db, `support_chats/${chatId}/messages`), 
          orderBy('timestamp', 'asc')
      );
      
      this.messagesUnsubscribe = onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          this.loadingMessages = false;
          this.scrollToBottom();
      }, (error) => {
          console.error("Miniwidget Message fetch error:", error);
          this.loadingMessages = false;
      });
    },
    async sendMessage() {
      if (!this.inputText.trim() || this.sending || !this.activeChatId) return;
      
      const text = this.inputText.trim();
      this.sending = true;
      this.inputText = '';
      
      try {
          const batch = writeBatch(db);
          
          // 1. Write the message
          const msgRef = doc(collection(db, `support_chats/${this.activeChatId}/messages`));
          batch.set(msgRef, {
              text: text,
              isSupport: true, // we are admin
              senderId: 'admin',
              timestamp: serverTimestamp()
          });
          
          // 2. Set/Update parent connection document
          const chatRef = doc(db, 'support_chats', this.activeChatId);
          batch.update(chatRef, {
              lastMessage: text,
              lastUpdated: serverTimestamp()
          }); // Note: we do NOT increment unread count on the parent here, since it's the admin replying to the user. User side would track its own unreads.
          
          await batch.commit();
          this.scrollToBottom();
      } catch (err) {
          console.error("Send error", err);
          this.inputText = text;
      } finally {
          this.sending = false;
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatArea;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    }
  },
  mounted() {
      // Start listening to chat list in background to light up FAB dot
      this.listenToChats();
  },
  beforeDestroy() {
      if (this.chatsUnsubscribe) this.chatsUnsubscribe();
      if (this.messagesUnsubscribe) this.messagesUnsubscribe();
  }
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

/* Entering from the left, existing leaves to the right */
.slide-left-enter-from { transform: translateX(-20%); opacity: 0; }
.slide-left-leave-to { transform: translateX(-20%); opacity: 0; }

/* Entering from the right (opening chat inside), list leaves to the left */
.slide-right-enter-from { transform: translateX(20%); opacity: 0; }
.slide-right-leave-to { transform: translateX(20%); opacity: 0; }

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #94a3b8;
}
</style>
