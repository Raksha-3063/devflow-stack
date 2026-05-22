import { db } from "../db.js";

export const DashboardView = {
  async render() {
    const user = db.getCurrentUser();
    if (!user) return `<div class="glass-card" style="text-align: center; padding: 40px;"><h2>Access Denied</h2></div>`;

    // Fetch user counts from actual DB to ensure real-time consistency
    const questions = db.findMany("questions", q => q.authorId === user.id) || [];
    const answers = db.findMany("answers", a => a.authorId === user.id) || [];
    
    const questionsCount = questions.length;
    const answersCount = answers.length;

    // Generate user initials for avatar
    const initials = user.name ? user.name.slice(0, 2).toUpperCase() : "U";

    return `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div class="glass-card profile-card">
          <div class="profile-avatar-large">${initials}</div>
          <div class="profile-info">
            <h2>${user.name}</h2>
            <p><i class="fa-regular fa-envelope" style="margin-right: 8px;"></i>${user.email}</p>
            <p style="margin-top: 8px; font-size: 0.85rem; color: hsl(var(--text-muted));">Member since ${new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="glass-card stat-card">
            <i class="fa-solid fa-award" style="font-size: 1.5rem; color: hsl(var(--accent-primary));"></i>
            <div class="stat-value">${user.reputation || 1}</div>
            <div class="stat-label">Reputation</div>
          </div>
          <div class="glass-card stat-card">
            <i class="fa-solid fa-question-circle" style="font-size: 1.5rem; color: hsl(var(--accent-primary));"></i>
            <div class="stat-value">${questionsCount}</div>
            <div class="stat-label">Questions Asked</div>
          </div>
          <div class="glass-card stat-card">
            <i class="fa-solid fa-comment-dots" style="font-size: 1.5rem; color: hsl(var(--accent-primary));"></i>
            <div class="stat-value">${answersCount}</div>
            <div class="stat-label">Answers Given</div>
          </div>
        </div>

        <div class="glass-card">
          <h3 style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">Recent Activity</h3>
          
          <div class="empty-state">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <h3>No recent activity found</h3>
            <p>Ask a question or post an answer to get started on DevFlow!</p>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Dashboard specific logic (if any) goes here.
    // Logging out is handled at the shell level in app.js, 
    // but we can also wire any button if we put it on the page.
  }
};
