const perguntas = [
    {
        pergunta: "Qual é o maior planeta do Sistema Solar? 🪐",
        alternativas: [
            { texto: "Terra", correta: false },
            { texto: "Júpiter", correta: true },
            { texto: "Saturno", correta: false },
            { texto: "Netuno", correta: false }
        ],
        explicacao: "Júpiter é o maior planeta do Sistema Solar!"
    },
    {
        pergunta: "Quantos lados tem um hexágono? 💅",
        alternativas: [
            { texto: "Cinco", correta: false },
            { texto: "Sete", correta: false },
            { texto: "Seis", correta: true },
            { texto: "Oito", correta: false }
        ],
        explicacao: "O hexágono tem seis lados. Geometria também é chique!"
    },
    {
        pergunta: "Qual é a capital da França? 🥐",
        alternativas: [
            { texto: "Roma", correta: false },
            { texto: "Madri", correta: false },
            { texto: "Lisboa", correta: false },
            { texto: "Paris", correta: true }
        ],
        explicacao: "Paris é a capital francesa, mon amour!"
    },
    {
        pergunta: "Qual destes animais é um mamífero? 🐾",
        alternativas: [
            { texto: "Golfinho", correta: true },
            { texto: "Tubarão", correta: false },
            { texto: "Polvo", correta: false },
            { texto: "Tartaruga", correta: false }
        ],
        explicacao: "O golfinho é um mamífero: respira ar e amamenta seus filhotes."
    },
    {
        pergunta: "Quanto é 12 × 8? 🧠",
        alternativas: [
            { texto: "88", correta: false },
            { texto: "96", correta: true },
            { texto: "92", correta: false },
            { texto: "108", correta: false }
        ],
        explicacao: "12 vezes 8 é igual a 96. A diva também arrasa na matemática!"
    },
    {
        pergunta: "Qual é o símbolo químico da água? 💧",
        alternativas: [
            { texto: "CO₂", correta: false },
            { texto: "O₂", correta: false },
            { texto: "H₂O", correta: true },
            { texto: "NaCl", correta: false }
        ],
        explicacao: "H₂O representa a água: dois átomos de hidrogênio e um de oxigênio."
    },
    {
        pergunta: "Qual linguagem é usada para estilizar páginas web? 🎨",
        alternativas: [
            { texto: "HTML", correta: false },
            { texto: "CSS", correta: true },
            { texto: "SQL", correta: false },
            { texto: "Python", correta: false }
        ],
        explicacao: "CSS cuida da aparência das páginas: cores, fontes, layouts e muito mais!"
    }
];

// ELEMENTOS DO HTML
const telaQuiz = document.getElementById("telaQuiz");
const telaResultado = document.getElementById("telaResultado");

const numeroPergunta = document.getElementById("numeroPergunta");
const pontuacaoElemento = document.getElementById("pontuacao");
const barraProgresso = document.getElementById("barraProgresso");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const feedbackElemento = document.getElementById("feedback");

const btnProxima = document.getElementById("btnProxima");
const btnReiniciar = document.getElementById("btnReiniciar");

// VARIÁVEIS DO JOGO
let indiceAtual = 0;
let pontuacao = 0;
let respondida = false;

