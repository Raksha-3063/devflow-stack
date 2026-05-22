// js/router.js

export class Router {
  constructor(routes, contentContainerId, authCheckFn, onRedirectFn) {
    this.routes = routes;
    this.container = document.getElementById(contentContainerId);
    this.authCheck = authCheckFn;
    this.onRedirect = onRedirectFn; // Callback to show toast warnings on redirect
    
    window.addEventListener("hashchange", () => this.handleRoute());
  }

  init() {
    this.handleRoute();
  }

  async handleRoute() {
    let hash = window.location.hash || "#";
    
    // Normalize hash: strip trailing slashes, keep it clean
    if (hash.endsWith("/") && hash.length > 2) {
      hash = hash.slice(0, -1);
    }

    // Default route redirects
    if (hash === "#" || hash === "") {
      if (this.authCheck()) {
        window.location.hash = "#dashboard";
      } else {
        window.location.hash = "#login";
      }
      return;
    }

    const route = this.routes[hash] || this.routes["#404"];

    // 1. Guard check: Guest-only views (like login/signup) when logged in
    if (route.guestOnly && this.authCheck()) {
      window.location.hash = "#dashboard";
      return;
    }

    // 2. Guard check: Protected views requiring authentication
    if (route.requiresAuth && !this.authCheck()) {
      if (this.onRedirect) {
        this.onRedirect("Access denied. Please log in to view this page.", "error");
      }
      window.location.hash = "#login";
      return;
    }

    // Update active nav-list items in UI sidebar/header
    this.updateActiveNav(hash);

    // 3. Smooth view transition
    if (this.container) {
      this.container.classList.add("fade-out");
      
      // Wait for the CSS opacity transition (150ms)
      await new Promise(resolve => setTimeout(resolve, 150));
      
      try {
        // Render content
        this.container.innerHTML = await route.render();
        
        // Execute view-specific scripts/events binding
        if (route.init) {
          route.init();
        }
      } catch (error) {
        console.error(`Error rendering route ${hash}:`, error);
        this.container.innerHTML = `
          <div class="glass-card" style="text-align: center; padding: 40px;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #ef4444; margin-bottom: 20px;"></i>
            <h2>Application Error</h2>
            <p style="color: hsl(var(--text-secondary)); margin-top: 10px;">Failed to load view. Please refresh or try again.</p>
          </div>
        `;
      }

      this.container.classList.remove("fade-out");
    }
  }

  updateActiveNav(activeHash) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      const link = item.querySelector("a");
      if (link && link.getAttribute("href") === activeHash) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}
