<template>
<div class="min-h-screen text-slate-900 dark:text-slate-50">
    <!-- TopAppBar -->
    <header class="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 flex justify-end items-center w-full px-6 py-4">
        <button @click="$router.push('/dashboard')" class="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            Back to Dashboard
        </button>
    </header>

        <main class="px-6 py-8 max-w-2xl mx-auto space-y-10">
            <!-- Page Title -->
            <div class="space-y-1">
                <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Settings</h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Manage your clinical workstation and preferences</p>
            </div>

            <!-- Account Settings Section -->
            <section class="space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">Account Settings</h3>
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 space-y-6 shadow-[0_20px_40px_-12px_rgba(25,28,30,0.06)]">
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" class="hidden" />
                            <img class="w-20 h-20 rounded-2xl object-cover shadow-sm bg-slate-100" data-alt="Admin user avatar" :src="(currentUser && currentUser.photoURL) || 'https://ui-avatars.com/api/?name=Admin&background=FF5252&color=fff&bold=true'"/>
                            <button @click="triggerFileInput" :disabled="isUploading" class="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center">
                                <span v-if="isUploading" class="material-symbols-outlined text-sm animate-spin" data-icon="sync">sync</span>
                                <span v-else class="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                            </button>
                        </div>
                        <div class="flex-1">
                            <p class="text-lg font-bold">{{ (currentUser && (currentUser.fullName || currentUser.displayName)) || 'Dr. Admin' }}</p>
                            <p class="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">{{ (currentUser && currentUser.role) || 'Administrator' }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ (currentUser && currentUser.email) || 'admin@medicareplus.com' }}</p>
                        </div>
                    </div>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:bg-slate-700 transition-colors group">
                        <div class="flex items-center gap-4">
                            <span class="material-symbols-outlined text-primary" data-icon="mail">mail</span>
                            <div>
                                <p class="text-sm font-bold">Email Address</p>
                                <p class="text-xs text-slate-500 dark:text-slate-400">admin@medicareplus.com</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
                    </div>
                    <div @click="resetPassword" class="cursor-pointer flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:bg-slate-700 transition-colors group">
                        <div class="flex items-center gap-4">
                            <span class="material-symbols-outlined text-primary" data-icon="lock">lock</span>
                            <div>
                                <p class="text-sm font-bold">Change Password</p>
                                <p class="text-xs text-slate-500 dark:text-slate-400">Send a password reset email</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Notification Preferences Section -->
        <section class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">Notification Preferences</h3>
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-[0_20px_40px_-12px_rgba(25,28,30,0.06)]">
                <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary" data-icon="notifications_active">notifications_active</span>
                        </div>
                        <span class="text-sm font-bold">Push Notifications</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="preferences.pushNotifications" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                <div class="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary" data-icon="alternate_email">alternate_email</span>
                        </div>
                        <span class="text-sm font-bold">Email Alerts</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="preferences.emailAlerts" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary" data-icon="inventory">inventory</span>
                        </div>
                        <span class="text-sm font-bold">Inventory Reminders</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="preferences.inventoryReminders" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </section>

        <!-- System Configuration Section -->
        <section class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">System Configuration</h3>
            <div class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(25,28,30,0.06)]">
                <div class="p-5 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <span class="material-symbols-outlined text-slate-500 dark:text-slate-400" data-icon="dark_mode">dark_mode</span>
                        <span class="text-sm font-bold">Dark Mode</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="isDarkMode" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </section>

        <!-- Security Section -->
        <section class="space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">Security</h3>
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-[0_20px_40px_-12px_rgba(25,28,30,0.06)] space-y-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-tertiary-fixed/30 flex items-center justify-center">
                            <span class="material-symbols-outlined text-tertiary" data-icon="verified_user">verified_user</span>
                        </div>
                        <div>
                            <p class="text-sm font-bold">Two-Factor Authentication</p>
                            <p class="text-[10px] text-tertiary font-bold uppercase">{{ preferences.twoFactor ? 'Strongly Protected' : 'Recommended' }}</p>
                        </div>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="preferences.twoFactor" class="sr-only peer"/>
                        <div class="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                <button @click="logout" class="w-full py-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-sm font-bold flex items-center justify-center gap-2 hover:bg-error/10 hover:text-error transition-all group">
                    <span class="material-symbols-outlined group-hover:rotate-180 transition-transform" data-icon="logout">logout</span>
                    Logout from all sessions
                </button>
            </div>
        </section>
    </main>
</div>
</template>

<script>
import { storage } from '../firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
    name: 'Settings',
    data() {
        return {
            currentUser: null,
            isUploading: false,
            preferences: {
                pushNotifications: true,
                emailAlerts: true,
                inventoryReminders: false,
                twoFactor: true
            }
        }
    },
    computed: {
        isDarkMode: {
            get() {
                return this.$store.state.theme === 'dark';
            },
            set(value) {
                this.$store.dispatch('setTheme', value ? 'dark' : 'light');
            }
        }
    },
    watch: {
        preferences: {
            deep: true,
            handler(newVal) {
                localStorage.setItem('medicare_admin_prefs', JSON.stringify(newVal));
            }
        }
    },
    created() {
        const userStr = localStorage.getItem('medicare_admin_user');
        if (userStr) {
            try {
                this.currentUser = JSON.parse(userStr);
            } catch(e) {}
        }
        
        const prefStr = localStorage.getItem('medicare_admin_prefs');
        if (prefStr) {
            try {
                this.preferences = { ...this.preferences, ...JSON.parse(prefStr) };
            } catch(e) {}
        }
    },
    methods: {
        async resetPassword() {
            if (!this.currentUser || !this.currentUser.email) return;
            try {
                const { getAuth, sendPasswordResetEmail } = await import('firebase/auth');
                const auth = getAuth();
                await sendPasswordResetEmail(auth, this.currentUser.email);
                alert(`Password reset email sent to ${this.currentUser.email}`);
            } catch (error) {
                console.error('Password reset error:', error);
                alert('Failed to send password reset email.');
            }
        },
        logout() {
            localStorage.removeItem('medicare_admin_token');
            localStorage.removeItem('medicare_admin_user');
            this.$router.push('/login');
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        async onFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.isUploading = true;
            try {
                // Upload to Firebase Storage
                const uid = this.currentUser?.uid || 'unknown';
                const fileExt = file.name.split('.').pop();
                const fileName = `staff_avatars/${uid}_${Date.now()}.${fileExt}`;
                const fileRef = storageRef(storage, fileName);

                await uploadBytes(fileRef, file);
                const downloadURL = await getDownloadURL(fileRef);

                // Update local state
                this.currentUser = {
                    ...this.currentUser,
                    photoURL: downloadURL
                };
                localStorage.setItem('medicare_admin_user', JSON.stringify(this.currentUser));

                // Update backend via API
                const token = localStorage.getItem('medicare_admin_token');
                if (token && this.currentUser.uid) {
                    await fetch(`/api/staff/${this.currentUser.uid}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ photoURL: downloadURL })
                    });
                }
                
                alert('Profile picture updated successfully!');
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to update profile picture. Please try again.');
            } finally {
                this.isUploading = false;
                // Reset input
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = '';
                }
            }
        }
    }
}
</script>