// EXIBE A PERGUNTA ATUAL
function mostrarPergunta() {
    respondida = false;

    const perguntaAtual = perguntas[indiceAtual];

    perguntaElemento.textContent = perguntaAtual.pergunta;

    numeroPergunta.textContent =
        `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    pontuacaoElemento.textContent = `💗 ${pontuacao} pontos`;

    // Atualiza a barra de progresso
    const progresso = (indiceAtual / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;

    // Limpa as alternativas e o feedback anterior
    alternativasElemento.innerHTML = "";
    feedbackElemento.textContent = "";
    feedbackElemento.className = "feedback";

    btnProxima.hidden = true;

    // Cria os botões das alternativas
    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.classList.add("alternativa");

        const letra = document.createElement("span");
        letra.classList.add("letra");
        letra.textContent = String.fromCharCode(65 + indice);

        const texto = document.createElement("span");
        texto.classList.add("texto-alternativa");
        texto.textContent = alternativa.texto;

        botao.appendChild(letra);
        botao.appendChild(texto);

        // Evento de clique na alternativa
        botao.addEventListener("click", () => {
            verificarResposta(alternativa, botao);
        });

        alternativasElemento.appendChild(botao);
    });
}

// VERIFICA SE A RESPOSTA ESTÁ CORRETA
function verificarResposta(alternativaEscolhida, botaoEscolhido) {
    // Impede pontuar duas vezes na mesma pergunta
    if (respondida) return;

    respondida = true;

    const perguntaAtual = perguntas[indiceAtual];
    const botoes = alternativasElemento.querySelectorAll(".alternativa");

    // Bloqueia todos os botões após a resposta
    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (alternativaEscolhida.correta) {
        pontuacao++;

        botaoEscolhido.classList.add("correta");

        feedbackElemento.textContent =
            `✨ ACERTOU, MUSA! ${perguntaAtual.explicacao}`;

        feedbackElemento.classList.add("acerto");
    } else {
        botaoEscolhido.classList.add("errada");

        // Destaca também a alternativa correta
        const indiceCorreto = perguntaAtual.alternativas.findIndex(
            alternativa => alternativa.correta
        );

        botoes[indiceCorreto].classList.add("correta");

        feedbackElemento.textContent =
            `Quase, diva! 💗 ${perguntaAtual.explicacao}`;

        feedbackElemento.classList.add("erro");
    }

    pontuacaoElemento.textContent = `💗 ${pontuacao} pontos`;

    // Mostra o progresso após responder
    const progresso = ((indiceAtual + 1) / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;

    // Muda o texto do botão na última pergunta
    btnProxima.textContent =
        indiceAtual === perguntas.length - 1
            ? "Ver meu resultado 👑"
            : "Próxima pergunta 💕";

    btnProxima.hidden = false;
}

// AVANÇA PARA A PRÓXIMA PERGUNTA
function proximaPergunta() {
    if (!respondida) return;

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

// PERSONALIZA A TELA FINAL
function mostrarResultado() {
    telaQuiz.hidden = true;
    telaResultado.hidden = false;

    const total = perguntas.length;
    const percentual = (pontuacao / total) * 100;

    let titulo;
    let mensagem;
    let icone;
    let frase;

    if (percentual === 100) {
        icone = "👑";
        titulo = "A PRÓPRIA LENDA!";
        mensagem =
            "Você gabaritou, diva! Seu cérebro tá brilhando mais que diamante.";
        frase = "Perfeição não é pouca coisa, né, meu amor? 💎";
    } else if (percentual >= 70) {
        icone = "💖";
        titulo = "DIVA INTELIGENTÍSSIMA!";
        mensagem =
            "Você mandou muito bem! Conhecimento e beleza andando juntinhos.";
        frase = "O pink combina com você e o sucesso também! ✨";
    } else if (percentual >= 40) {
        icone = "🌷";
        titulo = "TÁ FLORESCENDO, GATA!";
        mensagem =
            "Você já arrasou em várias! Continue praticando e sua evolução vai ser linda.";
        frase = "Cada tentativa é um novo brilho no seu gloss. 💋";
    } else {
        icone = "🩷";
        titulo = "CALMA, PRINCESA!";
        mensagem =
            "Toda diva começa de algum lugar. Você pode jogar novamente e aprender com cada pergunta!";
        frase = "O importante é não perder o brilho, bebê! 🎀";
    }

    document.getElementById("iconeResultado").textContent = icone;
    document.getElementById("tituloResultado").textContent = titulo;
    document.getElementById("mensagemResultado").textContent = mensagem;
    document.getElementById("acertosFinais").textContent =
        `${pontuacao}/${total}`;
    document.getElementById("fraseFinal").textContent = frase;

    // Garante que a barra termine em 100%
    barraProgresso.style.width = "100%";
}

// REINICIA O QUIZ
function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    respondida = false;

    telaResultado.hidden = true;
    telaQuiz.hidden = false;

    mostrarPergunta();
}
