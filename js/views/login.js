import { db } from "../db.js";

export const LoginView = {
  async render() {
    return `
      <div style="display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 150px); padding: 20px;">
        <div class="glass-card" style="width: 100%; max-width: 450px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div class="logo" style="justify-content: center; font-size: 2rem; margin-bottom: 10px;">
              <i class="fa-solid fa-bolt"></i> DevFlow
            </div>
            <p style="color: hsl(var(--text-secondary)); font-size: 0.95rem;">Log in to your developer profile</p>
          </div>
          
          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="email">Email Address</label>
              <input class="form-input" type="email" id="email" placeholder="expert@devflow.com" required autocomplete="email">
              <div class="form-error" id="email-error"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input class="form-input" type="password" id="password" placeholder="admin123" required autocomplete="current-password">
              <div class="form-error" id="password-error"></div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-full" style="margin-top: 10px;">
              Sign In <i class="fa-solid fa-right-to-bracket"></i>
            </button>
          </form>
          
          <div style="text-align: center; margin-top: 24px; font-size: 0.9rem; color: hsl(var(--text-secondary));">
            New to DevFlow? <a href="#signup" style="color: hsl(var(--accent-primary)); font-weight: 500;">Create an Account</a>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset errors
      document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      let hasErrors = false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        hasErrors = true;
      }

      if (!password) {
        document.getElementById("password-error").textContent = "Password is required.";
        hasErrors = true;
      }

      if (hasErrors) return;

      // Find user
      const user = db.findOne("users", u => u.email.toLowerCase() === email.toLowerCase());

      if (!user || user.password !== password) {
        if (window.showToast) {
          window.showToast("Invalid email or password.", "error");
        }
        document.getElementById("email-error").textContent = "Invalid email or password.";
        return;
      }

      // Set current user session
      try {
        db.setCurrentUser(user);

        if (window.showToast) {
          window.showToast(`Welcome back, ${user.name}!`, "success");
        }
        
        // Dispatch custom login event so the shell can update dynamically
        window.dispatchEvent(new CustomEvent("auth-state-changed"));

        window.location.hash = "#dashboard";
      } catch (err) {
        console.error("Login error:", err);
        if (window.showToast) {
          window.showToast("Failed to sign in. Please try again.", "error");
        }
      }
    });
  }
};
