// Alterna entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  }
  
  // Adiciona listener no botão de tema
  document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", toggleTheme);
    }
  
    // Define tema padrão como escuro
    if (!document.body.classList.contains("dark") && !document.body.classList.contains("light")) {
      document.body.classList.add("dark");
    }
  });
  