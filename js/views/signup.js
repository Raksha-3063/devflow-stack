import { db } from "../db.js";

export const SignupView = {
  async render() {
    return `
      <div style="display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 150px); padding: 20px;">
        <div class="glass-card" style="width: 100%; max-width: 450px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div class="logo" style="justify-content: center; font-size: 2rem; margin-bottom: 10px;">
              <i class="fa-solid fa-bolt"></i> DevFlow
            </div>
            <p style="color: hsl(var(--text-secondary)); font-size: 0.95rem;">Join the developer community today</p>
          </div>
          
          <form id="signup-form">
            <div class="form-group">
              <label class="form-label" for="username">Username</label>
              <input class="form-input" type="text" id="username" placeholder="e.g. dev_jane" required autocomplete="username">
              <div class="form-error" id="username-error"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="email">Email Address</label>
              <input class="form-input" type="email" id="email" placeholder="jane@example.com" required autocomplete="email">
              <div class="form-error" id="email-error"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input class="form-input" type="password" id="password" placeholder="At least 6 characters" required autocomplete="new-password">
              <div class="form-error" id="password-error"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="confirm-password">Confirm Password</label>
              <input class="form-input" type="password" id="confirm-password" placeholder="Repeat your password" required autocomplete="new-password">
              <div class="form-error" id="confirm-password-error"></div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-full" style="margin-top: 10px;">
              Create Account <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          
          <div style="text-align: center; margin-top: 24px; font-size: 0.9rem; color: hsl(var(--text-secondary));">
            Already have an account? <a href="#login" style="color: hsl(var(--accent-primary)); font-weight: 500;">Log In</a>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset errors
      document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      let hasErrors = false;

      if (username.length < 3) {
        document.getElementById("username-error").textContent = "Username must be at least 3 characters.";
        hasErrors = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        hasErrors = true;
      }

      if (password.length < 6) {
        document.getElementById("password-error").textContent = "Password must be at least 6 characters.";
        hasErrors = true;
      }

      if (password !== confirmPassword) {
        document.getElementById("confirm-password-error").textContent = "Passwords do not match.";
        hasErrors = true;
      }

      if (hasErrors) return;

      // Check if user already exists
      const existingUser = db.findOne("users", u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        document.getElementById("email-error").textContent = "Email is already registered.";
        return;
      }

      // Check if username already exists
      const existingUsername = db.findOne("users", u => u.name.toLowerCase() === username.toLowerCase());
      if (existingUsername) {
        document.getElementById("username-error").textContent = "Username is already taken.";
        return;
      }

      // Insert new user
      try {
        db.insert("users", {
          name: username,
          email: email,
          password: password,
          reputation: 1,
          questionsCount: 0,
          answersCount: 0
        });

        if (window.showToast) {
          window.showToast("Account created successfully! Please log in.", "success");
        }
        
        window.location.hash = "#login";
      } catch (err) {
        console.error("Signup error:", err);
        if (window.showToast) {
          window.showToast("Failed to create account. Please try again.", "error");
        }
      }
    });
  }
};
