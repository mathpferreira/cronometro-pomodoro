// frases.js
const frasesLocais = [
    "A imaginação é mais importante que o conhecimento. — Albert Einstein",
    "O presente é deles; o futuro, pelo qual eu realmente trabalhei, é meu. — Nikola Tesla",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. — Winston Churchill",
    "Seja a mudança que você deseja ver no mundo. — Mahatma Gandhi",
    "A persistência é o caminho do êxito. — Charles Chaplin",
    "Pense grande e não ouça quem diz que não dá. A vida é curta demais para pensar pequeno. — Donald Trump"
  ];
  
  let fraseInterval;
  
  // Atualiza a frase com fade e API
  async function atualizarFrase() {
    const motivacaoEl = document.getElementById("motivacao");
    motivacaoEl.style.opacity = 0;
  
    let frase = frasesLocais[Math.floor(Math.random() * frasesLocais.length)];
  
    try {
      const response = await fetch("/api/frase");
      if (response.ok) {
        const data = await response.json();
        frase = `${data.content} — ${data.author}`;
      }
    } catch (e) {
      // fallback: usa frasesLocais
    }
  
    setTimeout(() => {
      motivacaoEl.textContent = frase;
      motivacaoEl.style.opacity = 1;
    }, 500);
  }
  
  // Inicia atualização automática a cada 25s
  function iniciarFrasesAutomatico() {
    fraseInterval = setInterval(atualizarFrase, 25000);
  }
  
  function pararFrasesAutomatico() {
    clearInterval(fraseInterval);
  }
  