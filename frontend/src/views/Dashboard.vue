<template>
<div id="app">

    <!-- SideNavBar -->
    <aside class="h-screen w-64 fixed left-0 top-0 bg-zinc-50 dark:bg-zinc-950 flex flex-col p-4 gap-y-2 z-50">
        <div class="flex items-center gap-3 px-4 py-6 mb-4">
            <img alt="MediCare+ Logo" class="w-10 h-10 rounded-lg shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6kP7Zw304yEWfmRRGOeJaqtc0ej6uYcbd0yc6Q43zuvqk9A66nLVjitqCuR4yiQD-pM3Rps5B85BSYPWfO8MpkJy-AZ22CBC7wcO_BskX6A2MWnRj5A5yjJuKSOVZXImkGGL_-EKAS2pE167sQIYGFo30PxNimhp5CPSwZEUvWAamS22b6zJahovOEha2O_OEve7B0jS3DnXc9QLJBPLlrqwf8LamNZ_LKf5cvwpDbG0bcl_EWXkwIPC2KulE7UQHwenBGsQvmJo"/>
            <div>
                <h1 class="text-lg font-black text-red-500">Admin Portal</h1>
                <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Admin Terminal</p>
            </div>
        </div>
        <nav class="flex-1 space-y-1">
            <a class="flex items-center gap-3 px-4 py-3 bg-white dark:bg-zinc-900 text-red-500 dark:text-red-400 shadow-sm shadow-red-500/10 rounded-lg font-medium transition-all cursor-pointer" href="/dashboard">
                <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                <span>Dashboard</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="analytics">analytics</span>
                <span>Patient Analytics</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer" href="/staff">
                <span class="material-symbols-outlined" data-icon="group">group</span>
                <span>Staff Management</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="description">description</span>
                <span>Medical Records</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
                <span>Inventory</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
                <span>User Chats</span>
            </a>
        </nav>
        <div class="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
            <button class="w-full mb-4 bg-red-500 text-white rounded-lg py-2.5 font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95 duration-200">
                Generate Report
            </button>
            <a class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 transition-all cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="help">help</span>
                <span>Support</span>
            </a>
            <a @click.prevent="logout" class="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-red-400 transition-all cursor-pointer" href="#">
                <span class="material-symbols-outlined" data-icon="logout">logout</span>
                <span>Log Out</span>
            </a>
        </div>
    </aside>

    <!-- Main Content Wrapper -->
    <main class="ml-64 min-h-screen">
        <!-- TopAppBar -->
        <header class="w-full sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm shadow-sm shadow-red-500/5 flex items-center justify-between px-8 h-16">
            <div class="flex items-center flex-1">
                <div class="relative w-full max-w-md">
                    <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
                    <input class="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500/20 transition-all placeholder:text-zinc-500" placeholder="Search patients, staff, or records..." type="text"/>
                </div>
            </div>
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                    <button class="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-full transition-colors relative">
                        <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
                        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button class="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-full transition-colors">
                        <span class="material-symbols-outlined" data-icon="settings">settings</span>
                    </button>
                </div>
                <div class="flex items-center gap-3 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                    <div class="text-right hidden sm:block">
                        <p class="text-xs font-bold text-on-surface">{{ currentUser?.email || 'Dr. Sarah Pulse' }}</p>
                        <p class="text-[10px] text-zinc-500 font-medium">Chief Administrator</p>
                    </div>
                    <img alt="Admin profile photo" class="w-10 h-10 rounded-full border-2 border-red-500/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0hHfXa7Mc3nZzGflZHS61ycPlnBGYmCIRHzCcEXGIEHj9Ua-8ai557R-54bow5Lr7ExyiE5V_Rtc44_PuP6uZr6-hcoTpi-C4LHECtuGlSS79-P5y3TvBg1kpVODOmpAdkOkklwf2Ab7iwv4Rj4VZuoI0NL58Trdp3rOwPLWr8Vktfq3Tzee2jY8QI0yfY2HbmiZucHy1y-S7Q8uai4UpkoIN4KDBcUCZS5v2RUQu1YeOterK_x7ZYBax4rOQcUpfRmbK0w8fU34"/>
                </div>
            </div>
        </header>

        <div class="p-8 space-y-8">
            <!-- KPI Section -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- KPI Cards... -->
                <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary-container rounded-xl">
                            <span class="material-symbols-outlined text-primary" data-icon="person">person</span>
                        </div>
                        <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 class="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Total Patients</h3>
                    <p class="text-2xl font-black text-on-surface tracking-tight mt-1">24,892</p>
                </div>
                <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-secondary-container rounded-xl">
                            <span class="material-symbols-outlined text-secondary" data-icon="calendar_today">calendar_today</span>
                        </div>
                        <span class="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Busy</span>
                    </div>
                    <h3 class="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Active Appointments</h3>
                    <p class="text-2xl font-black text-on-surface tracking-tight mt-1">1,430</p>
                </div>
                <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-tertiary-container rounded-xl">
                            <span class="material-symbols-outlined text-tertiary" data-icon="medical_services">medical_services</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span class="text-[10px] font-bold text-zinc-500">Live</span>
                        </div>
                    </div>
                    <h3 class="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Staff Online</h3>
                    <p class="text-2xl font-black text-on-surface tracking-tight mt-1">158</p>
                </div>
                <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm shadow-red-500/5 border border-red-500/5">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary-container rounded-xl">
                            <span class="material-symbols-outlined text-primary" data-icon="chat_bubble">chat_bubble</span>
                        </div>
                        <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+14.8%</span>
                    </div>
                    <h3 class="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Active Support Chats</h3>
                    <p class="text-2xl font-black text-on-surface tracking-tight mt-1">186</p>
                </div>
            </section>

            <!-- Charts Section -->
            <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Line Chart -->
                <div class="lg:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-red-500/5">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h2 class="text-xl font-bold tracking-tight text-on-surface">Patient Admission Trends</h2>
                            <p class="text-xs text-zinc-500 font-medium">Daily admissions across all departments</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="px-3 py-1 text-[10px] font-bold bg-zinc-100 rounded-full text-zinc-600">Weekly</button>
                            <button class="px-3 py-1 text-[10px] font-bold bg-primary text-white rounded-full">Monthly</button>
                        </div>
                    </div>
                    <div class="h-64 flex items-end gap-3 px-4 relative">
                        <div class="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                            <div class="border-b border-zinc-100 w-full h-px"></div>
                            <div class="border-b border-zinc-100 w-full h-px"></div>
                            <div class="border-b border-zinc-100 w-full h-px"></div>
                            <div class="border-b border-zinc-100 w-full h-px"></div>
                        </div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[40%] hover:bg-primary transition-colors cursor-pointer group relative">
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">120</span>
                        </div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[60%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[45%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[75%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[90%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[55%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[70%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[85%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[65%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[80%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[95%] hover:bg-primary transition-colors"></div>
                        <div class="flex-1 bg-primary-container rounded-t-lg h-[75%] hover:bg-primary transition-colors"></div>
                    </div>
                    <div class="flex justify-between mt-4 px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                <!-- Pie Chart -->
                <div class="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-red-500/5">
                    <h2 class="text-xl font-bold tracking-tight text-on-surface mb-6">Staff Distribution</h2>
                    <div class="relative w-48 h-48 mx-auto mb-8">
                        <svg class="w-full h-full transform -rotate-90" viewbox="0 0 36 36">
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#f4dddd" stroke-width="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#ff5252" stroke-dasharray="45 55" stroke-dashoffset="0" stroke-width="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#ff4081" stroke-dasharray="25 75" stroke-dashoffset="-45" stroke-width="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.915" stroke="#7e5700" stroke-dasharray="30 70" stroke-dashoffset="-70" stroke-width="4"></circle>
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <span class="text-2xl font-black text-on-surface">342</span>
                            <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Staff</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-primary"></span><span class="text-xs font-medium text-zinc-600">Emergency</span></div><span class="text-xs font-bold text-on-surface">45%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-secondary"></span><span class="text-xs font-medium text-zinc-600">Cardiology</span></div><span class="text-xs font-bold text-on-surface">25%</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-tertiary"></span><span class="text-xs font-medium text-zinc-600">General</span></div><span class="text-xs font-bold text-on-surface">30%</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bottom Section -->
            <section class="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <!-- Recent Activity Table -->
                <div class="xl:col-span-3 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-red-500/5 overflow-hidden">
                    <div class="flex items-center justify-between mb-8">
                        <h2 class="text-xl font-bold tracking-tight text-on-surface">Recent Patients</h2>
                        <button class="text-primary text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                                    <th class="pb-4 px-2">Patient Name</th>
                                    <th class="pb-4 px-2">Status</th>
                                    <th class="pb-4 px-2">Department</th>
                                    <th class="pb-4 px-2">Time</th>
                                    <th class="pb-4 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                <tr class="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                    <td class="py-4 px-2"><div class="flex items-center gap-3"><img alt="Patient profile" class="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR4RrTRV6kvJnhMrqWRvqUioV6s7BseZYCPeO-wKKPo-Xu2O5qDWqx8_EUUGKoGEomf3FAo6bAGJl5RrPJV5HngNVZo5MjlW2qwA4Fzt0XjPwfvunOTGTJPAtEB5j4Zmlhjuat7-Im0F65JjaLHA1ZyZwO4HlvVrqN9qHeU3kX1b1lBhffV23n_zioHyQG6gRLYhfUit8rQV0PP7ffC1tpQL26q2N3va-8F5cRdYipUSmWMIaX6FOHxPsDpLjj2qpUhVsaKY-K4Ko"/><div><p class="font-bold text-on-surface">Arthur Morgan</p><p class="text-[10px] text-zinc-500">ID: #PX-9821</p></div></div></td>
                                    <td class="py-4 px-2"><span class="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">Stable</span></td>
                                    <td class="py-4 px-2 font-medium text-zinc-600">General Ward</td>
                                    <td class="py-4 px-2 text-zinc-400">10:45 AM</td>
                                    <td class="py-4 px-2 text-right"><button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="more_vert">more_vert</button></td>
                                </tr>
                                <tr class="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                    <td class="py-4 px-2"><div class="flex items-center gap-3"><img alt="Patient profile" class="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeF_ArhKduPGxJxlce2i8rkyba44Rw1bba1_hTyChSDzIIB4hMyRTezMxzdDRN7DLiTlpzwSCZBEfev1ECtBRRZ899igZSEJ1FHQv74BgsCNXdnqb4-0Vdp5n_jWZWpTShvyDgkhwu1wVid81muM4QbNl_f0KepLAJxYSvSSxtmIHAUqcOp6IDnIMyfv5RKrqLjMiNvdoD7dRNJh_m4aOdAAdsNRm-Yo-Z4knYVaOGM9mFcrb0aQ-ho4AtcqGNaHbtW6UqX1uZDNY"/><div><p class="font-bold text-on-surface">Sadie Adler</p><p class="text-[10px] text-zinc-500">ID: #PX-3342</p></div></div></td>
                                    <td class="py-4 px-2"><span class="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold">Critical</span></td>
                                    <td class="py-4 px-2 font-medium text-zinc-600">ICU</td>
                                    <td class="py-4 px-2 text-zinc-400">09:12 AM</td>
                                    <td class="py-4 px-2 text-right"><button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="more_vert">more_vert</button></td>
                                </tr>
                                <tr class="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                    <td class="py-4 px-2"><div class="flex items-center gap-3"><img alt="Patient profile" class="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYZ61yzW4SfxUsVV94P-CSpdCg2IuRZhjtyVaZcEEMMbN6nii2Yjyuo5XitcCbrkfsUhHCMUoA_PjbySHofqqfzJbByqc4KT8NZPR12yGOWn5hwdMzVZq0eOwgKVCvucTjYEJHWo26r4-yW6-c3f0V5fz-xK6nCGqMvzQi29_o7NCQ_xK8FJpEQ7qnx0OyFgIyFBrf0vAlZN7tVJCQgdi7sZhUi-h3qa8NkpXiqmZhSrJHpPaJsBsZ_zG4-5MhyDTzWhM8gVCzI1M"/><div><p class="font-bold text-on-surface">John Marston</p><p class="text-[10px] text-zinc-500">ID: #PX-1120</p></div></div></td>
                                    <td class="py-4 px-2"><span class="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">Monitoring</span></td>
                                    <td class="py-4 px-2 font-medium text-zinc-600">Cardiology</td>
                                    <td class="py-4 px-2 text-zinc-400">08:55 AM</td>
                                    <td class="py-4 px-2 text-right"><button class="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors" data-icon="more_vert">more_vert</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- System Alerts Widget -->
                <div class="bg-surface-container-low p-8 rounded-3xl shadow-sm border border-red-500/5">
                    <h2 class="text-xl font-bold tracking-tight text-on-surface mb-6 flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary" data-icon="warning">warning</span> System Alerts
                    </h2>
                    <div class="space-y-4">
                        <div class="p-4 bg-white rounded-2xl border-l-4 border-red-500 shadow-sm flex gap-4">
                            <span class="material-symbols-outlined text-red-500 text-lg" data-icon="inventory_2">inventory_2</span>
                            <div>
                                <p class="text-xs font-bold text-on-surface leading-tight">Low Stock: Surgical Masks</p>
                                <p class="text-[10px] text-zinc-500 mt-1">Remaining: 150 units. Action required.</p>
                            </div>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border-l-4 border-amber-500 shadow-sm flex gap-4">
                            <span class="material-symbols-outlined text-amber-500 text-lg" data-icon="schedule">schedule</span>
                            <div>
                                <p class="text-xs font-bold text-on-surface leading-tight">Unfilled Shifts: Night Ward</p>
                                <p class="text-[10px] text-zinc-500 mt-1">2 shifts remaining for Friday night.</p>
                            </div>
                        </div>
                        <div class="p-4 bg-white rounded-2xl border-l-4 border-blue-500 shadow-sm flex gap-4">
                            <span class="material-symbols-outlined text-blue-500 text-lg" data-icon="dns">dns</span>
                            <div>
                                <p class="text-xs font-bold text-on-surface leading-tight">System Backup Complete</p>
                                <p class="text-[10px] text-zinc-500 mt-1">Full database sync at 03:00 AM.</p>
                            </div>
                        </div>
                        <button class="w-full py-3 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors mt-4">
                            Dismiss All
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Floating Chatbot Action -->
    <button class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-[0_4px_16px_rgba(255,82,82,0.4)] flex items-center justify-center active:scale-90 transition-all z-50">
        <span class="material-symbols-outlined" data-icon="chat" style="font-variation-settings: 'FILL' 1;">chat</span>
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
