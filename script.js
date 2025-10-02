/*document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (!toggleBtn) return; // Safety check

  // Check saved preference
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      toggleBtn.textContent = "🌙 Dark Mode";
    }
  });
});*/
const menuIcon = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("menu-close");

function openMenu() {
    mobileNav.classList.remove("d-none");
    overlay.classList.remove("d-none");
}

function closeMenu() {
    mobileNav.classList.add("d-none");
    overlay.classList.add("d-none");
}

function handleMenu() {
    menuIcon.addEventListener("click", openMenu);

    overlay.addEventListener("click", closeMenu);

    // Optional: close icon inside nav
    if (closeIcon) {
        closeIcon.addEventListener("click", closeMenu);
    }

    // Close menu when any nav link is clicked
    document.querySelectorAll("#mobile-nav a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

handleMenu();

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // stop the # from showing in URL
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.remove("d-none");
    scrollBtn.src = "Images/icons8-up-48.png"; // change to UP arrow
  } else {
    scrollBtn.classList.remove("d-none");
    scrollBtn.src = "Images/icons8-down-48.png"; // change to DOWN arrow
  }
});

scrollBtn.addEventListener("click", () => {
  if (window.scrollY > 200) {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); // scroll down
  }
});

document.querySelectorAll(".progress-demo").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> In Progress…';
      btn.classList.add("disabled");

      // reset after 3s
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-box-arrow-up-right me-1"></i> Live Demo';
        btn.classList.remove("disabled");
      }, 3000);
    });
  });

  //fetch for the form
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch("https://glittery-phoenix-cc4f73.netlify.app/.netlify/functions/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      // Set message text & style
      formMessage.textContent = data.message || data.error;
      formMessage.className = "form-message show " + (data.status === "success" ? "success" : "error");

      if (data.status === "success") form.reset();

      // Hide message after 4 seconds
      setTimeout(() => {
        formMessage.classList.remove("show");
      }, 4000);

    } catch (err) {
      console.error(err);
      formMessage.textContent = "❌ Something went wrong. Please try again later.";
      formMessage.className = "form-message show error";

      setTimeout(() => {
        formMessage.classList.remove("show");
      }, 4000);
    }
  });
}
