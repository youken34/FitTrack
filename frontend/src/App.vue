<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ChartNoAxesCombined, BadgePlus, LayoutDashboard, LogOut } from "lucide-vue-next";
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const isLoggedIn = computed(() => !!userStore.token);
const router = useRouter()

const logOut = () => {
  userStore.logout()
  router.push('/login')
};
</script>

<template>
  <header v-if="isLoggedIn">
    <nav>
      <RouterLink to="/" v-slot="{ isExactActive }">
        <LayoutDashboard :class="['w-12 h-12', isExactActive ? 'text-blue-500' : 'text-white']" />
      </RouterLink>

      <RouterLink to="/add" v-slot="{ isExactActive }">
        <BadgePlus :class="['w-12 h-12', isExactActive ? 'text-blue-500' : 'text-white']" />
      </RouterLink>

      <RouterLink to="/about" v-slot="{ isExactActive }">
        <ChartNoAxesCombined :class="['w-12 h-12', isExactActive ? 'text-blue-500' : 'text-white']" />
      </RouterLink>
    </nav>
    <LogOut
      class="w-12 h-12 text-white cursor-pointer"
      @click="logOut()"></LogOut>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}


nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
