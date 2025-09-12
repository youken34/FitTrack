<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ChartNoAxesCombined, BadgePlus, LayoutDashboard, LogOut, User, Menu, X } from "lucide-vue-next";
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.token);
const router = useRouter()
const isMobileMenuOpen = ref(false)

const logOut = () => {
  userStore.logout()
  router.push('/login')
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Navigation items
const navItems = [
  {
    to: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    description: 'Vue d\'ensemble'
  },
  {
    to: '/add',
    icon: BadgePlus,
    label: 'Ajouter',
    description: 'Nouvelle séance'
  },
  {
    to: '/about',
    icon: ChartNoAxesCombined,
    label: 'Statistiques',
    description: 'Vos performances'
  }
]
</script>

<template>
  <!-- Header Desktop & Mobile -->
  <header v-if="isLoggedIn" class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-white/10" style="border-bottom: 1px solid #747373;">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex justify-between items-center h-16">
        <!-- Logo / Brand -->
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg font-bold text-white">FitTracker</h1>
            <p class="text-xs text-purple-200 -mt-1">Suivi sportif</p>
          </div>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center space-x-1 gap-3">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            v-slot="{ isExactActive }"
            class="group relative "
          >
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300',
                isExactActive 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg border border-purple-400/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              ]"
            >
              <component 
                :is="item.icon" 
                :class="[
                  'w-5 h-5 transition-colors',
                  isExactActive ? 'text-purple-300' : 'text-current'
                ]" 
              />
              <div class="hidden lg:block">
                <div class="text-sm font-medium">{{ item.label }}</div>
                <div class="text-xs opacity-75">{{ item.description }}</div>
              </div>
            </div>
          </RouterLink>
        </nav>

        <!-- Actions Desktop -->
        <div class="hidden md:flex items-center gap-3">
          <!-- User Profile Button -->
          <button class="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/20 transition-all duration-300 group">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <User class="w-4 h-4 text-white" />
            </div>
            <div class="hidden xl:block text-left">
              <div class="text-sm font-medium text-white">{{ userStore.user?.firstName || 'Utilisateur' }}</div>
              <div class="text-xs text-gray-400">Mon profil</div>
            </div>
          </button>

          <!-- Logout Button -->
          <button
            @click="logOut"
            class="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl border border-red-500/20 hover:border-red-500/30 transition-all duration-300 group"
          >
            <LogOut class="w-5 h-5" />
            <span class="hidden xl:block text-sm font-medium">Déconnexion</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-white" />
          <X v-else class="w-6 h-6 text-white" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-white/10"
    >
      <div class="px-4 py-4 space-y-2">
        <!-- Navigation Mobile -->
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="closeMobileMenu"
          v-slot="{ isExactActive }"
        >
          <div
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
              isExactActive 
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg border border-purple-400/30' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            ]"
          >
            <component 
              :is="item.icon" 
              :class="[
                'w-6 h-6 transition-colors',
                isExactActive ? 'text-purple-300' : 'text-current'
              ]" 
            />
            <div>
              <div class="font-medium">{{ item.label }}</div>
              <div class="text-sm opacity-75">{{ item.description }}</div>
            </div>
          </div>
        </RouterLink>

        <!-- Divider -->
        <div class="h-px bg-white/10 my-4"></div>

        <!-- User Profile Mobile -->
        <div class="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <User class="w-5 h-5 text-white" />
          </div>
          <div>
            <div class="font-medium text-white">{{ userStore.user?.firstName || 'Utilisateur' }}</div>
            <div class="text-sm text-gray-400">Mon profil</div>
          </div>
        </div>

        <!-- Logout Mobile -->
        <button
          @click="logOut"
          class="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl border border-red-500/20 transition-all duration-300"
        >
          <LogOut class="w-6 h-6" />
          <span class="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Content with padding to account for fixed header -->
  <main :class="{ 'pt-16': isLoggedIn }">
    <RouterView />
  </main>
</template>

<style scoped>
/* Animations pour le menu mobile */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.md\:hidden div {
  animation: slideDown 0.2s ease-out;
}

.bg-gradient-to-r.from-purple-500\/30 {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
}

button, .group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover {
  transform: translateY(-1px);
}

button:focus, a:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

@media (max-width: 768px) {
  .backdrop-blur-lg {
    backdrop-filter: blur(12px);
  }
}
</style>