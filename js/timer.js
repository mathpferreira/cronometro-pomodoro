let timer;
let timeLeft;
let isRunning = false;
let isFocus = true;
let ciclos = 0;

// Atualiza display do cronômetro
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// Inicia cronômetro
function startTimer() {
  const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
  const pausaMin = parseInt(document.getElementById("pausaMin").value) || 5;

  if (!isRunning) {
    if (timeLeft === undefined) timeLeft = focoMin * 60;

    isRunning = true;
    atualizarFrase();
    iniciarFrasesAutomatico();
    updateDisplay();

    timer = setInterval(() => tick(focoMin, pausaMin), 1000);
  }
}

// Pausa cronômetro
function pauseTimer() {
  clearInterval(timer);
  pararFrasesAutomatico();
  isRunning = false;
}

// Reseta cronômetro de verdade (zera e atualiza display)
function resetTimer() {
  clearInterval(timer);       // para qualquer contagem antiga
  pararFrasesAutomatico();
  isRunning = false;
  isFocus = true;
  ciclos = 0;

  const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
  timeLeft = focoMin * 60;   // volta para o valor do input
  document.getElementById("status").textContent = "Sessão de foco";
  document.getElementById("status").style.color = "limegreen";
  document.getElementById("ciclos").textContent = "Ciclos concluídos: 0";

  updateDisplay();           // 🔥 atualiza display imediatamente
  atualizarFrase();
}

// Função que roda a cada segundo
function tick(focoMin, pausaMin) {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timer);
    isRunning = false;
    new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg").play();

    if (isFocus) {
      ciclos++;
      document.getElementById("ciclos").textContent = `Ciclos concluídos: ${ciclos}`;
      timeLeft = pausaMin * 60;
      document.getElementById("status").textContent = "Hora da pausa";
      document.getElementById("status").style.color = "gold";
    } else {
      timeLeft = focoMin * 60;
      document.getElementById("status").textContent = "Sessão de foco";
      document.getElementById("status").style.color = "limegreen";
    }

    isFocus = !isFocus;
    atualizarFrase();
    updateDisplay();

    startTimer(); // reinicia próxima sessão automaticamente
  }
}

// Atualiza display ao mudar os inputs
document.getElementById("focoMin").addEventListener("input", () => {
  if (!isRunning && isFocus) {
    const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
    timeLeft = focoMin * 60;
    updateDisplay();
  }
});

document.getElementById("pausaMin").addEventListener("input", () => {
  if (!isRunning && !isFocus) {
    const pausaMin = parseInt(document.getElementById("pausaMin").value) || 5;
    timeLeft = pausaMin * 60;
    updateDisplay();
  }
});
