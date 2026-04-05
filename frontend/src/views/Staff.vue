<template>
<div id="app">

    <!-- SideNavBar Integration -->
    <aside class="fixed left-0 top-0 h-full z-40 w-64 bg-[#fffbfb] dark:bg-slate-950 border-r border-red-900/5 shadow-sm shadow-red-500/5 font-['Inter'] font-bold tracking-tight text-sm">
        <div class="p-6">
            <h1 class="text-xl font-black tracking-tighter text-[#ff5252] mb-1">MediCare+</h1>
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Admin Terminal</p>
        </div>
        <nav class="px-4 space-y-1">
            <a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-[#ffffff] dark:hover:bg-slate-900 hover:text-[#ff5252] transition-colors scale-98 active:scale-95 transition-transform" href="/dashboard">
                <span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-[#ffffff] dark:hover:bg-slate-900 hover:text-[#ff5252] transition-colors scale-98 active:scale-95 transition-transform" href="#">
                <span class="material-symbols-outlined">analytics</span>
                Patient Analytics
            </a>
            <!-- Active State: Staff Management -->
            <a class="flex items-center gap-3 px-4 py-3 bg-[#ffffff] dark:bg-slate-900 text-[#ff5252] rounded-lg shadow-sm border border-red-900/5 scale-98 active:scale-95 transition-transform" href="/staff">
                <span class="material-symbols-outlined pulse-active">group</span>
                Staff Management
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-[#ffffff] dark:hover:bg-slate-900 hover:text-[#ff5252] transition-colors scale-98 active:scale-95 transition-transform" href="#">
                <span class="material-symbols-outlined">description</span>
                Medical Records
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-[#ffffff] dark:hover:bg-slate-900 hover:text-[#ff5252] transition-colors scale-98 active:scale-95 transition-transform" href="#">
                <span class="material-symbols-outlined">inventory_2</span>
                Inventory
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-[#ffffff] dark:hover:bg-slate-900 hover:text-[#ff5252] transition-colors scale-98 active:scale-95 transition-transform" href="#">
                <span class="material-symbols-outlined">chat</span>
                User Chats
            </a>
        </nav>
        <div class="absolute bottom-8 left-0 w-full px-4">
            <button class="w-full py-3 mb-2 bg-primary-container text-primary rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
                <span class="material-symbols-outlined text-sm">help</span>
                Support Center
            </button>
            <a @click.prevent="logout" class="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-400 transition-all cursor-pointer font-medium" href="#">
                <span class="material-symbols-outlined">logout</span>
                Log Out
            </a>
        </div>
    </aside>

    <!-- TopAppBar Integration -->
    <header class="flex justify-between items-center h-16 ml-64 px-8 sticky top-0 z-30 bg-[#fffbfb]/95 dark:bg-slate-950/95 backdrop-blur-sm font-['Inter'] text-sm">
        <div class="flex items-center flex-1">
            <div class="relative w-full max-w-md">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 focus:ring-1 focus:ring-primary/20 text-xs" placeholder="Search staff, or departments..." type="text"/>
            </div>
        </div>
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-4 text-slate-500">
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
    <main class="ml-64 p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header Section -->
            <div class="flex justify-between items-end mb-10">
                <div>
                    <h2 class="text-3xl font-black tracking-tight text-on-surface mb-1">Staff Management</h2>
                    <p class="text-on-surface-variant text-sm">Manage your healthcare professionals and administrative team.</p>
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
                    <div class="flex items-center justify-between bg-surface-container-low p-4 rounded-xl ring-1 ring-red-900/5">
                        <div class="flex gap-3">
                            <select class="bg-surface-container-lowest border-none text-xs font-bold rounded-lg px-4 py-2 ring-1 ring-red-900/5 focus:ring-primary/20">
                                <option>All Roles</option>
                                <option>Doctor</option>
                                <option>Nurse</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div class="text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                            Total Staff: <span class="text-primary ml-1">124</span>
                        </div>
                    </div>

                    <!-- Staff Table -->
                    <div class="bg-surface-container-lowest rounded-2xl shadow-sm shadow-red-500/5 overflow-hidden ring-1 ring-red-900/5">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-red-900/5 bg-surface-container-low/50">
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Staff Member</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th class="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-red-900/5">
                                <!-- Row 1 -->
                                <tr class="hover:bg-surface-container-low/30 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
                                                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8e0lKPlwN0Wc0JltG9XT7u7ukOpSjxmDzCbNyo7-JNLRxrm53iUq0TVgkA6zhgXBeme3irUtR0qDEe-K8-i5498UMtR3V-tRRT8woNF2k_QW2Ms4TRKxiaPdwXdEXJfIkgnf6KqX1ZeYhGe35eg4oFB3akclK3Yn-VO1M_fBdYWdRfzn5LfkClnZeVM_vH5CgZ5zRhgr7DzWc9Vq4Gh--rL_YvY6vOxTMd-l8R7JtTfYBt9A5X6g_iaPrBKOAkr8pVOFCkQFCXzc"/>
                                            </div>
                                            <div>
                                                <div class="text-sm font-bold text-on-surface">Dr. Julian Thorne</div>
                                                <div class="text-[11px] text-on-surface-variant">julian.t@medicare.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-mono text-slate-500">#ST-9921</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-semibold text-on-surface">Doctor</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700">Active</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-2">
                                            <button class="p-2 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 2 -->
                                <tr class="hover:bg-surface-container-low/30 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
                                                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKm4QmpqNk6tx_TSkworAlHHdZ_hMZErQYpOQOk7t9sOfcbj3CE05qQcIu7vTAS5GLz2D_vk2oArGQs9EllJmCqgTe33GiOEOlrMWV-fJFHj_KYNcthpup9g9WwPghpWb9THWph-MRXnKhJF4CNbfHEhALSqC6SHYbt5DcsPsc1hr5uSNQPUBbEXhIsolLWkMcDZ9eo8QT4JcO8qySf_pT-L_6mu31NHnyFDWOHGwaIg9YJWUl2gwp-xKXLbkmlE3OQwBWzUcqsS4"/>
                                            </div>
                                            <div>
                                                <div class="text-sm font-bold text-on-surface">Sarah Jenkins</div>
                                                <div class="text-[11px] text-on-surface-variant">s.jenkins@medicare.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-mono text-slate-500">#ST-8842</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-semibold text-on-surface">Nurse</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-700">On-Leave</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-2">
                                            <button class="p-2 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 3 -->
                                <tr class="hover:bg-surface-container-low/30 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
                                                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuhr1NeF5p7li9tISw-t1K227Exm73eDOiluLGHwVNnjGLpbNl1E4YoPaADE9aK-DtgZT_VPSuHtr9wAT1R_z8WaE2JYZgnz3E4d1z_626IgEjdznHoACvGoBeX_l4TDnJVvsJXu9kM13KivS8Si2JzBFV39ZSc9JJenq9Iw2QaO3BLABKfrOOVmsATZdo-oVbQpoy6M7CMq2Hoja7SsBeakyzpfsGNPzt7Q2ieIi3EjoXxzj00vY1pQEs4-I_vWYuRNaQHDDMG10"/>
                                            </div>
                                            <div>
                                                <div class="text-sm font-bold text-on-surface">Robert Chen</div>
                                                <div class="text-[11px] text-on-surface-variant">r.chen@medicare.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-mono text-slate-500">#ST-4410</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-semibold text-on-surface">Admin</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-700">Active</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-2">
                                            <button class="p-2 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Row 4 -->
                                <tr class="hover:bg-surface-container-low/30 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="h-10 w-10 rounded-full overflow-hidden bg-slate-100">
                                                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqCwHkR7zWcKHGXSHMUFTikODfngKz1h5PDMmmwkYNmRGFXs085btojPO2KtI7pPB8NzNHGJAOdGebn3rQILYwHUEmUklI22VsKSpq-6Aa8wvcZjT7Ky8is_lPPJbzgExEE_jx8crB5kp7NmR6aPOInbcHCx_SbPYrXV0djUyj9dzc1QB6P5yOq0dg7L1lCs-IKmAIGIeRayuobGfr5ddnw_DxeEgQSc4k6no5ZjuDMRKVePW82eGi4bs6LvHEkKYyLa-Dw7Bf3jA"/>
                                            </div>
                                            <div>
                                                <div class="text-sm font-bold text-on-surface">Dr. Elena Rodriguez</div>
                                                <div class="text-[11px] text-on-surface-variant">e.rodriguez@medicare.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-mono text-slate-500">#ST-2290</td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm font-semibold text-on-surface">Doctor</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700">Inactive</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-2">
                                            <button class="p-2 text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-4 border-t border-red-900/5 bg-surface-container-low/20 flex items-center justify-between">
                            <span class="text-xs text-on-surface-variant font-medium">Showing 4 of 124 staff members</span>
                            <div class="flex gap-2">
                                <button class="px-3 py-1 text-xs font-bold bg-surface-container-lowest rounded border border-red-900/5 text-slate-400 cursor-not-allowed">Previous</button>
                                <button class="px-3 py-1 text-xs font-bold bg-surface-container-lowest rounded border border-red-900/5 text-primary hover:bg-primary-container">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Panel Section (Right 3 Columns) -->
                <div class="col-span-12 lg:col-span-3 space-y-8">
                    <!-- Distribution Panel -->
                    <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm shadow-red-500/5 ring-1 ring-red-900/5">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-sm font-black tracking-tight text-on-surface">Staff Distribution</h3>
                            <span class="material-symbols-outlined text-primary text-lg">pie_chart</span>
                        </div>
                        <!-- Mini Visualization Placeholder -->
                        <div class="relative h-40 w-40 mx-auto mb-6 flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90">
                                <circle class="text-primary-container" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-width="12"></circle>
                                <circle class="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="120" stroke-width="12"></circle>
                                <circle class="text-secondary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="360" stroke-width="12"></circle>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-2xl font-black text-on-surface">124</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 rounded-full bg-primary"></div>
                                    <span class="text-xs font-bold text-on-surface">Doctors</span>
                                </div>
                                <span class="text-xs font-black text-slate-500">42</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 rounded-full bg-secondary"></div>
                                    <span class="text-xs font-bold text-on-surface">Nurses</span>
                                </div>
                                <span class="text-xs font-black text-slate-500">68</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 rounded-full bg-slate-300"></div>
                                    <span class="text-xs font-bold text-on-surface">Admin</span>
                                </div>
                                <span class="text-xs font-black text-slate-500">14</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Shift Overview Card -->
                    <div class="bg-primary rounded-2xl p-6 text-on-primary shadow-lg shadow-red-500/20 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-4 opacity-20">
                            <span class="material-symbols-outlined text-6xl">clinical_notes</span>
                        </div>
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4">Active Now</h3>
                        <div class="text-3xl font-black mb-1">84</div>
                        <p class="text-[11px] opacity-80 mb-6 font-medium">Medical staff currently on shift.</p>
                        <button class="w-full py-3 bg-white text-primary rounded-lg font-bold text-xs hover:bg-opacity-90 transition-all">
                            View Shift Board
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Contextual FAB (Medical Chatbot/Support) -->
    <button class="fixed bottom-8 right-8 h-14 w-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(255,82,82,0.4)] hover:scale-105 active:scale-95 transition-transform z-50">
        <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
    </button>

</div>
</template>

<script>
export default {
        
        data() {
            return {
                currentUser: null
            }
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
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('medicare_admin_token');
                localStorage.removeItem('medicare_admin_user');
                window.location.href = '/login';
            }
        }
    };

</script>
