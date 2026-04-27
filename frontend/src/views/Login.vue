<template>
<div id="app">

    <!-- TopAppBar -->
    <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-surface/95 backdrop-blur-sm shadow-sm">
        <div class="flex items-center gap-2">
            <span class="text-xl font-bold tracking-tight text-primary">MediCare+ Admin Portal</span>
        </div>
        <div class="flex items-center gap-4">
            <button class="text-on-surface-variant hover:text-primary transition-colors scale-95 transition-transform duration-200">
                <span class="material-symbols-outlined" data-icon="lock">lock</span>
            </button>
            <button class="text-on-surface-variant hover:text-primary transition-colors scale-95 transition-transform duration-200">
                <span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
            </button>
        </div>
    </header>

    <!-- Main Content: Login Canvas -->
    <main class="flex-grow flex items-center justify-center px-4 pt-20 pb-12 bg-surface">
        <div class="relative w-full max-w-[1100px] grid md:grid-cols-2 gap-0 overflow-hidden bg-surface-container-lowest dark:bg-slate-900 rounded-xl shadow-[0_4px_16px_rgba(255,82,82,0.05)] ring-1 ring-red-900/5 dark:ring-red-500/10">
            <!-- Left Side -->
            <div class="hidden md:flex flex-col justify-between p-12 bg-primary-container relative overflow-hidden opacity-0 animate-fade-in" style="animation-delay: 0.1s">
                <div class="absolute inset-0 z-0">
                    <img alt="Medical professional hand" class="w-full h-full object-cover mix-blend-overlay opacity-30 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAvY7mO3AvJXSjv-XD2gcFucWxNiQLQE7kzWRcrKvq4-8yyAzz1svpHUL64qr3NDaLQA56ekuU7K2cdtES7Tw0H5ta8JF-cPDVmVFIt1o6WIZobz2Du68qOmlo_zRXi8FIvLQjdGLKVIGvtwtGC6fbEWSq7hQWAQeR0aYmMjyglWOgNt1bAvYQKXJNfSZL9vf6I2ctpaG4pC6LwT_PjUabmgZaxuKr_hHKLr1DaJieevc0GF7guPkPdiR1ccsTeaTYKHoTILksOC4"/>
                </div>
                <div class="relative z-10 opacity-0 animate-slide-up-fade" style="animation-delay: 0.2s">
                    <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-8">
                        <span class="material-symbols-outlined text-white dark:text-slate-200" data-icon="health_metrics">health_metrics</span>
                    </div>
                    <h2 class="text-3xl font-bold tracking-tight text-on-primary-container leading-tight">Securing the pulse <br/>of modern healthcare.</h2>
                    <p class="mt-4 text-on-primary-container/80 max-w-sm">Access the enterprise health management suite to monitor vital systems and provider performance in real-time.</p>
                </div>
            </div>
            
            <!-- Right Side: Login Form -->
            <div class="p-8 md:p-16 flex flex-col justify-center">
                <div class="mb-10 mt-6 md:mt-0 opacity-0 animate-slide-up-fade" style="animation-delay: 0.2s">
                    <h1 class="text-xl md:text-2xl font-bold tracking-tight text-on-surface mb-2">Admin Dashboard Login</h1>
                    <p class="text-on-surface-variant text-sm">Please enter your credentials to access the secure portal.</p>
                </div>

                <!-- Error Alert -->
                <div v-if="error" class="mb-4 p-4 bg-error-container border-l-4 border-error rounded-[8px] text-on-error-container text-sm opacity-0 animate-slide-up-fade">
                    {{ error }}
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6 opacity-0 animate-slide-up-fade" style="animation-delay: 0.3s">
                    <!-- Identity Field -->
                    <div class="space-y-2">
                        <label class="text-[11px] font-bold tracking-wide uppercase text-on-surface ml-1">Admin ID or Email Address</label>
                        <div class="relative group">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors" data-icon="person">person</span>
                            <input v-model="form.email" class="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-[8px] focus:ring-2 focus:ring-primary/20 text-on-surface text-sm transition-all outline-none" placeholder="e.g. admin_01@medicare.com" type="email" required/>
                        </div>
                    </div>
                    
                    <!-- Password Field -->
                    <div class="space-y-2">
                        <div class="flex justify-between items-center px-1">
                            <label class="text-[11px] font-bold tracking-wide uppercase text-on-surface">Password</label>
                            <router-link to="/forgot-password" class="text-[11px] font-bold tracking-wide uppercase text-primary hover:underline transition-all">Forgot password?</router-link>
                        </div>
                        <div class="relative group">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors" data-icon="lock_open">lock_open</span>
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-[8px] focus:ring-2 focus:ring-primary/20 text-on-surface text-sm transition-all outline-none" placeholder="••••••••••••" required/>
                            <button @click.prevent="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline hover:text-primary transition-colors" type="button">{{ showPassword ? 'visibility_off' : 'visibility' }}</button>
                        </div>
                    </div>
                    
                    <!-- Options -->
                    <div class="flex items-center gap-3 py-2">
                        <div class="relative flex items-center">
                            <input v-model="rememberMe" class="w-5 h-5 rounded-[4px] border-outline-variant text-primary focus:ring-primary/20 focus:ring-offset-0 transition-all cursor-pointer" id="remember" type="checkbox"/>
                        </div>
                        <label class="text-sm text-on-surface cursor-pointer select-none" for="remember">Remember this device</label>
                    </div>
                    
                    <!-- CTA -->
                    <div class="pt-4">
                        <button :disabled="isLoading" class="w-full py-4 bg-primary text-white dark:text-slate-200 font-bold rounded-lg shadow-[0_4px_16px_rgba(255,82,82,0.3)] hover:shadow-[0_6px_20px_rgba(255,82,82,0.4)] disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                            <span>{{ isLoading ? 'Authenticating...' : 'Login to Dashboard' }}</span>
                            <span v-if="!isLoading" class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                        </button>
                    </div>
                </form>
                
                <!-- Help Footer -->
                <div class="mt-12 flex items-start gap-3 p-4 bg-surface-container rounded-lg border-l-4 border-primary opacity-0 animate-slide-up-fade" style="animation-delay: 0.4s">
                    <span class="material-symbols-outlined text-primary text-xl" data-icon="verified_user">verified_user</span>
                    <p class="text-[13px] leading-relaxed text-on-surface dark:text-slate-100">
                        This is a secure enterprise system. All access attempts are logged and monitored. Support is available 24/7 for authorized personnel.
                    </p>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-low border-t border-outline-variant/30">
        <div class="text-on-surface-variant font-['Inter'] text-[11px] font-bold tracking-wide uppercase">
            © 2024 MediCare+ Health System. Secured with Enterprise Grade Encryption.
        </div>
        <div class="flex gap-6">
            <a class="font-['Inter'] text-[11px] font-bold tracking-wide uppercase text-on-surface-variant hover:text-primary underline" href="#">Security Policy</a>
            <a class="font-['Inter'] text-[11px] font-bold tracking-wide uppercase text-on-surface-variant hover:text-primary underline" href="#">Terms of Service</a>
            <a class="font-['Inter'] text-[11px] font-bold tracking-wide uppercase text-on-surface-variant hover:text-primary underline" href="#">Support</a>
        </div>
    </footer>

</div>
</template>

<script>
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
        
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                showPassword: false,
                rememberMe: false,
                error: null,
                isLoading: false
            }
        },
        created() {
            // Check if already authenticated via localStorage token
            const token = localStorage.getItem('medicare_admin_token');
            if (token) {
                window.location.href = '/dashboard';
            }
        },
        methods: {
            async handleLogin() {
                this.error = null;
                this.isLoading = true;
                try {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.form)
                    });
                    const result = await response.json();
                    
                    if (response.ok && result.success) {
                        try {
                            // Authenticate the frontend Firebase Web SDK to permit Firestore reads/writes
                            await signInWithEmailAndPassword(auth, this.form.email, this.form.password);
                        } catch (firebaseErr) {
                            console.error("Firebase auth failed:", firebaseErr);
                        }
                        
                        // Store the JWT token for future requests
                        localStorage.setItem('medicare_admin_token', result.token);
                        localStorage.setItem('medicare_admin_user', JSON.stringify(result.user));
                        window.location.href = '/dashboard';
                    } else {
                        this.error = result.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
                    }
                } catch (err) {
                    console.error(err);
                    this.error = 'Không thể kết nối đến máy chủ.';
                } finally {
                    this.isLoading = false;
                }
            }
        }
    };

</script>
