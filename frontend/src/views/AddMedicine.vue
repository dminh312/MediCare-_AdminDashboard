<template>
<div id="app">
    <!-- TopAppBar Integration -->
    <header class="flex justify-between items-center h-16 px-8 sticky top-0 z-30 w-full bg-[#fffbfb]/95 dark:bg-slate-950/95 backdrop-blur-sm font-['Inter'] text-sm">
        <div class="flex items-center flex-1 gap-4">
            <div class="relative w-full max-w-md">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-lg">search</span>
                <input class="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-2 pl-10 pr-4 focus:ring-1 focus:ring-[#ff5252]/20 text-xs" placeholder="Search operations..." type="text"/>
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
            <div class="h-8 w-8 rounded-full overflow-hidden border border-[#ff5252]/10 bg-slate-200">
                <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0hHfXa7Mc3nZzGflZHS61ycPlnBGYmCIRHzCcEXGIEHj9Ua-8ai557R-54bow5Lr7ExyiE5V_Rtc44_PuP6uZr6-hcoTpi-C4LHECtuGlSS79-P5y3TvBg1kpVODOmpAdkOkklwf2Ab7iwv4Rj4VZuoI0NL58Trdp3rOwPLWr8Vktfq3Tzee2jY8QI0yfY2HbmiZucHy1y-S7Q8uai4UpkoIN4KDBcUCZS5v2RUQu1YeOterK_x7ZYBax4rOQcUpfRmbK0w8fU34" />
            </div>
        </div>
    </header>

    <!-- Main Content Canvas -->
    <main class="p-8 min-h-screen">
        <div class="max-w-4xl mx-auto">
            <!-- Header Section -->
            <div class="mb-10">
                <h2 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white dark:text-slate-200 mb-1">Add New Medicine</h2>
                <p class="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-sm">Enter the details of the new medication to add it to the inventory.</p>
            </div>

            <!-- Form Card -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm shadow-[#ff5252]/5 ring-1 ring-[#ff5252]/5">
                <form @submit.prevent="saveMedicine" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Medicine Name -->
                        <div class="col-span-1">
                            <label class="flex items-center h-5 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Medicine Name (name)</label>
                            <input v-model="form.name" type="text" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5252] transition-all" placeholder="e.g. Concor" required />
                        </div>

                        <!-- Search Name -->
                        <div class="col-span-1">
                            <label class="flex items-center h-5 gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Search Name (searchName)
                                <span class="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-400 leading-none" title="Auto-generated lowercased version for search index">info</span>
                            </label>
                            <input :value="form.name.toLowerCase()" disabled type="text" class="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-400 dark:text-slate-400 focus:outline-none transition-all cursor-not-allowed" placeholder="e.g. concor" />
                            <p class="text-xs text-slate-400 dark:text-slate-400 mt-2">This field is auto-generated for database querying purposes.</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                        <button type="button" @click="$router.push('/dashboard')" class="px-6 py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isSaving" class="bg-[#ff5252] text-white dark:text-slate-200 px-6 py-3 rounded-lg text-sm font-bold shadow-md shadow-[#ff5252]/20 hover:bg-red-600 active:scale-95 transition-all disabled:opacity-50">
                            {{ isSaving ? 'Saving...' : 'Save Medicine' }}
                        </button>
                    </div>
                </form>
            </div>

            <!-- Current Medicines Section -->
            <section class="mt-16">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Current Medicines</h3>
                    <button @click="fetchMedicines" :disabled="isFetching" class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#ff5252] dark:hover:text-[#ff5252] transition-colors group">
                        <span class="material-symbols-outlined text-lg group-hover:rotate-180 transition-transform duration-500" :class="{'animate-spin': isFetching}">refresh</span>
                        <span>Reload</span>
                    </button>
                </div>
                
                <div v-if="isFetching && medicines.length === 0" class="flex justify-center py-8">
                    <span class="material-symbols-outlined animate-spin text-[#ff5252] text-3xl">progress_activity</span>
                </div>
                <div v-else-if="medicines.length === 0" class="text-center py-8 text-slate-500 dark:text-slate-400">
                    No medicines found.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(med, index) in medicines" :key="med.id" :style="{ 'animation-delay': (index * 0.05) + 's' }" class="glass-effect dark:bg-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:bg-white/90 dark:hover:bg-slate-800 hover:-translate-y-1 opacity-0 animate-slide-up-fade">
                        <div class="flex justify-between items-start mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/50 rounded-xl flex items-center justify-center text-[#ff5252] group-hover:scale-110 transition-transform shadow-sm">
                                <span class="material-symbols-outlined">pill</span>
                            </div>
                            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-tighter rounded-full border border-slate-200 dark:border-slate-600">
                                #{{ med.id.substring(0,6).toUpperCase() }}
                            </span>
                        </div>
                        <h4 class="text-lg font-extrabold text-slate-900 dark:text-white leading-tight mb-2">{{ med.name }}</h4>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-300 px-2 py-0.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">{{ med.searchName || med.name.toLowerCase() }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                            <span class="material-symbols-outlined text-xs">calendar_today</span>
                            <span class="text-[11px] font-medium uppercase tracking-wide">
                                Added <span v-if="med.createdAt">{{ new Date(med.createdAt).toLocaleDateString() }}</span>
                            </span>
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
    name: 'AddMedicine',
    data() {
        return {
            form: {
                name: ''
            },
            medicines: [],
            isSaving: false,
            isFetching: false
        }
    },
    mounted() {
        this.fetchMedicines();
    },
    methods: {
        async fetchMedicines() {
            this.isFetching = true;
            try {
                const res = await fetch('/api/medicines', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    this.medicines = data.medicines;
                }
            } catch (err) {
                console.error("Failed to load medicines", err);
            } finally {
                this.isFetching = false;
            }
        },
        async saveMedicine() {
            this.isSaving = true;
            try {
                const res = await fetch('/api/medicines', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                    },
                    body: JSON.stringify(this.form)
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    this.form.name = '';
                    await this.fetchMedicines(); // Cập nhật lại list sau khi save
                } else {
                    alert(data.message || 'Error saving medicine');
                }
            } catch (err) {
                console.error("Failed to save medicine", err);
                alert('Error connecting to server');
            } finally {
                this.isSaving = false;
            }
        }
    }
}
</script>

<style scoped>
.glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
}
.dark .glass-effect {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
