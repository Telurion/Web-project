document.addEventListener("DOMContentLoaded", () => {
  // Function to update UI based on login state
  function updateUserUI() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const openModalBtn = document.getElementById("openModal");
    const openLoginBtn = document.getElementById("openLogin");
    const existingGreeting = document.querySelector(".user-greeting");

    // Remove existing greeting if it exists
    if (existingGreeting) {
      existingGreeting.remove();
    }

    if (currentUser) {
      // Remove buttons if they exist
      if (openModalBtn) openModalBtn.style.display = "none";
      if (openLoginBtn) openLoginBtn.style.display = "none";

      // Create and add welcome message
      const userGreeting = document.createElement("span");
      userGreeting.className = "user-greeting";
      userGreeting.textContent = `Welcome back, ${currentUser.name}`;

      // Insert welcome message in the header
      const header = document.querySelector("header");
      if (header) {
        const cartDiv = document.querySelector(".cart");
        if (cartDiv) {
          header.insertBefore(userGreeting, cartDiv.nextSibling);
        } else {
          header.appendChild(userGreeting);
        }
      }
    } else {
      // Ensure buttons are visible if not logged in
      if (openModalBtn) openModalBtn.style.display = "block";
      if (openLoginBtn) openLoginBtn.style.display = "block";
    }
    const event = new Event("userStateChange");
    document.dispatchEvent(event);
  }

  // Check login state immediately when page loads
  updateUserUI();

  // Sign Up Modal
  const modal = document.getElementById("signupModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("signupForm");

  if (openBtn && modal && closeBtn && form) {
    openBtn.onclick = () => {
      modal.style.display = "block";
    };

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (submit) => {
      if (submit.target === modal) {
        modal.style.display = "none";
      }
    };

    form.addEventListener("submit", (submit) => {
      submit.preventDefault();

      const pw = document.getElementById("password").value;
      const pw2 = document.getElementById("repeat-password").value;
      const name = document.getElementById("name").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;

      if (pw !== pw2) {
        alert("Passwords don't match!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[email]) {
        alert("Email already registered!");
        return;
      }

      users[email] = {
        name: name,
        age: age,
        password: pw,
        cart: [],
      };

      localStorage.setItem("users", JSON.stringify(users));

      // Automatically log the user in after sign up
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: email,
          name: name,
        })
      );

      alert("Registration successful! You are now logged in.");
      modal.style.display = "none";
      form.reset();

      // Update UI to show welcome message
      updateUserUI();
    });
  }

  // Login Modal
  const loginModal = document.getElementById("login_form");
  const openLogin = document.getElementById("openLogin");
  const closeLogin = document.querySelector(".close-login");
  const loginForm = document.getElementById("loginForm");

  if (openLogin && loginModal && closeLogin && loginForm) {
    openLogin.onclick = () => (loginModal.style.display = "block");
    closeLogin.onclick = () => (loginModal.style.display = "none");
    window.onclick = (e) => {
      if (e.target === loginModal) loginModal.style.display = "none";
    };

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      const user = users[email];

      if (user && user.password === password) {
        alert(`Welcome back, ${user.name}!`);
        loginModal.style.display = "none";
        loginForm.reset();

        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: email,
            name: user.name,
          })
        );

        updateUserUI();
      } else {
        alert("Invalid email or password");
      }
    });
  }
});
