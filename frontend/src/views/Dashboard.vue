<template>
<div id="app">

    <!-- Main Content Wrapper -->
    <main class="min-h-screen">
        <!-- TopAppBar -->
        <header class="w-full sticky top-0 z-40 bg-white/95 dark:bg-zinc-950 dark:bg-slate-800/80/95 backdrop-blur-sm shadow-sm shadow-red-500/5 flex items-center justify-between px-8 h-16">
            <div class="flex items-center flex-1 gap-4">

                <div class="relative w-full max-w-md">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-400 text-sm">search</span>
                    <input class="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500/20 transition-all placeholder:text-zinc-500 dark:text-zinc-400 dark:text-zinc-400" placeholder="Search patients, staff, or records..." type="text"/>
                </div>
            </div>
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                    <button class="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-full transition-colors relative">
                        <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
                        <span class="absolute top-2 right-2 w-2 h-2 bg-red-50 dark:bg-red-900/30 dark:bg-red-900/300 rounded-full border-2 border-white"></span>
                    </button>
                    <button class="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-full transition-colors">
                        <span class="material-symbols-outlined" data-icon="settings">settings</span>
                    </button>
                </div>
                <div class="flex items-center gap-3 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                    <div class="text-right hidden sm:block">
                        <p class="text-xs font-bold text-on-surface dark:text-slate-100">{{ currentUser?.email || 'Dr. Sarah Pulse' }}</p>
                        <p class="text-[10px] text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 font-medium">Chief Administrator</p>
                    </div>
                    <img alt="Admin profile photo" class="w-10 h-10 rounded-full border-2 border-red-500/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0hHfXa7Mc3nZzGflZHS61ycPlnBGYmCIRHzCcEXGIEHj9Ua-8ai557R-54bow5Lr7ExyiE5V_Rtc44_PuP6uZr6-hcoTpi-C4LHECtuGlSS79-P5y3TvBg1kpVODOmpAdkOkklwf2Ab7iwv4Rj4VZuoI0NL58Trdp3rOwPLWr8Vktfq3Tzee2jY8QI0yfY2HbmiZucHy1y-S7Q8uai4UpkoIN4KDBcUCZS5v2RUQu1YeOterK_x7ZYBax4rOQcUpfRmbK0w8fU34"/>
                </div>
            </div>
        </header>

        <div class="p-8 space-y-8">
            <!-- KPI Section -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- KPI Cards... -->
                <div class="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5 dark:border-red-500/10 hover:shadow-md transition-shadow opacity-0 animate-slide-up-fade" style="animation-delay: 0.1s">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary-container dark:bg-red-900/40 rounded-xl">
                            <span class="material-symbols-outlined text-primary" data-icon="person">person</span>
                        </div>
                        <span class="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 dark:bg-green-900/30 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 class="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-widest">Total Patients</h3>
                    <p class="text-2xl font-black text-on-surface dark:text-slate-100 tracking-tight mt-1">{{ isLoading ? '...' : (stats.totalPatients || 0).toLocaleString() }}</p>
                </div>

                <div class="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5 dark:border-red-500/10 hover:shadow-md transition-shadow opacity-0 animate-slide-up-fade" style="animation-delay: 0.2s">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-tertiary-container rounded-xl">
                            <span class="material-symbols-outlined text-tertiary" data-icon="medical_services">medical_services</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2 h-2 bg-green-50 dark:bg-green-900/300 rounded-full animate-pulse"></span>
                            <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 dark:text-zinc-400">Live</span>
                        </div>
                    </div>
                    <h3 class="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-widest">Total Staff</h3>
                    <p class="text-2xl font-black text-on-surface dark:text-slate-100 tracking-tight mt-1">{{ isLoading ? '...' : (stats.totalStaff || 0) }}</p>
                </div>
                <div class="bg-surface-container-lowest dark:bg-slate-900 p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5 dark:border-red-500/10 hover:shadow-md transition-shadow opacity-0 animate-slide-up-fade" style="animation-delay: 0.3s">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary-container dark:bg-red-900/40 rounded-xl">
                            <span class="material-symbols-outlined text-primary" data-icon="chat_bubble">chat_bubble</span>
                        </div>
                        <span class="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 dark:bg-green-900/30 px-2 py-1 rounded-full">+14.8%</span>
                    </div>
                    <h3 class="text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-widest">Active Support Chats</h3>
                    <p class="text-2xl font-black text-on-surface dark:text-slate-100 tracking-tight mt-1">{{ isLoading ? '...' : (stats.activeChats || 0) }}</p>
                </div>
            </section>

            <!-- Charts Section -->
            <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Line Chart -->
                <div class="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-red-500/5 dark:border-red-500/10">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h2 class="text-xl font-bold tracking-tight text-on-surface dark:text-slate-100">User Registrations</h2>

                        </div>
                        <div class="flex gap-2">
                            <button class="px-3 py-1 text-[10px] font-bold bg-zinc-100 dark:bg-slate-800 rounded-full text-zinc-600 dark:text-zinc-300">Weekly</button>
                            <button class="px-3 py-1 text-[10px] font-bold bg-primary text-white dark:text-slate-200 rounded-full">Monthly</button>
                        </div>
                    </div>
                    <div class="h-64 flex items-end gap-3 px-4 relative">
                        <div class="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                            <div class="border-b border-zinc-100 dark:border-zinc-800 w-full h-px"></div>
                            <div class="border-b border-zinc-100 dark:border-zinc-800 w-full h-px"></div>
                            <div class="border-b border-zinc-100 dark:border-zinc-800 w-full h-px"></div>
                            <div class="border-b border-zinc-100 dark:border-zinc-800 w-full h-px"></div>
                        </div>
                        <div v-for="(count, index) in monthlyData" :key="index"
                             class="flex-1 bg-primary-container dark:bg-red-900/40 rounded-t-lg hover:bg-primary transition-colors cursor-pointer group relative"
                             :style="{ height: getBarHeight(count) + '%' }">
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{{ count }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4 px-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-400 uppercase tracking-widest">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <!-- Pie Chart -->
                <div class="bg-surface-container-lowest dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-red-500/5 dark:border-red-500/10">
                    <h2 class="text-xl font-bold tracking-tight text-on-surface dark:text-slate-100 mb-6">Staff Distribution</h2>
                    <div class="relative w-48 h-48 mx-auto mb-8">
                        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f4dddd" stroke-width="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#ff5252" :stroke-dasharray="adminDash" stroke-dashoffset="0" stroke-width="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#7e5700" :stroke-dasharray="otherDash" :stroke-dashoffset="otherOffset" stroke-width="4"></circle>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-2xl font-black text-on-surface dark:text-slate-100">{{ stats.totalStaff || 0 }}</span>
                            <span class="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 uppercase tracking-widest">Total Staff</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-primary"></span><span class="text-xs font-medium text-zinc-600 dark:text-zinc-300">Admin</span></div><span class="text-xs font-bold text-on-surface dark:text-slate-100">{{ stats.staffDistribution.Admin || 0 }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-tertiary"></span><span class="text-xs font-medium text-zinc-600 dark:text-zinc-300">Other</span></div><span class="text-xs font-bold text-on-surface dark:text-slate-100">{{ stats.staffDistribution.Other || 0 }}</span>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    </main>



</div>
</template>

<script>
export default {
        data() {
            return {
                currentUser: null,
                stats: {
                    totalPatients: 0,
                    totalStaff: 0,
                    staffOnline: 0,
                    activeChats: 0,
                    staffDistribution: { Admin: 0, Other: 0 },
                    monthlyRegistrations: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                isLoading: false
            }
        },
        computed: {
            adminDash() {
                const total = this.stats.totalStaff || 1;
                const pct = ((this.stats.staffDistribution.Admin || 0) / total) * 100;
                return `${pct} ${100 - pct}`;
            },
            otherDash() {
                const total = this.stats.totalStaff || 1;
                const adminPct = ((this.stats.staffDistribution.Admin || 0) / total) * 100;
                const pct = 100 - adminPct; // The rest 
                return `${Math.max(0, pct)} ${100 - Math.max(0, pct)}`;
            },
            otherOffset() {
                const total = this.stats.totalStaff || 1;
                const offset = ((this.stats.staffDistribution.Admin || 0) / total) * 100;
                return `-${offset}`;
            },
            monthlyData() {
                return Array.isArray(this.stats.monthlyRegistrations) 
                     ? this.stats.monthlyRegistrations 
                     : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
        },
        created() {
            // Xác thực token ở client
            const token = localStorage.getItem('medicare_admin_token');
            const userStr = localStorage.getItem('medicare_admin_user');
            if (!token) {
                // Nếu chưa login thì về trang login
                window.location.href = '/login';
            } else {
                if (userStr) {
                    this.currentUser = JSON.parse(userStr);
                }
                this.fetchStats(token);
            }
        },
        methods: {
            async fetchStats(token) {
                this.isLoading = true;
                try {
                    const res = await fetch('/api/dashboard/stats', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        this.stats = data.stats;
                    }
                } catch (e) {
                    console.error('Failed to fetch dashboard stats', e);
                } finally {
                    this.isLoading = false;
                }
            },
            logout() {
                localStorage.removeItem('medicare_admin_token');
                localStorage.removeItem('medicare_admin_user');
                window.location.href = '/login';
            },
            getBarHeight(count) {
                const max = Math.max(...this.monthlyData, 1); // Avoid division by zero
                const pct = (count / max) * 100;
                return Math.max(pct, 5); // Ensure at least 5% height so the bar is somewhat visible even if 0 if desired, or let it be 0. Let's make it Math.max(pct, 0), wait, if it's 0 it shouldn't show.
            }
        }
    };
</script>
