document.addEventListener("DOMContentLoaded", () => {
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

      if (pw !== pw2) {
        alert("Wrong password!");
        return;
      }
        alert("You joined successfully !");
        modal.style.display = "none";
        form.reset();
    });
  }

  const loginModal = document.getElementById("login_form");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.querySelector(".close-login");
const loginForm = document.getElementById("loginForm");

if (openLogin && loginModal && closeLogin && loginForm) {
  openLogin.onclick = () => loginModal.style.display = "block";
  closeLogin.onclick = () => loginModal.style.display = "none";
  window.onclick = (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.success) {
        loginModal.style.display = "none";
        loginForm.reset();
      }
    })
    .catch(err => {
      console.error(err);
      alert("Login failed.");
    });
  });
}
});


