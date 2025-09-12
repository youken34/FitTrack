<template>
  <div class="min-h-[80vh] px-6">
    <div class="max-w-2xl mx-auto flex flex-col h-full">
      <!-- Header avec retour -->
      <div class="flex items-center gap-4" style="margin-block: 10px;">
        <div>
          <h1 class="text-3xl font-bold text-white">Nouvelle Séance</h1>
          <p class="text-purple-200">Enregistrez votre entraînement</p>
        </div>
      </div>

      <!-- Formulaire principal -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          
          <!-- Sélection du groupe musculaire -->
          <div>
            <label class="block text-lg font-semibold text-white" style="margin-bottom: 5px;">
              <svg class="w-5 h-5 inline mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Groupe musculaire *
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                v-for="muscle in muscleGroups"
                :key="muscle.name"
                type="button"
                @click="sessionForm.muscleGroup = muscle.name"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 hover:scale-105',
                  sessionForm.muscleGroup === muscle.name
                    ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 text-white shadow-lg'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                ]"
              >
                <div class="text-2xl">{{ muscle.emoji }}</div>
                <span class="font-medium text-sm">{{ muscle.name }}</span>
              </button>
            </div>
            <p v-if="errors.muscleGroup" class="text-red-400 text-sm mt-2">{{ errors.muscleGroup }}</p>
          </div>

          <!-- Date et durée -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Date -->
            <div>
              <label class="block text-lg font-semibold text-white" style="margin-bottom: 4px;">
                <svg class="w-5 h-5 inline mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date de la séance
              </label>
              <div class="relative">
                <input
                  v-model="sessionForm.date"
                  type="date"
                  :max="today"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div class="flex gap-2" style="margin-top: 10px;">
                <button
                  type="button"
                  @click="setDateToday"
                  class="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Aujourd'hui
                </button>
                <button
                  type="button"
                  @click="setDateYesterday"
                  class="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Hier
                </button>
              </div>
            </div>

            <!-- Durée -->
            <div>
              <label class="block text-lg font-semibold text-white" style="margin-bottom: 4px;">
                <svg class="w-5 h-5 inline mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Durée (minutes) *
              </label>
              <div class="relative">
                <input
                  v-model.number="sessionForm.duration"
                  type="number"
                  min="1"
                  max="300"
                  required
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="45"
                />
                <span class="absolute right-3 top-3.5 text-gray-400 text-sm">min</span>
              </div>
              <!-- Boutons rapides pour la durée -->
              <div class="flex gap-2 flex-wrap" style="margin-top: 10px;">
                <button
                  v-for="duration in quickDurations"
                  :key="duration"
                  type="button"
                  @click="sessionForm.duration = duration"
                  :class="[
                    'text-xs px-3 py-1 rounded-lg transition-colors',
                    sessionForm.duration === duration
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  ]"
                >
                  {{ duration }}min
                </button>
              </div>
              <p v-if="errors.duration" class="text-red-400 text-sm mt-2">{{ errors.duration }}</p>
            </div>
          </div>

          <!-- Calories (optionnel) -->
          <div>
            <label class="block text-lg font-semibold text-white mb-3">
              <svg class="w-5 h-5 inline mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              Calories brûlées 
              <span class="text-sm text-gray-400 font-normal">(optionnel)</span>
            </label>
            <div class="relative">
              <input
                v-model.number="sessionForm.calories"
                type="number"
                min="0"
                max="2000"
                class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="350"
              />
              <span class="absolute right-3 top-3.5 text-gray-400 text-sm">kcal</span>
            </div>
            <!-- Estimation automatique -->
            <div v-if="estimatedCalories && !sessionForm.calories" class="mt-2">
              <button
                type="button"
                @click="sessionForm.calories = estimatedCalories"
                class="text-xs px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors"
              >
                Utiliser l'estimation: {{ estimatedCalories }} kcal
              </button>
            </div>
          </div>

          <!-- Preview de la séance -->
          <div v-if="isFormValid" class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30" style="margin-top: 10px;">
            <h3 class="text-white font-semibold mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Aperçu de la séance
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div class="text-center">
                <div class="text-2xl mb-1">{{ getMuscleEmoji(sessionForm.muscleGroup) }}</div>
                <div class="text-purple-200">{{ sessionForm.muscleGroup }}</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-white mb-1">{{ sessionForm.duration }}</div>
                <div class="text-purple-200">minutes</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-white mb-1">{{ formatDate(sessionForm.date) }}</div>
                <div class="text-purple-200">date</div>
              </div>
              <div v-if="sessionForm.calories" class="text-center">
                <div class="text-xl font-bold text-white mb-1">{{ sessionForm.calories }}</div>
                <div class="text-purple-200">kcal</div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex gap-4 pt-4">
            <button
              type="button"
              @click="resetForm"
              class="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-gray-300 font-semibold transition-all duration-300"
            >
              Réinitialiser
            </button>
            <button
              @click="createSession"
              :disabled="!isFormValid || isLoading"
              class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:shadow-none"
            >
              <span v-if="!isLoading" class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer la séance
              </span>
              <div v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </div>
            </button>
          </div>
        </form>
      </div>

      <!-- Message de succès -->
      <div
        v-if="showSuccess"
        class="fixed top-4 right-4 bg-green-500/90 backdrop-blur-lg text-white px-6 py-4 rounded-xl shadow-lg border border-green-400/20 transform transition-all duration-500 z-50"
      >
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Séance enregistrée avec succès !
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from "@/stores/dashboard";

