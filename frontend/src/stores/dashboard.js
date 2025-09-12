import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    data: null,
    loading: false,
  }),
  actions: {
    async fetchDashboardData() {
      if (this.data) return this.data;

      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        this.data = json;
        return json;
      } catch (err) {
        console.error("❌ Dashboard fetch error:", err);
      } finally {
        this.loading = false;
      }
    },
    updateDashboardData(duration) {
      this.data.totalSessions++;
      this.data.hoursThisMonth =
        (this.data.hoursThisMonth || 0) + duration / 60;
    },
    clear() {
      this.data = null;
    },
  },
});
