// Alterna tema e salva no localStorage
function toggleTheme() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
    }
}

// Inicializa tema salvo ou define padrão como dark
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