const dashboardStore = useDashboardStore();

// État réactif
const isLoading = ref(false)
const showSuccess = ref(false)
const errors = ref({})

// Formulaire
const sessionForm = ref({
  muscleGroup: '',
  date: '',
  duration: null,
  calories: null
})

// Données
const muscleGroups = ref([
  { name: 'Dos', emoji: '🔥' },
  { name: 'Biceps', emoji: '💪' },
  { name: 'Triceps', emoji: '🏋️' },
  { name: 'Jambes', emoji: '🦵' },
  { name: 'Épaules', emoji: '🤸' }
])

const quickDurations = ref([15, 30, 45, 60, 90, 120])

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Estimation des calories basée sur la durée et le groupe musculaire
const estimatedCalories = computed(() => {
  if (!sessionForm.value.duration || !sessionForm.value.muscleGroup) return 0
  
  const baseCaloriesPerMinute = {
    'Dos': 8,
    'Biceps': 6,
    'Triceps': 6,
    'Jambes': 10,
    'Épaules': 7
  }
  
  const rate = baseCaloriesPerMinute[sessionForm.value.muscleGroup] || 7
  return Math.round(sessionForm.value.duration * rate)
})

const isFormValid = computed(() => {
  return sessionForm.value.muscleGroup && 
         sessionForm.value.date && 
         sessionForm.value.duration > 0
})

// Méthodes
const setDateToday = () => {
  sessionForm.value.date = today.value
}

const setDateYesterday = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  sessionForm.value.date = yesterday.toISOString().split('T')[0]
}

const getMuscleEmoji = (muscleName) => {
  const muscle = muscleGroups.value.find(m => m.name === muscleName)
  return muscle ? muscle.emoji : '💪'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Hier"
  } else {
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    })
  }
}

const validateForm = () => {
  errors.value = {}
  
  if (!sessionForm.value.muscleGroup) {
    errors.value.muscleGroup = 'Veuillez sélectionner un groupe musculaire'
  }
  
  if (!sessionForm.value.duration || sessionForm.value.duration <= 0) {
    errors.value.duration = 'La durée doit être supérieure à 0 minutes'
  }
  
  return Object.keys(errors.value).length === 0
}

const createSession = async () => {
  if (!validateForm()) return

  isLoading.value = true

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/api/sessions", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify({
        duration: sessionForm.value.duration,
        calories: sessionForm.value.calories,
        muscleGroup: sessionForm.value.muscleGroup,
        date: sessionForm.value.date,
      })
    })

    if (!response.ok) throw new Error("Erreur serveur")
    isLoading.value = false
    dashboardStore.updateDashboardData(sessionForm.value.duration)
  } catch (error) {
    console.error("❌ Erreur d'inscription:", error)
  } finally {
    isLoading.value = false
  }

}

const resetForm = () => {
  sessionForm.value = {
    muscleGroup: '',
    date: today.value,
    duration: null,
    calories: null
  }
  errors.value = {}
}



// Lifecycle
onMounted(() => {
  // Initialiser la date à aujourd'hui
  sessionForm.value.date = today.value
})
</script>

<style scoped>
/* Animations personnalisées */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white\/10 {
  animation: slideInUp 0.6s ease-out;
}

/* Transitions fluides pour les boutons de sélection */
.grid button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid button:hover {
  transform: translateY(-2px);
}

/* Styling pour les inputs de type date */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

/* Custom focus states */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}
</style>