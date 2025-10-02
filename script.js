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

/*const menuToggle = document.getElementById('menuToggle');
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const closeMenu = document.getElementById('closeMenu');

  menuToggle.addEventListener('click', () => {
    offcanvasMenu.classList.add('active');
  });

  closeMenu.addEventListener('click', () => {
    offcanvasMenu.classList.remove('active');
  });

  // Optional: close menu when clicking a link
  document.querySelectorAll('.offcanvas-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      offcanvasMenu.classList.remove('active');
    });
  });*/



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

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch("https://subtle-pixie-92477c.netlify.app/.netlify/functions/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again later.");
    }
  });
} else {
  console.warn("⚠️ contactForm not found on this page.");
}
