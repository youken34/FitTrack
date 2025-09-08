<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ChartNoAxesCombined, BadgePlus, LayoutDashboard } from "lucide-vue-next";

</script>

<template>
  <header>

      <nav>
        <RouterLink to="/">    
          <LayoutDashboard class="w-12 h-12 text-white" />
        </RouterLink>
        <RouterLink to="/add">
          <BadgePlus class="w-12 h-12 text-white" />
        </RouterLink>
        <RouterLink to="/about">
          <ChartNoAxesCombined class="w-12 h-12 text-white" />
        </RouterLink> 
      </nav>

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
