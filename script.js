<<<<<<< HEAD
let timer;
let fraseInterval;
let timeLeft;
let isRunning = false;
let isFocus = true;
let ciclos = 0;

// Frases locais como fallback
const frasesMotivacionais = [
  "A imaginação é mais importante que o conhecimento. — Albert Einstein",
  "O presente é deles; o futuro, pelo qual eu realmente trabalhei, é meu. — Nikola Tesla",
  "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. — Winston Churchill",
  "Seja a mudança que você deseja ver no mundo. — Mahatma Gandhi",
  "A persistência é o caminho do êxito. — Charles Chaplin",
  "Pense grande e não ouça quem diz que não dá. A vida é curta demais para pensar pequeno. — Donald Trump"
];

// Lista para pré-carregar frases traduzidas da API
let frasesAPI = [];
const NUM_FRASES_API = 5; // quantas frases carregar

// Traduz texto para português usando LibreTranslate
async function traduzirParaPT(texto) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texto,
        source: "en",
        target: "pt",
        format: "text"
      })
    });
    const data = await response.json();
    return data.translatedText;
  } catch (e) {
    return texto; // fallback para o texto original
  }
}

// Pré-carrega frases da API e traduz para PT
async function carregarFrasesAPI() {
  frasesAPI = [];
  for (let i = 0; i < NUM_FRASES_API; i++) {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (response.ok) {
        const data = await response.json();
        const traduzida = await traduzirParaPT(`${data.content} — ${data.author}`);
        frasesAPI.push(traduzida);
      }
    } catch (e) {
      // ignora erros, fallback será local
    }
  }
}

// Atualiza a frase com fade
function atualizarFrase() {
  const motivacaoEl = document.getElementById("motivacao");
  motivacaoEl.style.opacity = 0;

  setTimeout(() => {
    let frase = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];

    // Se tiver frases API carregadas, escolhe aleatoriamente
    if (frasesAPI.length > 0) {
      frase = frasesAPI[Math.floor(Math.random() * frasesAPI.length)];
    }

    motivacaoEl.textContent = frase;
    motivacaoEl.style.opacity = 1;
  }, 500); // duração do fade
}

// Atualiza display do cronômetro
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// Inicia cronômetro
function startTimer() {
  if (!isRunning) {
    const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
    const pausaMin = parseInt(document.getElementById("pausaMin").value) || 5;

    if (timeLeft === undefined) {
      timeLeft = focoMin * 60;
    }

    isRunning = true;

    timer = setInterval(() => {
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
        updateDisplay();
      }
    }, 1000);

    // Troca de frase automática a cada 25 segundos
    atualizarFrase(); // primeira frase ao iniciar
    fraseInterval = setInterval(atualizarFrase, 25000);
  }
}

// Pausa cronômetro
function pauseTimer() {
  clearInterval(timer);
  clearInterval(fraseInterval);
  isRunning = false;
}

// Reseta cronômetro
function resetTimer() {
  clearInterval(timer);
  clearInterval(fraseInterval);
  isRunning = false;
  isFocus = true;
  const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
  timeLeft = focoMin * 60;
  ciclos = 0;
  document.getElementById("status").textContent = "Sessão de foco";
  document.getElementById("status").style.color = "limegreen";
  document.getElementById("ciclos").textContent = "Ciclos concluídos: 0";
  updateDisplay();
  atualizarFrase();
}

// Alterna tema claro/escuro
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Inicial
(async () => {
  await carregarFrasesAPI(); // carrega frases antes de mostrar
  resetTimer();
})();
=======
let timer;
let fraseInterval;
let timeLeft;
let isRunning = false;
let isFocus = true;
let ciclos = 0;

// Frases locais como fallback
const frasesMotivacionais = [
  "A imaginação é mais importante que o conhecimento. — Albert Einstein",
  "O presente é deles; o futuro, pelo qual eu realmente trabalhei, é meu. — Nikola Tesla",
  "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. — Winston Churchill",
  "Seja a mudança que você deseja ver no mundo. — Mahatma Gandhi",
  "A persistência é o caminho do êxito. — Charles Chaplin",
  "Pense grande e não ouça quem diz que não dá. A vida é curta demais para pensar pequeno. — Donald Trump"
];

// Lista para pré-carregar frases traduzidas da API
let frasesAPI = [];
const NUM_FRASES_API = 5; // quantas frases carregar

// Traduz texto para português usando LibreTranslate
async function traduzirParaPT(texto) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texto,
        source: "en",
        target: "pt",
        format: "text"
      })
    });
    const data = await response.json();
    return data.translatedText;
  } catch (e) {
    return texto; // fallback para o texto original
  }
}

// Pré-carrega frases da API e traduz para PT
async function carregarFrasesAPI() {
  frasesAPI = [];
  for (let i = 0; i < NUM_FRASES_API; i++) {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (response.ok) {
        const data = await response.json();
        const traduzida = await traduzirParaPT(`${data.content} — ${data.author}`);
        frasesAPI.push(traduzida);
      }
    } catch (e) {
      // ignora erros, fallback será local
    }
  }
}

// Atualiza a frase com fade
function atualizarFrase() {
  const motivacaoEl = document.getElementById("motivacao");
  motivacaoEl.style.opacity = 0;

  setTimeout(() => {
    let frase = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];

    // Se tiver frases API carregadas, escolhe aleatoriamente
    if (frasesAPI.length > 0) {
      frase = frasesAPI[Math.floor(Math.random() * frasesAPI.length)];
    }

    motivacaoEl.textContent = frase;
    motivacaoEl.style.opacity = 1;
  }, 500); // duração do fade
}

// Atualiza display do cronômetro
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// Inicia cronômetro
function startTimer() {
  if (!isRunning) {
    const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
    const pausaMin = parseInt(document.getElementById("pausaMin").value) || 5;

    if (timeLeft === undefined) {
      timeLeft = focoMin * 60;
    }

    isRunning = true;

    timer = setInterval(() => {
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
        updateDisplay();
      }
    }, 1000);

    // Troca de frase automática a cada 25 segundos
    atualizarFrase(); // primeira frase ao iniciar
    fraseInterval = setInterval(atualizarFrase, 25000);
  }
}

// Pausa cronômetro
function pauseTimer() {
  clearInterval(timer);
  clearInterval(fraseInterval);
  isRunning = false;
}

// Reseta cronômetro
function resetTimer() {
  clearInterval(timer);
  clearInterval(fraseInterval);
  isRunning = false;
  isFocus = true;
  const focoMin = parseInt(document.getElementById("focoMin").value) || 25;
  timeLeft = focoMin * 60;
  ciclos = 0;
  document.getElementById("status").textContent = "Sessão de foco";
  document.getElementById("status").style.color = "limegreen";
  document.getElementById("ciclos").textContent = "Ciclos concluídos: 0";
  updateDisplay();
  atualizarFrase();
}

// Alterna tema claro/escuro
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

// Inicial
(async () => {
  await carregarFrasesAPI(); // carrega frases antes de mostrar
  resetTimer();
})();
>>>>>>> a951b71 (update archives)
