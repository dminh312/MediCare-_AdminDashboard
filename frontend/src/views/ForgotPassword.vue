<template>
<div class="bg-background text-on-surface dark:text-slate-100 min-h-screen flex flex-col">
  <!-- TopAppBar -->
  <header class="bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm docked full-width top-0 sticky z-50 border-b border-red-900/5 dark:border-red-400/10 shadow-[0_2px_8px_rgba(255,82,82,0.05)]">
    <div class="flex justify-between items-center w-full px-8 py-4">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold tracking-tighter text-red-500 dark:text-red-400">MediCare+</span>
      </div>
      <div class="flex items-center gap-4">
        <button class="text-slate-600 dark:text-slate-400 dark:text-slate-400 font-medium hover:text-red-500 hover:text-red-300 transition-colors duration-200 active:scale-95 transition-transform duration-150">
          <span class="material-symbols-outlined align-middle">help_outline</span>
        </button>
      </div>
    </div>
  </header>

  <!-- FORM VIEW -->
  <main v-if="!isSent" class="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
    <!-- Abstract Background -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 -left-24 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-8 md:p-10 shadow-[0_4px_24px_rgba(255,82,82,0.04)] ring-1 ring-red-900/5 dark:ring-red-500/10">
        <div class="mb-10 text-center">
          <div class="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-outlined text-primary text-3xl">lock_reset</span>
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-on-surface dark:text-slate-100 mb-3">Reset Admin Password</h1>
          <p class="text-on-surface dark:text-slate-100 text-sm leading-relaxed max-w-[280px] mx-auto">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleReset">
          <div class="space-y-2">
            <label class="block text-[11px] font-bold uppercase tracking-widest text-on-surface dark:text-slate-100 px-1" for="admin_email">
              Admin Email
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">mail</span>
              </div>
              <input v-model="email" class="block w-full pl-11 pr-4 py-3.5 bg-surface-container-low dark:bg-slate-900/50 border-0 rounded-lg text-on-surface dark:text-slate-100 placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 transition-all duration-200" id="admin_email" type="email" placeholder="e.g. admin@medicareplus.com" required />
            </div>
          </div>
          
          <div v-if="errorMsg" class="text-xs font-bold text-red-500 text-center">
            {{ errorMsg }}
          </div>

          <button :disabled="loading" class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-[0_4px_12px_rgba(255,82,82,0.2)] hover:shadow-[0_6px_20px_rgba(255,82,82,0.3)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 text-sm tracking-wide disabled:opacity-50" type="submit">
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>

        <div class="mt-8 pt-8 border-t border-surface-variant/30 text-center">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm font-bold text-on-surface dark:text-slate-100 hover:text-primary transition-colors group">
            <span class="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Login
          </router-link>
        </div>
      </div>

      <div class="mt-8 text-center px-4">
        <p class="text-xs text-on-surface dark:text-slate-100/60">
          Having trouble? Contact the system administrator at <br/>
          <span class="text-primary font-medium">it-support@medicareplus.com</span>
        </p>
      </div>
    </div>
  </main>

  <!-- SUCCESS VIEW (Replacing the body) -->
  <main v-if="isSent" class="flex-grow flex items-center justify-center p-6 selection:bg-primary-container selection:text-primary relative overflow-hidden">
    <!-- Visual Texture / Background Elements -->
    <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div class="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-[100px]"></div>
    </div>
    
    <div class="w-full max-w-lg relative z-10">
        <!-- Brand Identity Anchor -->
        <div class="mb-10 text-center">
            <span class="text-xl font-black tracking-tighter text-primary uppercase">MediCare+ Admin Terminal</span>
        </div>

        <!-- Central Confirmation Card -->
        <div class="bg-surface-container-lowest dark:bg-slate-900 rounded-xl shadow-[0_1px_2px_rgba(255,82,82,0.05)] overflow-hidden ring-1 ring-red-900/5 dark:ring-red-500/10">
            <div class="p-8 md:p-12 text-center">
                
                <!-- Success Anchor Icon -->
                <div class="mb-8 flex justify-center">
                    <div class="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center shadow-inner">
                        <span class="material-symbols-outlined text-primary text-5xl pulse-active">
                            mark_email_read
                        </span>
                    </div>
                </div>

                <!-- Editorial Headline -->
                <h1 class="text-2xl font-bold tracking-tight text-on-surface dark:text-slate-100 mb-4">
                    Check Your Email
                </h1>

                <!-- Body Copy -->
                <p class="text-on-surface dark:text-slate-100 leading-relaxed text-sm md:text-base px-2 mb-10">
                    We've sent a password reset link to your administrator email address. Please follow the instructions in the email to reset your password.
                </p>

                <!-- Action Center -->
                <div class="space-y-4">
                    <router-link to="/login" class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-[0_4px_16px_rgba(255,82,82,0.2)] hover:shadow-[0_4px_24px_rgba(255,82,82,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        Return to Login
                    </router-link>
                    
                    <div class="pt-4">
                        <p class="text-[11px] font-bold tracking-widest uppercase text-stone-400">
                            Didn't receive the email?
                        </p>
                        <button @click="handleReset" :disabled="loading" class="mt-2 text-primary font-bold text-sm hover:text-primary-dark transition-colors disabled:opacity-50">
                            {{ loading ? 'Resending...' : 'Resend Link' }}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Decorative Pulse Accent -->
            <div class="h-1.5 w-full bg-gradient-to-r from-primary/10 via-primary to-primary/10"></div>
        </div>

        <!-- Footer / Support -->
        <footer class="mt-8 text-center">
            <p class="text-on-surface dark:text-slate-100 text-[11px] font-bold tracking-widest uppercase opacity-60">
                © 2024 MediCare+ Admin Portal
            </p>
        </footer>
    </div>
  </main>

  <!-- Footer (only shown on the form view usually, but keeping it visible for the page design) -->
  <footer v-if="!isSent" class="bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-950 full-width py-12 border-t border-slate-200 dark:border-slate-800 mt-auto">
    <div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-4">
      <div class="text-sm font-bold text-slate-900 dark:text-slate-100">
        MediCare+ Admin Portal
      </div>
      <div class="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 dark:text-slate-400">
        © 2024 MediCare+ Admin Portal. All rights reserved.
      </div>
      <div class="flex gap-6">
        <a class="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all underline decoration-red-500/30" href="#">Privacy Policy</a>
        <a class="font-['Inter'] text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all underline decoration-red-500/30" href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      loading: false,
      isSent: false,
      errorMsg: ''
    }
  },
  methods: {
    async handleReset() {
      if (!this.email) return;
      this.loading = true;
      this.errorMsg = '';
      
      try {
        const res = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        });
        const data = await res.json();
        
        if (data.success) {
          this.isSent = true;
        } else {
          this.errorMsg = data.message || 'Error sending reset email.';
        }
      } catch (e) {
        this.errorMsg = 'Network error. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
