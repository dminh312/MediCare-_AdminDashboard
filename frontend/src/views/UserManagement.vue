<template>
<div id="user-management-app">
    <main class="min-h-screen p-8 space-y-8 animate-slide-up-fade">
        <header class="w-full flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-black tracking-tight text-on-surface dark:text-slate-100 mb-1">User Management (Patients)</h1>
                <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">View and manage registered patients on the platform.</p>
            </div>
        </header>

        <section class="bg-surface-container-lowest dark:bg-slate-900 rounded-3xl shadow-sm border border-red-500/5 dark:border-red-500/10 overflow-hidden backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 p-8 pt-6">
            
            <div class="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                <div class="relative w-full max-w-md">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
                    <input type="text" v-model="searchQuery" class="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500/20 transition-all font-medium placeholder:text-zinc-500 dark:text-zinc-400 text-on-surface dark:text-slate-100 outline-none" placeholder="Search patients by name or email...">
                </div>
                <!-- Filters -->
                <div class="flex gap-2">
                    <button class="px-4 py-2 text-xs font-bold bg-primary-container text-primary rounded-xl hover:bg-primary hover:text-white transition-colors duration-300">All Patients</button>
                    <button class="px-4 py-2 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300">Active</button>
                </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto pb-4">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-zinc-400 dark:text-zinc-500 text-[11px] uppercase tracking-widest font-black border-b border-zinc-100 dark:border-zinc-800/50">
                            <th class="py-4 pl-4 font-bold">User</th>
                            <th class="py-4 font-bold">Role</th>
                            <th class="py-4 font-bold">Status</th>
                            <th class="py-4 font-bold text-right pr-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loading Indicator -->
                        <tr v-if="isLoading">
                            <td colspan="4" class="py-8 text-center text-zinc-400 font-medium">Loading patients...</td>
                        </tr>
                        <tr v-else-if="filteredUsers.length === 0">
                            <td colspan="4" class="py-8 text-center text-zinc-400 font-medium">No patients found.</td>
                        </tr>
                        <tr v-for="(user, index) in filteredUsers" :key="user.id" 
                            class="group hover:bg-zinc-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer animate-slide-up-fade"
                            :style="{ animationDelay: `${index * 0.05}s` }">
                            
                            <td class="py-4 pl-4 rounded-l-2xl">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white font-black shadow-md shadow-red-500/20 transform group-hover:scale-110 transition-transform duration-300">
                                        {{ user.name.charAt(0) }}
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-on-surface dark:text-slate-100 mb-0.5">{{ user.name }}</p>
                                        <p class="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{{ user.email }}</p>
                                    </div>
                                </div>
                            </td>
                            
                            <td class="py-4">
                                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                      :class="{
                                          'bg-red-50 text-primary dark:bg-red-900/30': user.role === 'Admin',
                                          'bg-blue-50 text-blue-600 dark:bg-blue-900/30': user.role === 'HR',
                                          'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300': user.role === 'Customer Service'
                                      }">
                                    {{ user.role }}
                                </span>
                            </td>

                            <td class="py-4">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full animate-pulse" :class="user.status === 'Active' ? 'bg-[#006856] shadow-[0_0_8px_#006856]' : 'bg-zinc-300'"></span>
                                    <span class="text-xs font-bold" :class="user.status === 'Active' ? 'text-[#006856] dark:text-[#5ddbbc]' : 'text-zinc-500'">{{ user.status }}</span>
                                </div>
                            </td>

                            <td class="py-4 pr-4 rounded-r-2xl text-right">
                                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button class="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-primary transition-colors flex items-center justify-center active:scale-95">
                                        <span class="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button @click.stop="deleteUser(user.id)" class="w-8 h-8 rounded-full bg-red-50 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-sm shadow-red-500/10 active:scale-95">
                                        <span class="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    </main>
</div>
</template>

<script>
export default {
    name: 'UserManagement',
    data() {
        return {
            users: [],
            isLoading: true,
            searchQuery: ''
        }
    },
    computed: {
        filteredUsers() {
            if (!this.searchQuery) return this.users;
            const query = this.searchQuery.toLowerCase();
            return this.users.filter(u => 
                (u.name && u.name.toLowerCase().includes(query)) || 
                (u.email && u.email.toLowerCase().includes(query))
            );
        }
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('medicare_admin_token');
                const res = await fetch('/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    this.users = data.users;
                }
            } catch (error) {
                console.error("Fetch users error:", error);
            } finally {
                this.isLoading = false;
            }
        },
        async deleteUser(uid) {
            if (!confirm('Are you sure you want to delete this patient?')) return;
            try {
                const token = localStorage.getItem('medicare_admin_token');
                const res = await fetch(`/api/users/${uid}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    this.users = this.users.filter(u => u.id !== uid);
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (e) {
                console.error(e);
                alert('An error occurred during deletion.');
            }
        }
    }
}
</script>

<style scoped>
@keyframes slide-up-fade {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-up-fade {
    animation: slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Subtle scrollbar */
::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
    background: #334155;
}
</style>
