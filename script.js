document.addEventListener("DOMContentLoaded", () => {
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
});
