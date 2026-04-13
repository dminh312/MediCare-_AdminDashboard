<template>
<div id="app">


    <!-- TopAppBar Integration -->
    <header class="flex justify-between items-center h-16 px-8 sticky top-0 z-30 w-full bg-[#fffbfb]/95 dark:bg-slate-950/95 backdrop-blur-sm font-['Inter'] text-sm">
        <div class="flex items-center flex-1 gap-4">

            <div class="relative w-full max-w-md">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-lg">search</span>
                <input class="w-full bg-surface-container dark:bg-slate-900/50 border-none rounded-full py-2 pl-10 pr-4 focus:ring-1 focus:ring-primary/20 text-xs" placeholder="Search staff, or departments..." type="text"/>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-4 text-slate-500 dark:text-slate-400 dark:text-slate-400">
                <button class="hover:text-[#ff5252] transition-opacity opacity-80 active:opacity-100">
                    <span class="material-symbols-outlined">notifications</span>
                </button>
                <button class="hover:text-[#ff5252] transition-opacity opacity-80 active:opacity-100">
                    <span class="material-symbols-outlined">settings</span>
                </button>
            </div>
            <div class="h-8 w-8 rounded-full overflow-hidden border border-primary/10">
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0hHfXa7Mc3nZzGflZHS61ycPlnBGYmCIRHzCcEXGIEHj9Ua-8ai557R-54bow5Lr7ExyiE5V_Rtc44_PuP6uZr6-hcoTpi-C4LHECtuGlSS79-P5y3TvBg1kpVODOmpAdkOkklwf2Ab7iwv4Rj4VZuoI0NL58Trdp3rOwPLWr8Vktfq3Tzee2jY8QI0yfY2HbmiZucHy1y-S7Q8uai4UpkoIN4KDBcUCZS5v2RUQu1YeOterK_x7ZYBax4rOQcUpfRmbK0w8fU34" />
            </div>
        </div>
    </header>

    <!-- Main Content Canvas -->
    <main class="p-8 min-h-screen">
        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="flex justify-between items-end mb-10">
                <div>
                    <h2 class="text-3xl font-black tracking-tight text-on-surface dark:text-slate-100 mb-1">Staff Management</h2>
                    <p class="text-on-surface dark:text-slate-100 text-sm">Manage your healthcare professionals and administrative team.</p>
                </div>
                <router-link to="/staff/add" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg">person_add</span>
                    Add New Staff
                </router-link>
            </div>

            <div class="grid grid-cols-12 gap-8">
                <!-- Staff Table Section (Left 9 Columns) -->
                <div class="col-span-12 lg:col-span-9 space-y-6">
                    <!-- Filters Bar -->
                    <div class="flex items-center justify-between bg-surface-container dark:bg-slate-900/50 p-4 rounded-xl ring-1 ring-red-900/5 dark:ring-red-500/10">
                        <div class="flex gap-3">
                            <select class="bg-surface-containerest dark:bg-slate-900 border-none text-xs font-bold rounded-lg px-4 py-2 ring-1 ring-red-900/5 dark:ring-red-500/10 focus:ring-primary/20">
                                <option>All Roles</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div class="text-xs font-bold text-on-surface dark:text-slate-100 tracking-wider uppercase">
                            Total Staff: <span class="text-primary ml-1">{{ totalStaff }}</span>
                        </div>
                    </div>

                    <!-- Staff Table -->
                    <div class="bg-surface-containerest dark:bg-slate-900 rounded-2xl shadow-sm shadow-red-500/5 overflow-hidden ring-1 ring-red-900/5 dark:ring-red-500/10">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-red-900/5 dark:border-red-500/10 bg-surface-container dark:bg-slate-900/30">
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Staff Member</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">ID</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Role</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Status</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-red-900/5">
                                <tr v-if="isFetching" class="hover:bg-surface-container dark:bg-slate-900/10 transition-colors">
                                    <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                                        Loading staff members...
                                    </td>
                                </tr>
                                <tr v-else-if="staffs.length === 0" class="hover:bg-surface-container dark:bg-slate-900/10 transition-colors">
                                    <td colspan="5" class="px-6 py-8 text-center text-slate-500">
                                        No staff members found.
                                    </td>
                                </tr>
                                <tr v-for="(staff, index) in staffs" :key="staff.id" :style="{ 'animation-delay': (index * 0.05) + 's' }" class="hover:bg-surface-container dark:bg-slate-900/10 transition-colors opacity-0 animate-slide-up-fade">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100 uppercase text-slate-400 flex items-center justify-center font-bold">
                                                {{ staff.fullName ? staff.fullName.charAt(0) : 'S' }}
                                            </div>
                                            <div>
                                                <div class="text-sm font-bold text-on-surface dark:text-slate-100">{{ staff.fullName }}</div>
                                                <div class="text-[11px] text-on-surface dark:text-slate-100">{{ staff.email }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">#{{ staff.staffId }}</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-semibold text-on-surface dark:text-slate-100">{{ staff.role || 'Staff' }}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">Active</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-2">
                                            <button @click="openEditModal(staff)" class="p-2 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-4 border-t border-red-900/5 dark:border-red-500/10 bg-surface-container dark:bg-slate-900/5 flex items-center justify-between">
                            <span class="text-xs text-on-surface dark:text-slate-100 font-medium">Showing {{ staffs.length }} staff members</span>
                            <div class="flex gap-2">
                                <button class="px-3 py-1 text-xs font-bold bg-surface-containerest dark:bg-slate-900 rounded border border-red-900/5 text-slate-400 dark:text-slate-400 cursor-not-allowed">Previous</button>
                                <button class="px-3 py-1 text-xs font-bold bg-surface-containerest dark:bg-slate-900 rounded border border-red-900/5 dark:border-red-500/10 text-primary hover:bg-primary-container dark:bg-red-900/40">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Panel Section (Right 3 Columns) -->
                <div class="col-span-12 lg:col-span-3 space-y-8">
                    <!-- Distribution Panel -->
                    <div class="bg-surface-containerest dark:bg-slate-900 rounded-2xl p-6 shadow-sm shadow-red-500/5 ring-1 ring-red-900/5 dark:ring-red-500/10 opacity-0 animate-slide-up-fade" style="animation-delay: 0.1s">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-sm font-black tracking-tight text-on-surface dark:text-slate-100">Staff Distribution</h3>
                            <span class="material-symbols-outlined text-primary text-lg">pie_chart</span>
                        </div>
                        <!-- Dynamic Visualization -->
                        <div class="relative h-40 w-40 mx-auto mb-6 flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle class="text-slate-200" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-width="12"></circle>
                                <circle class="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" :stroke-dashoffset="((totalStaff - adminsCount) / (totalStaff || 1)) * 440" stroke-width="12"></circle>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-2xl font-black text-on-surface dark:text-slate-100">{{ totalStaff }}</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 rounded-full bg-primary"></div>
                                    <span class="text-xs font-bold text-on-surface dark:text-slate-100">Admin</span>
                                </div>
                                <span class="text-xs font-black text-slate-500">{{ adminsCount }}</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 rounded-full bg-slate-300"></div>
                                    <span class="text-xs font-bold text-on-surface dark:text-slate-100">Other</span>
                                </div>
                                <span class="text-xs font-black text-slate-500">{{ totalStaff - adminsCount }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Active Now Card Removed -->
                </div>
            </div>
        </div>
    </main>



    <!-- Edit Staff Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl w-full max-w-md border border-zinc-100 dark:border-zinc-800 transform transition-all">
            <h3 class="text-xl font-bold mb-6 text-on-surface dark:text-slate-100">Edit Staff Profile</h3>
            <div class="space-y-5">
                <div>
                    <label class="block text-[11px] font-bold tracking-widest mb-1.5 uppercase text-zinc-500">Full Name</label>
                    <input v-model="editForm.fullName" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface dark:text-slate-100" type="text"/>
                </div>
                <div>
                    <label class="block text-[11px] font-bold tracking-widest mb-1.5 uppercase text-zinc-500">Role Assignation</label>
                    <select v-model="editForm.role" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface dark:text-slate-100">
                        <option value="Customer Service">Customer Service</option>
                        <option value="HR">HR</option>
                        <option value="Medicine management">Medicine management</option>
                        <option value="Admin">Admin</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[11px] font-bold tracking-widest mb-1.5 uppercase text-zinc-500">Phone Number</label>
                    <input v-model="editForm.phoneNumber" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface dark:text-slate-100" type="text" placeholder="+1 ..."/>
                </div>
            </div>
            <div class="mt-8 flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <button @click="showEditModal = false" class="px-5 py-2.5 text-sm font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors">Cancel</button>
                <button @click="saveEdit" :disabled="isSubmitting" class="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors shadow-[0_4px_16px_rgba(255,82,82,0.3)]">{{ isSubmitting ? 'Saving...' : 'Save Updates' }}</button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
        data() {
            return {
                currentUser: null,
                staffs: [],
                isFetching: false,
                showEditModal: false,
                editForm: {
                    uid: '',
                    fullName: '',
                    phoneNumber: '',
                    role: ''
                },
                isSubmitting: false
            }
        },
        computed: {
            totalStaff() { return this.staffs.length; },
            adminsCount() { return this.staffs.filter((s) => s.role && s.role.toLowerCase().includes('admin')).length; }
        },
        created() {
            const token = localStorage.getItem('medicare_admin_token');
            const userStr = localStorage.getItem('medicare_admin_user');
            if (!token) {
                window.location.href = '/login';
            } else {
                if (userStr) {
                    this.currentUser = JSON.parse(userStr);
                }
                this.fetchStaffs();
            }
        },
        methods: {
            async fetchStaffs() {
                this.isFetching = true;
                try {
                    const response = await fetch('/api/staff', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                        }
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.staffs = data.staffs;
                    }
                } catch(e) {
                    console.error("Failed to load staffs", e);
                } finally {
                    this.isFetching = false;
                }
            },
            openEditModal(user) {
                this.editForm = { ...user };
                this.showEditModal = true;
            },
            async saveEdit() {
                if (!this.editForm.uid) return;
                
                this.isSubmitting = true;
                try {
                    const response = await fetch(`/api/staff/${this.editForm.uid}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                        },
                        body: JSON.stringify({
                            fullName: this.editForm.fullName,
                            phoneNumber: this.editForm.phoneNumber,
                            role: this.editForm.role
                        })
                    });
                    
                    const result = await response.json();
                    if (response.ok && result.success) {
                        alert('Staff member updated successfully!');
                        this.showEditModal = false;
                        await this.fetchStaffs();
                    } else {
                        alert('Error: ' + (result.message || 'Could not update'));
                    }
                } catch (err) {
                    console.error("Save edit error:", err);
                    alert("Network error");
                } finally {
                    this.isSubmitting = false;
                }
            },
            logout() {
                localStorage.removeItem('medicare_admin_token');
                localStorage.removeItem('medicare_admin_user');
                window.location.href = '/login';
            }
        }
    };
</script>
