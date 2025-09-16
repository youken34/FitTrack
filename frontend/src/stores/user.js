import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(user, token) {
      this.user = user;
      this.token = token;
    },
    loadFromStorage() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (user && token) {
        this.setUser(user, token);
      }
    },
    updateWeight(newWeight) {
      if (this.user) {
        this.user.weight = newWeight;
        if (!this.user.weightHistory) {
          this.user.weightHistory = [];
        }
        console.log(
          newWeight,
          this.user.weightHistory[this.user.weightHistory.length - 1]?.weight
        );
        if (
          newWeight ===
          this.user.weightHistory[this.user.weightHistory.length - 1]?.weight
        )
          return;
        this.user.weightHistory.push({
          date: new Date(),
          weight: newWeight,
        });
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
