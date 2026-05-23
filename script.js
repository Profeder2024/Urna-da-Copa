const candidatos = {

  10: {
    nome: "Neymar da Silva Santos Júnior",
    time: "Santos",
    posicao: "Atacante",
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBByT4QJa8IALr1AXOsxnrF3iZ5cWiu5yJWA&s"
  },

  20: {
    nome: "Vinícius Júnior",
    time: "Real Madrid",
    posicao: "Ponta-Esquerda",
    foto: "https://upload.wikimedia.org/wikipedia/commons/c/c6/2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg"
  },
  22: {
    nome: "Alisson Becker",
    time: "Liverpool",
    posicao: "Goleiro",
    foto: "https://images.ps-aws.com/c?url=https%3A%2F%2Fimages.teamtalk.com%2Fcontent%2Fuploads%2F2025%2F12%2F10152254%2FAlisson-Becker-Liverpool.jpg"
  },

  39: {
    nome: "Bruno Guimarães",
    time: "Newcastle",
    posicao: "Meio-Campista",
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bruno_Guimar%C3%A3es.png"
  }

};

let numeroDigitado = "";

const contagemVotos = {
  10: 0,
  20: 0,
  22: 0,
  39: 0,
  BRANCO: 0,
  NULO: 0
};
function tocarSom(tipo) {

  if (tipo === "somConfirma") {

    const audio = document.getElementById("somConfirma");

    audio.currentTime = 0;

    audio.play();
  }
}

function clicou(n) {

  if (numeroDigitado.length < 2) {

    numeroDigitado += n;

    atualizarTela();

    tocarSom("somTecla");
  }
}

function atualizarTela() {

  document.getElementById("n1").innerText =
    numeroDigitado[0] || "";

  document.getElementById("n2").innerText =
    numeroDigitado[1] || "";

  const candidato = candidatos[numeroDigitado];

  if (candidato) {

    document.getElementById("nome").innerText =
      candidato.nome;

    document.getElementById("time").innerText =
      candidato.time;

    document.getElementById("posicao").innerText =
      candidato.posicao;

    const foto =
      document.getElementById("foto");

    foto.src = candidato.foto;

    foto.style.display = "block";

    document.getElementById("mensagem").innerText = "";

  } else {

    document.getElementById("nome").innerText = "";

    document.getElementById("time").innerText = "";

    document.getElementById("posicao").innerText = "";

    document.getElementById("foto").style.display = "none";

    if (numeroDigitado.length === 2) {

      document.getElementById("mensagem").innerText =
        "VOTO NULO";
    }
  }
}

function branco() {

  numeroDigitado = "";

  document.getElementById("n1").innerText = "";

  document.getElementById("n2").innerText = "";

  document.getElementById("nome").innerText =
    "VOTO EM BRANCO";

  document.getElementById("time").innerText = "";

  document.getElementById("posicao").innerText = "";

  document.getElementById("foto").style.display = "none";

  document.getElementById("mensagem").innerText = "";

  tocarSom("somTecla");
}

function corrige() {

  numeroDigitado = "";

  document.getElementById("n1").innerText = "";

  document.getElementById("n2").innerText = "";

  document.getElementById("nome").innerText = "";

  document.getElementById("time").innerText = "";

  document.getElementById("posicao").innerText = "";

  document.getElementById("mensagem").innerText = "";

  document.getElementById("foto").style.display = "none";

  tocarSom("somTecla");
}

function confirma() {

  if (numeroDigitado.length === 1) {

    alert("Digite os 2 números");

    return;
  }

  tocarSom("somConfirma");

  if (numeroDigitado === "") {

    contagemVotos.BRANCO++;

  } else if (candidatos[numeroDigitado]) {

    contagemVotos[numeroDigitado]++;

  } else {

    contagemVotos.NULO++;
  }

  document.getElementById("conteudo").innerHTML = `

    <div class="fim">
      FIM
    </div>

  `;

  setTimeout(() => {

    restaurarTela();

  }, 2500);
}

function restaurarTela() {

  numeroDigitado = "";

  document.getElementById("conteudo").innerHTML = `

    <div class="esquerda">

      <div class="cargo">
        JOGADOR
      </div>

      <div class="numeros">

        <div class="numero" id="n1"></div>

        <div class="numero" id="n2"></div>

      </div>

      <div class="info">

        <p>
          <strong>Nome:</strong>
          <span id="nome"></span>
        </p>

        <p>
          <strong>Time:</strong>
          <span id="time"></span>
        </p>

        <p>
          <strong>Posição:</strong>
          <span id="posicao"></span>
        </p>

      </div>

      <div class="mensagem" id="mensagem"></div>

    </div>

    <div class="direita">

      <img
        id="foto"
        src=""
        alt="Foto do jogador"
      >

    </div>

  `;
}

function gerarProtocolo() {

  return Math.floor(
    Math.random() * 999999999
  );
}

function abrirRelatorio(texto) {

  const janela = window.open(
    "",
    "",
    "width=500,height=700"
  );

  janela.document.write(`

    <html>

      <head>

        <title>
          Relatório da Urna
        </title>

        <style>

          body {

            font-family: monospace;

            padding: 20px;

            background: #fff;
          }

          button {

            padding: 10px 20px;

            margin-top: 20px;

            cursor: pointer;

            font-size: 16px;
          }

          pre {

            font-size: 15px;
          }

        </style>

      </head>

      <body>

        <pre>${texto}</pre>

        <button onclick="window.print()">
          IMPRIMIR
        </button>

      </body>

    </html>

  `);
}

function gerarZeresima() {

  let texto = `

====================================

         ZERÉSIMA DA URNA

====================================

SIMULADOR EDUCACIONAL

Data: ${new Date().toLocaleDateString()}
Hora: ${new Date().toLocaleTimeString()}

PROTOCOLO: ${gerarProtocolo()}

====================================

Neymar (10): 0 votos
Vinícius Jr (20): 0 votos
Alisson Becker (22): 0 votos
Bruno Guimarães (39): 0 votos

Brancos: 0
Nulos: 0

====================================

URNA ZERADA COM SUCESSO

====================================

`;

  abrirRelatorio(texto);
}

function gerarBoletim() {

  let total =

    contagemVotos[10] +
    contagemVotos[20] +
    contagemVotos[22] +
    contagemVotos[39] +
    contagemVotos.BRANCO +
    contagemVotos.NULO;

  let texto = `

====================================

         BOLETIM DE URNA

====================================

SIMULADOR EDUCACIONAL

Data: ${new Date().toLocaleDateString()}
Hora: ${new Date().toLocaleTimeString()}

PROTOCOLO: ${gerarProtocolo()}

====================================

Neymar (10):
${contagemVotos[10]} votos

Vinícius Jr (20):
${contagemVotos[20]} votos

Alisson Becker (22):
${contagemVotos[22]} votos

Bruno Guimarães (39):
${contagemVotos[39]} votos

Brancos:
${contagemVotos.BRANCO}

Nulos:
${contagemVotos.NULO}

====================================

TOTAL DE VOTOS:
${total}

====================================

`;

  abrirRelatorio(texto);
}

window.addEventListener("keydown", (e) => {

  if (!isNaN(e.key)) {

    clicou(Number(e.key));
  }

  if (e.key === "Enter") {

    confirma();
  }

  if (e.key === "Backspace") {

    corrige();
  }
});