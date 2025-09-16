<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto h-[720px]">
      <!-- Header -->
      <div class="flex items-center gap-4" style="margin-bottom: 10px;">
        <div>
          <h1 class="text-3xl font-bold text-white">Mon Profil</h1>
          <p class="text-purple-200">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <!-- Colonne de gauche - Avatar et infos rapides -->
        <div class="lg:col-span-1 space-y-6 flex flex-col justify-between h-[54%]">
          <!-- Avatar Section -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div class="relative inline-block mb-4">
              <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <h2 class="text-xl font-bold text-white mb-1">
              {{ userStore.user.firstName }} {{ userStore.user.lastName }}
            </h2>
            <p class="text-purple-200 text-sm">Membre depuis le {{ formatDate(userStore.user.createdAt) }}</p>
          </div>

          <!-- Stats rapides -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 class="text-lg font-semibold text-white mb-4">Objectifs</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Poids actuel</span>
                <span class="text-white font-semibold">{{ userStore.user.weight || '--' }} kg</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-300">Objectif</span>
                <span class="text-white font-semibold">{{ userStore.user.targetWeight || '--' }} kg</span>
              </div>
              <div v-if="userStore.user.weight && userStore.user.targetWeight" class="pt-2">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-300 text-sm">Progression</span>
                  <span class="text-purple-300 text-sm font-medium">{{ progressPercentage }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    :style="{ width: Math.min(progressPercentage, 100) + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-gray-400 mt-1">
                  {{ remainingWeight > 0 ? `${remainingWeight} kg restants` : 'Objectif atteint !' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne de droite - Formulaire -->
        <div class="lg:col-span-2 flex flex-col justify-between size-fit">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-2xl font-semibold text-white">Informations personnelles</h3>
              <div class="flex gap-2">
                <button
                  v-if="isEditing"
                  @click="resetForm"
                  type="button"
                  class="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-gray-300 font-medium transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                    v-else
                  @click="isEditing = !isEditing"
                  type="button"
                  :class="[
                    'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                    isEditing 
                      ? 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30' 
                      : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                  ]"
                >Modifier
                </button>
              </div>
            </div>

            <form @submit.prevent="updateInfo" class="space-y-8">
              
              <!-- Informations personnelles -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full" style="margin-bottom: 10px;">
                <div class="h-full">
                  <label class="block text-sm font-medium text-gray-200 mb-3 ">
                    <svg class="w-4 h-4 inline mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Prénom
                  </label>
                  <input
                    v-model="userStore.user.firstName"
                    type="text"
                    :disabled="!isEditing"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre prénom"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-3">
                    <svg class="w-4 h-4 inline mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Nom de famille
                  </label>
                  <input
                    v-model="userStore.user.lastName"
                    type="text"
                    :disabled="!isEditing"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <!-- Section Poids -->
              <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/20">
                <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Gestion du poids
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-200 mb-3">
                      Poids actuel (kg)
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="userStore.user.weight"
                        type="number"
                        step="0.1"
                        min="30"
                        max="300"
                        :disabled="!isEditing"
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="70.5"
                      />
                      <span class="absolute right-3 top-3.5 text-gray-400 text-sm">kg</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-2">Votre poids actuel pour le suivi</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-200 mb-3">
                      Poids objectif (kg)
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="userStore.user.targetWeight"
                        type="number"
                        step="0.1"
                        min="30"
                        max="300"
                        :disabled="!isEditing"
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="65.0"
                      />
                      <span class="absolute right-3 top-3.5 text-gray-400 text-sm">kg</span>
                    </div>
                    <p class="text-xs text-gray-400 mt-2">Le poids que vous souhaitez atteindre</p>
                  </div>
                </div>

                <!-- Visualisation graphique de l'objectif -->
                <div v-if="userStore.user.weight && userStore.user.targetWeight" class="mt-6 p-4 bg-white/5 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-300">{{ userStore.user.weight }} kg</span>
                    <span class="text-sm text-gray-300">{{ userStore.user.targetWeight }} kg</span>
                  </div>
                  <div class="relative h-3 bg-gray-700 rounded-full overflow-hidden items-center flex">
                   <div 
                    class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 h-full"
                    :style="{ width: Math.min(progressPercentage, 100) + '%' }"
                  ></div>
                  </div>
                  <div class="flex justify-center mt-2">
                    <span class="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                      {{ Math.abs(remainingWeight).toFixed(1) }} kg {{ userStore.user.weight > userStore.user.targetWeight ? 'à perdre' : 'à prendre' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div v-if="isEditing" class="flex gap-4 pt-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-gray-300 font-semibold transition-all duration-300"
                >
                  Réinitialiser
                </button>
                <button
                   type="submit"
                  :disabled="isLoading"
                  class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:transform-none disabled:shadow-none"
                >
                  <span v-if="!isLoading" class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Sauvegarder les modifications
                  </span>
                  <div v-else class="flex items-center justify-center gap-2">
                    <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sauvegarde...
                  </div>
                </button>
              </div>
            </form>
          </div>

          <!-- Historique des modifications -->
          <div v-if="userStore.user.weightHistory && userStore.user.weightHistory.length > 0" class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20" style="margin-top: 20px;">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Historique récent
            </h3>
            <div class="space-y-2">
              <div
                v-for="entry in [...userStore.user.weightHistory].reverse()"
                class="flex justify-between items-center py-2 px-3 bg-white/5 rounded-lg" style="margin-bottom: 5px;"
              >
                <span class="text-gray-300 text-sm">{{ formatDate(entry.date)}}</span>
                <span class="text-white font-medium">{{ entry.weight }} kg</span>
              </div>
            </div>
          </div>
        </div>
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
          Profil mis à jour avec succès !
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { formatDate } from '../../utils/timeFormatter'

const userStore = useUserStore()
const isEditing = ref(false)
const isLoading = ref(false)
const showSuccess = ref(false)


const remainingWeight = computed(() => {
    if (!userStore.user.weight || !userStore.user.targetWeight) return 0
    if (userStore.user.weight > userStore.user.targetWeight) {
        return userStore.user.weight - userStore.user.targetWeight
    }
    else if (userStore.user.weight < userStore.user.targetWeight) {
        return userStore.user.targetWeight - userStore.user.weight
        
    }
    else {
        return 0
    }
})

const progressPercentage = computed(() => {
  if (!userStore.user.weight || !userStore.user.targetWeight) return 0
  console.log(userStore.user)

  if (userStore.user.weight > userStore.user.targetWeight) {
    const initialWeight = userStore.user.weightHistory[0].weight
    const totalLoss = initialWeight - userStore.user.targetWeight
    const currentLoss = initialWeight - userStore.user.weight
    return Math.round((currentLoss / totalLoss) * 100)
  }
  else if (userStore.user.weight < userStore.user.targetWeight) {
    const initialWeight = userStore.user.weightHistory[0].weight
    const totalGain = userStore.user.targetWeight - initialWeight
    const currentGain = userStore.user.weight - initialWeight
    return Math.round((currentGain / totalGain) * 100)
  }
  else {
      return 100
  }

})

// Méthodes
const resetForm = () => {
  userStore.user = { ...useUserStore().user }
  isEditing.value = false
}

const updateInfo = async () => {

  const token = localStorage.getItem("token")

  try {
    isLoading.value = true
    const response = await fetch("http://localhost:5000/api/users/updateInfo", {
      method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

       },
      body: JSON.stringify({
        firstName: userStore.user.firstName,
        lastName: userStore.user.lastName,
        weight: userStore.user.weight,
        targetWeight: userStore.user.targetWeight,
      })
    })
    isEditing.value = false

    const updatedUser = await response.json()

    userStore.user = updatedUser
      
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error)
    alert('Une erreur est survenue lors de la mise à jour. Veuillez réessayer.')
  } finally {
    isLoading.value = false
  }
}

function handleBeforeUnload(e) {
  if (isEditing.value) {
    e.preventDefault()
    e.returnValue = ''  
  }
}



onMounted(() => {
  resetForm()  
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

/* Transitions fluides */
input:disabled {
  transition: all 0.3s ease;
}

input:focus:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
}

/* Effets de hover personnalisés */
.grid button:hover {
  transform: translateY(-1px);
}

/* Progress bar animation */
.bg-gradient-to-r.from-purple-500 {
  animation: progressFill 1s ease-in-out;
}

@keyframes progressFill {
  from {
    width: 0;
  }
  to {
    width: var(--target-width);
  }
}

/* Avatar hover effect */
.relative .absolute {
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

.relative:hover .absolute {
  transform: scale(1);
}
</style>