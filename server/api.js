// api.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Endpoint da API de frases traduzidas
app.get("/api/frase", async (req, res) => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    // Traduzir usando Google Translate API (ou outro serviço)
    // Exemplo fictício, deve configurar uma API real de tradução
    const translatedContent = await traduzirParaPortugues(data.content);

    res.json({
      content: translatedContent,
      author: data.author
    });
  } catch (e) {
    res.status(500).json({ content: "Falha ao obter frase", author: "" });
  }
});

// Função fictícia para tradução
async function traduzirParaPortugues(text) {
  // Aqui você pode usar Google Translate, DeepL ou outro serviço
  // Por enquanto retorna o texto original
  return text;
}

app.use(express.static("../")); // serve os arquivos front-end
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
