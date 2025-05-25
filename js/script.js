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
});
