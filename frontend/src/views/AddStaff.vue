<template>
<div class="h-full bg-background text-on-background min-h-screen">


  <!-- TopAppBar -->
  <header class="sticky top-0 w-full z-40 flex justify-between items-center px-8 h-16 border-b border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950 dark:bg-slate-800/80/95 backdrop-blur-sm">
    <div class="flex items-center gap-4">

      <h1 class="font-['Inter'] font-bold text-lg text-[#ff5252]">Add Staff Member</h1>
    </div>
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400">
          <span class="text-xs font-bold">{{ currentUser?.email }}</span>
          <div class="h-8 w-8 rounded-full bg-zinc-200 overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <img alt="Admin Avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxK651i06tfhfjihv0DxyFskA0QBuW3FBt4rMtX8cIc2YlVnsmNXsGcQ4DyAiHw1k8NBKF46rEz1QsS80eMW4jYiIog4_IUIMb6Mu5krzZTDIVDSN9MBsIt9j34fjpTnzgcLDGEvfTVZfE14OHiWJdHHULRqCXcYpgKBAub0LX6fCSqU9loKXQ7c2ywp4q6xGB7R_KFbElenWF2JRvF3BvjvcoGJ7DC4Ov17WoNsVgTA4mxZxZ8bkTFJ-H0FQCPrI0VbgUZNBxZks"/>
          </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="py-8 px-8 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-2 text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase mb-6">
        <span>Staff Management</span>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="text-primary">Add New Staff</span>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <!-- Summary / Checklist Panel -->
        <div class="col-span-12 lg:col-span-4 space-y-6">
          <div class="p-8 rounded-lg bg-surface-container-low dark:bg-slate-900/50 border border-primary/5 flex flex-col gap-4 opacity-0 animate-slide-up-fade" style="animation-delay: 0.1s">
            <div class="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-3xl pulse-active">person_add</span>
            </div>
            <div>
              <h2 class="text-xl font-bold tracking-tight text-on-background">Staff Onboarding</h2>
              <p class="text-sm text-on-surface dark:text-slate-100 mt-2 leading-relaxed">Fill in the details to assign duties within the MediCare network.</p>
            </div>
          </div>
          
          <div class="p-6 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-zinc-50 dark:border-zinc-800/50 opacity-0 animate-slide-up-fade" style="animation-delay: 0.2s">
            <h3 class="text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase mb-4">Required Sections</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-3 text-sm font-medium" :class="identityComplete ? 'text-emerald-600' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400'">
                <span class="material-symbols-outlined text-sm pulse-active" v-if="identityComplete">check_circle</span>
                <span class="material-symbols-outlined text-sm" v-else>radio_button_unchecked</span>
                Identity Details
              </li>
              <li class="flex items-center gap-3 text-sm font-medium" :class="roleComplete ? 'text-emerald-600' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400'">
                <span class="material-symbols-outlined text-sm pulse-active" v-if="roleComplete">check_circle</span>
                <span class="material-symbols-outlined text-sm" v-else>radio_button_unchecked</span>
                Role Assignment
              </li>
              <li class="flex items-center gap-3 text-sm font-medium" :class="emailVerified ? 'text-emerald-600' : 'text-zinc-400 dark:text-zinc-500 dark:text-zinc-400'">
                <span class="material-symbols-outlined text-sm pulse-active" v-if="emailVerified">check_circle</span>
                <span class="material-symbols-outlined text-sm" v-else>radio_button_unchecked</span>
                Verification
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Form -->
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-zinc-50 dark:border-zinc-800/50 opacity-0 animate-slide-up-fade" style="animation-delay: 0.3s">
            <form @submit.prevent="finalizeStaff" class="space-y-8">
              
              <div class="space-y-6">
                <h3 class="text-sm font-bold tracking-tight border-b border-zinc-100 dark:border-zinc-800 pb-2">Personal Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">Full Name</label>
                    <input v-model="form.fullName" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" type="text"/>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">Email Address</label>
                    <input v-model="form.email" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" type="email"/>
                    <button v-if="form.email && !emailVerified" @click.prevent="sendVerificationEmail" class="mt-2 text-xs font-bold text-primary hover:underline">
                      <span v-if="verifyingEmail">Sending...</span>
                      <span v-else-if="verificationSent">Check Inbox & Verify</span>
                      <span v-else>Send Verification Email</span>
                    </button>
                    <span v-if="emailVerified" class="text-xs font-bold text-emerald-600 block mt-2">Email Verified</span>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">Phone Number</label>
                    <input v-model="form.phoneNumber" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" type="tel"/>
                  </div>
                  <div class="space-y-2">
                    <label class="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">Staff ID (Optional)</label>
                    <input v-model="form.staffId" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20" type="text"/>
                  </div>
                </div>
              </div>

              <!-- Role -->
              <div class="space-y-6">
                <h3 class="text-sm font-bold tracking-tight border-b border-zinc-100 dark:border-zinc-800 pb-2">Role Assignment</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-[11px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 uppercase">Professional Role</label>
                    <select v-model="form.role" class="w-full bg-zinc-50 dark:bg-slate-800/50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20">
                      <option disabled value="">Select Role</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="HR">HR</option>
                      <option value="Medicine management">Medicine management</option>
                      <option value="Admin">Admin</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <router-link to="/staff" class="px-6 py-2.5 rounded-lg text-sm font-bold text-zinc-500 hover:bg-zinc-50 dark:bg-slate-800/50 transition-colors">
                  Cancel
                </router-link>
                <button type="submit" :disabled="!allComplete" :class="allComplete ? 'bg-primary text-white dark:text-slate-200 hover:opacity-90' : 'bg-zinc-200 text-zinc-400 dark:text-zinc-500 dark:text-zinc-400 cursor-not-allowed'" class="px-8 py-2.5 rounded-lg text-sm font-bold transition-all">
                  {{ submitting ? 'Adding...' : 'Add Staff Member' }}
                </button>
              </div>
            </form>
          </div>
          
          <div class="mt-6 flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <span class="material-symbols-outlined text-primary text-xl">info</span>
            <p class="text-xs text-on-primary-container font-medium leading-relaxed">
                Clicking 'Send Verification Email' securely provisions their base access. You must wait for them to verify their email via the link sent before placing them on the active roster.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: null,
            form: {
                fullName: '',
                email: '',
                phoneNumber: '',
                staffId: '',
                role: ''
            },
            verifyingEmail: false,
            verificationSent: false,
            emailVerified: false,
            submitting: false,
            pollInterval: null
        }
    },
    computed: {
        identityComplete() {
            return this.form.fullName.length > 0 && this.form.email.length > 0 && this.form.phoneNumber.length > 0;
        },
        roleComplete() {
            return this.form.role.length > 0;
        },
        allComplete() {
            return this.identityComplete && this.roleComplete && this.emailVerified;
        }
    },
    created() {
        const userStr = localStorage.getItem('medicare_admin_user');
        if (userStr) {
            this.currentUser = JSON.parse(userStr);
        }
    },
    beforeDestroy() {
        if(this.pollInterval) clearInterval(this.pollInterval);
    },
    methods: {
        logout() {
            localStorage.removeItem('medicare_admin_token');
            localStorage.removeItem('medicare_admin_user');
            this.$router.push('/login');
        },
        async sendVerificationEmail() {
            if (!this.form.email) return;
            this.verifyingEmail = true;
            try {
                const response = await fetch('/api/staff/verify-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                    },
                    body: JSON.stringify({ email: this.form.email })
                });
                
                if (response.ok) {
                    this.verificationSent = true;
                    this.startPolling();
                } else {
                    alert("Error sending verification email");
                }
            } catch (err) {
                console.error(err);
                alert("Network error");
            } finally {
                this.verifyingEmail = false;
            }
        },
        startPolling() {
            if (this.pollInterval) clearInterval(this.pollInterval);
            this.pollInterval = setInterval(async () => {
                try {
                    const response = await fetch(`/api/staff/check-verification?email=${encodeURIComponent(this.form.email)}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                        }
                    });
                    const data = await response.json();
                    if (data.emailVerified) {
                        this.emailVerified = true;
                        clearInterval(this.pollInterval);
                    }
                } catch (e) {
                    // silently fail on poll
                }
            }, 3000);
        },
        async finalizeStaff() {
            if (!this.allComplete) return;
            this.submitting = true;
            try {
                const response = await fetch('/api/staff/finalize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('medicare_admin_token')}`
                    },
                    body: JSON.stringify(this.form)
                });
                
                if (response.ok) {
                    alert("Staff member successfully added to the roster!");
                    this.$router.push('/staff');
                } else {
                    const data = await response.json();
                    alert("Error: " + (data.message || "Could not finalize"));
                }
            } catch (err) {
                console.error(err);
                alert("Network error");
            } finally {
                this.submitting = false;
            }
        }
    }
}
</script>
