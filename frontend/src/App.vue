<template>
  <div id="app" class="flex min-h-screen bg-[#fffbfb] dark:bg-slate-950 font-['Inter']">
    <Sidebar v-if="!$route.meta.public" :is-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" @logout="logout" />
    <div class="flex-1 flex flex-col transition-all duration-300 relative" 
         :class="[!$route.meta.public ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : '']">
       <transition name="page-fade" mode="out-in">
           <router-view :is-sidebar-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
       </transition>
    </div>
    
    <!-- Mini Chat Widget overlaid on the app -->
    <MiniChatWidget v-if="!$route.meta.public" />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import MiniChatWidget from './components/MiniChatWidget.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    MiniChatWidget
  },
  data() {
    return {
      isSidebarCollapsed: false
    }
  },
  created() {
    this.$store.dispatch('initTheme');
    
    const savedState = localStorage.getItem('sidebar_collapsed');
    if (savedState) {
      this.isSidebarCollapsed = savedState === 'true';
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      localStorage.setItem('sidebar_collapsed', this.isSidebarCollapsed);
    },
    logout() {
      localStorage.removeItem('medicare_admin_token');
      localStorage.removeItem('medicare_admin_user');
      window.location.href = '/login';
    }
  }
};
</script>
