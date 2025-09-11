<template>
  <div class="min-h-screen p-6 h-[900px]">
    <div class="max-w-7xl mx-auto h-full flex flex-col justify-evenly">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">Dashboard Sportif</h1>
          <p class="text-purple-200">Suivez vos performances et atteignez vos objectifs</p>
        </div>
        <router-link to="/add" 
          class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une séance
        </router-link>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-blue-500/20 rounded-xl">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-300 text-sm">Total séances</p>
              <p class="text-3xl font-bold text-white">{{ dashboardData?.totalSessions || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-green-500/20 rounded-xl">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-300 text-sm">Heures ce mois</p>
              <p class="text-3xl font-bold text-white">{{ dashboardData?.hoursThisMonth || 0 }}h</p>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-purple-500/20 rounded-xl">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <p class="text-gray-300 text-sm">Poids actuel</p>
              <p  class="text-3xl font-bold text-white">{{ dashboardData?.currentWeight || 0 }} kg</p>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-orange-500/20 rounded-xl">
              <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-300 text-sm">Objectif</p>
              <p class="text-3xl font-bold text-white">{{ dashboardData?.targetWeight || 0 }} kg</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Evolution Chart -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Évolution du poids
          </h3>
          <div class="h-64">
            <svg class="w-full h-full" viewBox="0 0 400 200">
              <!-- Grid -->
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#grid)" />
              
              <!-- Weight Line -->
              <polyline
                :points="weightLinePoints"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Data Points -->
              <circle
                v-for="(point, index) in progressData"
                :key="index"
                :cx="50 + (index * 80)"
                :cy="200 - ((point.weight - 70) * 15)"
                r="6"
                fill="#8B5CF6"
              />
              
              <!-- X-axis labels -->
              <text
                v-for="(point, index) in progressData"
                :key="'x-' + index"
                :x="50 + (index * 80)"
                :y="190"
                text-anchor="middle"
                class="fill-gray-400 text-xs"
              >
                {{ point.date }}
              </text>
              
              <!-- Y-axis labels -->
              <text x="20" y="25" class="fill-gray-400 text-xs">78kg</text>
              <text x="20" y="105" class="fill-gray-400 text-xs">75kg</text>
              <text x="20" y="185" class="fill-gray-400 text-xs">72kg</text>
            </svg>
          </div>
        </div>

        <!-- Weekly Activity -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Activité hebdomadaire
          </h3>
          <div class="h-64 flex items-end justify-between gap-4">
            <div
              v-for="(day, index) in weeklyActivity"
              :key="index"
              class="flex-1 flex flex-col items-center gap-2"
            >
              <div
                :style="{ height: (day.sessions * 40) + 20 + 'px' }"
                class="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-500 hover:to-green-300"
              ></div>
              <span class="text-gray-300 text-sm">{{ day.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Sessions -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 class="text-xl font-semibold text-white mb-6">Séances récentes</h3>
        <div class="space-y-4">
          <div
            v-for="session in recentSessions"
            :key="session.id"
            class="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            @click="viewSession(session.id)"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="p-2 bg-purple-500/20 rounded-lg">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-white font-semibold">{{ session.type }}</h4>
                  <p class="text-gray-300 text-sm">{{ session.date }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-white font-semibold">{{ session.duration }}</p>
                <p class="text-gray-300 text-sm">{{ session.calories }} cal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// État réactif
const dashboardData = ref(null);

onMounted(async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  dashboardData.value = await response.json();
})



const progressData = ref([
  { date: '01/09', weight: 78, km: 5.2, duration: 35 },
  { date: '03/09', weight: 77.5, km: 6.1, duration: 42 },
  { date: '05/09', weight: 77, km: 5.8, duration: 38 },
  { date: '07/09', weight: 76.2, km: 7.2, duration: 52 },
  { date: '08/09', weight: 75, km: 6.5, duration: 45 }
])

const weeklyActivity = ref([
  { day: 'Lun', sessions: 2 },
  { day: 'Mar', sessions: 1 },
  { day: 'Mer', sessions: 3 },
  { day: 'Jeu', sessions: 2 },
  { day: 'Ven', sessions: 1 },
  { day: 'Sam', sessions: 4 },
  { day: 'Dim', sessions: 2 }
])

const recentSessions = ref([
  { id: 1, type: 'Course', duration: '45 min', calories: 420, date: 'Aujourd\'hui' },
  { id: 2, type: 'Musculation', duration: '60 min', calories: 380, date: 'Hier' },
  { id: 3, type: 'Yoga', duration: '30 min', calories: 150, date: 'Il y a 2 jours' }
])


// Computed pour la ligne de poids SVG
const weightLinePoints = computed(() => {
  return progressData.value
    .map((point, index) => `${50 + (index * 80)},${200 - ((point.weight - 70) * 15)}`)
    .join(' ')
})

// Méthodes
const addSession = () => {
  console.log('Ajouter une nouvelle séance')
  // Ici tu pourrais ouvrir un modal ou naviguer vers une autre page
}

const viewSession = (sessionId) => {
  console.log('Voir détails de la séance:', sessionId)
  // Navigation vers le détail de la séance
}

// Lifecycle
onMounted(() => {
  console.log('Dashboard monté avec succès!')
})
</script>

<style scoped>
/* Animations personnalisées */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out;
}

.grid > div:nth-child(2) {
  animation-delay: 0.1s;
}

.grid > div:nth-child(3) {
  animation-delay: 0.2s;
}

.grid > div:nth-child(4) {
  animation-delay: 0.3s;
}
</style>