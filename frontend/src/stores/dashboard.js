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
    updateDashboardData(newData) {
      this.data.totalSessions++;
      this.data.hoursThisMonth =
        (this.data.hoursThisMonth || 0) + newData.duration / 60;

      if (!this.data.lastSessions) this.data.lastSessions = [];
      this.data.lastSessions = [...this.data.lastSessions, newData.newSession]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      // 🔹 Calories par jour
      if (!this.data.sessionsByDay) this.data.sessionsByDay = Array(7).fill(0);
      const sessionDate = new Date(newData.newSession.date);
      const dayIndex = (sessionDate.getDay() + 6) % 7;

      this.data.sessionsByDay = this.data.sessionsByDay.map((calories, i) =>
        i === dayIndex
          ? calories + (newData.newSession.calories || 0)
          : calories
      );
    },
  },
});
