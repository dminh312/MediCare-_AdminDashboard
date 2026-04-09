<template>
  <aside class="fixed left-0 top-0 h-full z-50 bg-[#fffbfb] dark:bg-slate-950 border-r border-red-900/5 dark:border-red-500/10 shadow-sm shadow-red-500/5 transition-all duration-300 font-['Inter'] font-bold tracking-tight text-sm"
         :class="isCollapsed ? 'w-20' : 'w-64'">
      
      <div class="p-6 h-20 flex items-center overflow-hidden whitespace-nowrap">
          <h1 class="text-xl font-black tracking-tighter text-[#ff5252] mb-1" v-if="!isCollapsed">MediCare+</h1>
          <h1 class="text-xl font-black tracking-tighter text-[#ff5252] mb-1 mx-auto" v-else>M+</h1>
      </div>

      <!-- Arrow Toggle Button on the edge -->
      <button @click="$emit('toggle-sidebar')" 
              class="absolute -right-5 top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md rounded-full p-1.5 text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:text-[#ff5252] transition-all z-50 flex items-center justify-center hover:scale-110 active:scale-95">
          <span class="material-symbols-outlined text-[20px] font-bold">{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
      </button>

      <nav class="px-4 space-y-2 mt-4">
          <router-link to="/dashboard" 
             class="flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden transition-all duration-200"
             :class="[$route.path === '/dashboard' ? 'bg-white dark:bg-slate-900 border border-red-900/5 dark:border-red-500/10 shadow-sm text-[#ff5252]' : 'text-slate-500 hover:bg-white dark:bg-slate-900 hover:text-[#ff5252]']">
              <span class="material-symbols-outlined flex-shrink-0" :class="{ 'pulse-active': $route.path === '/dashboard'}">dashboard</span>
              <transition name="fade-text">
                 <span v-if="!isCollapsed" class="whitespace-nowrap">Dashboard</span>
              </transition>
          </router-link>

          <router-link to="/medicine/add" v-if="hasRole(['Medicine management'])"
             class="flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden transition-all duration-200"
             :class="[$route.path.startsWith('/medicine') ? 'bg-white dark:bg-slate-900 border border-red-900/5 dark:border-red-500/10 shadow-sm text-[#ff5252]' : 'text-slate-500 hover:bg-white dark:bg-slate-900 hover:text-[#ff5252]']">
              <span class="material-symbols-outlined flex-shrink-0" :class="{ 'pulse-active': $route.path.startsWith('/medicine')}">medical_services</span>
              <transition name="fade-text">
                 <span v-if="!isCollapsed" class="whitespace-nowrap">Add Medicine</span>
              </transition>
          </router-link>

          <router-link to="/staff" v-if="hasRole(['HR'])"
             class="flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden transition-all duration-200"
             :class="[$route.path.startsWith('/staff') ? 'bg-white dark:bg-slate-900 border border-red-900/5 dark:border-red-500/10 shadow-sm text-[#ff5252]' : 'text-slate-500 hover:bg-white dark:bg-slate-900 hover:text-[#ff5252]']">
              <span class="material-symbols-outlined flex-shrink-0" :class="{ 'pulse-active': $route.path.startsWith('/staff')}">group</span>
              <transition name="fade-text">
                 <span v-if="!isCollapsed" class="whitespace-nowrap">Staff Management</span>
              </transition>
          </router-link>


          
          <router-link to="/chat" v-if="hasRole(['Customer Service', 'HR'])"
             class="flex items-center justify-between px-4 py-3 rounded-lg overflow-hidden transition-all duration-200"
             :class="[$route.path.startsWith('/chat') ? 'bg-white dark:bg-slate-900 border border-red-900/5 dark:border-red-500/10 shadow-sm text-[#ff5252]' : 'text-slate-500 hover:bg-white dark:bg-slate-900 hover:text-[#ff5252]']">
              <div class="flex items-center gap-3">
                 <div class="relative">
                     <span class="material-symbols-outlined flex-shrink-0" :class="{ 'pulse-active': $route.path.startsWith('/chat')}">chat</span>
                     <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 flex h-3 w-3">
                         <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                         <span class="relative inline-flex rounded-full h-3 w-3 bg-red-50 dark:bg-red-900/300"></span>
                     </span>
                 </div>
                 <transition name="fade-text">
                    <span v-if="!isCollapsed" class="whitespace-nowrap">User Chats</span>
                 </transition>
              </div>
          </router-link>
      </nav>

      <div class="absolute bottom-8 left-0 w-full px-4 border-t border-red-900/5 dark:border-red-500/10 pt-4 space-y-1">
          <button @click.prevent="cycleTheme" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:text-[#ff5252] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer font-medium text-left">
              <span class="material-symbols-outlined flex-shrink-0">{{ themeIcon }}</span>
              <transition name="fade-text">
                 <span v-if="!isCollapsed" class="whitespace-nowrap">{{ themeLabel }}</span>
              </transition>
          </button>
          
          <button @click.prevent="$emit('logout')" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:text-[#ff5252] hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer font-medium text-left">
              <span class="material-symbols-outlined flex-shrink-0">logout</span>
              <transition name="fade-text">
                 <span v-if="!isCollapsed" class="whitespace-nowrap">Log Out</span>
              </transition>
          </button>
      </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  props: {
      isCollapsed: {
          type: Boolean,
          default: false
      }
  },
  computed: {
      ...mapState(['unreadCount', 'theme']),
      currentUserRole() {
          const userStr = localStorage.getItem('medicare_admin_user');
          if (userStr) {
              try { return JSON.parse(userStr).role || 'Customer Service'; } catch (e) {}
          }
          return null;
      },
      themeIcon() {
          if (this.theme === 'light') return 'light_mode';
          if (this.theme === 'dark') return 'dark_mode';
          return 'brightness_auto';
      },
      themeLabel() {
          if (this.theme === 'light') return 'Light Theme';
          if (this.theme === 'dark') return 'Dark Theme';
          return 'System Theme';
      }
  },
  methods: {
      hasRole(roles) {
          if (!this.currentUserRole) return false;
          const userRoleLower = this.currentUserRole.toLowerCase();
          if (userRoleLower === 'admin') return true; // Admin sees all
          // Also allow checking against lowercase roles if the route defines them that way
          return roles.some(r => r.toLowerCase() === userRoleLower);
      },
      cycleTheme() {
          const themes = ['auto', 'light', 'dark'];
          let currentIndex = themes.indexOf(this.theme);
          if (currentIndex === -1) currentIndex = 0;
          const nextIndex = (currentIndex + 1) % themes.length;
          this.$store.dispatch('setTheme', themes[nextIndex]);
      }
  }
}
</script>

<style scoped>
.fade-text-enter-active, .fade-text-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-text-enter, .fade-text-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
