import { db } from "./js/db.js";
import { Router } from "./js/router.js";
import { SignupView } from "./js/views/signup.js";
import { LoginView } from "./js/views/login.js";
import { DashboardView } from "./js/views/dashboard.js";

// Global Toast notification utility
export function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconClass = "fa-check-circle";
  if (type === "error") {
    iconClass = "fa-circle-xmark";
  } else if (type === "warning") {
    iconClass = "fa-triangle-exclamation";
  }
  
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add("fade-out-toast");
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3500);
}

// Expose toast notification globally for views
window.showToast = showToast;

// Shell rendering functions
function updateShell() {
  const user = db.getCurrentUser();
  const header = document.getElementById("header");
  const sidebar = document.getElementById("sidebar");

  if (!header || !sidebar) return;

  // Render Header
  if (user) {
    const initials = user.name ? user.name.slice(0, 2).toUpperCase() : "U";
    header.innerHTML = `
      <div class="logo">
        <i class="fa-solid fa-bolt"></i> DevFlow
      </div>
      <div class="header-actions">
        <div class="header-user-badge">
          <div class="header-user-avatar">${initials}</div>
          <span>${user.name} <span style="color: hsl(var(--accent-primary)); font-weight: 600;">(${user.reputation} ★)</span></span>
        </div>
        <button id="logout-btn" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem;">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    `;
    
    const logoutBtn = header.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }
  } else {
    header.innerHTML = `
      <div class="logo">
        <i class="fa-solid fa-bolt"></i> DevFlow
      </div>
      <div class="header-actions">
        <a href="#login" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem;">Log In</a>
        <a href="#signup" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Sign Up</a>
      </div>
    `;
  }

  // Render Sidebar
  if (user) {
    sidebar.innerHTML = `
      <div style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 600; color: hsl(var(--text-primary));">
        Menu
      </div>
      <ul class="nav-list">
        <li class="nav-item" id="nav-dashboard">
          <a href="#dashboard">
            <i class="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="nav-item" id="nav-questions">
          <a href="#questions">
            <i class="fa-solid fa-question"></i>
            <span>Questions</span>
          </a>
        </li>
      </ul>
      <div style="margin-top: auto; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px;">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" id="sidebar-logout-btn">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    `;
    const sidebarLogout = sidebar.querySelector("#sidebar-logout-btn");
    if (sidebarLogout) {
      sidebarLogout.addEventListener("click", (e) => {
        e.preventDefault();
        handleLogout();
      });
    }
  } else {
    sidebar.innerHTML = `
      <div style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 600; color: hsl(var(--text-primary));">
        DevFlow
      </div>
      <ul class="nav-list">
        <li class="nav-item" id="nav-login">
          <a href="#login">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Log In</span>
          </a>
        </li>
        <li class="nav-item" id="nav-signup">
          <a href="#signup">
            <i class="fa-solid fa-user-plus"></i>
            <span>Sign Up</span>
          </a>
        </li>
      </ul>
    `;
  }
}

function handleLogout() {
  db.clearCurrentUser();
  showToast("Logged out successfully.", "success");
  window.dispatchEvent(new CustomEvent("auth-state-changed"));
  window.location.hash = "#login";
}

// Subscribe to auth state shifts to dynamically update shell
window.addEventListener("auth-state-changed", () => {
  updateShell();
});

// Configure Route map
const routes = {
  "#login": {
    render: () => LoginView.render(),
    init: () => LoginView.init(),
    guestOnly: true
  },
  "#signup": {
    render: () => SignupView.render(),
    init: () => SignupView.init(),
    guestOnly: true
  },
  "#dashboard": {
    render: () => DashboardView.render(),
    init: () => DashboardView.init(),
    requiresAuth: true
  },
  "#questions": {
    render: async () => `
      <div class="glass-card" style="text-align: center; padding: 60px 40px; color: hsl(var(--text-secondary));">
        <i class="fa-solid fa-cubes" style="font-size: 3rem; color: hsl(var(--text-muted)); margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.25rem; color: hsl(var(--text-primary)); margin-bottom: 8px;">Questions Listing</h3>
        <p style="max-width: 400px; margin: 0 auto; font-size: 0.95rem;">The Questions component is part of Phase 2 development. Stay tuned!</p>
      </div>
    `,
    init: () => {}
  },
  "#404": {
    render: async () => `
      <div style="display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 200px); padding: 20px;">
        <div class="glass-card" style="text-align: center; max-width: 500px; padding: 40px; width: 100%;">
          <i class="fa-solid fa-compass-drafting" style="font-size: 4rem; color: hsl(var(--accent-primary)); margin-bottom: 20px;"></i>
          <h2 style="font-size: 2rem; margin-bottom: 10px;">Page Not Found</h2>
          <p style="color: hsl(var(--text-secondary)); margin-bottom: 30px;">The route you are trying to access does not exist.</p>
          <a href="#" class="btn btn-primary">Go to Home</a>
        </div>
      </div>
    `,
    init: () => {}
  }
};

// Initialize DB and UI shell
updateShell();

// Initialize Router
const router = new Router(
  routes,
  "main-content",
  () => db.getCurrentUser() !== null,
  (message, type) => showToast(message, type)
);

router.init();

// Hook route changes to re-run shell update in case of navigation updates
window.addEventListener("hashchange", () => {
  updateShell();
});
