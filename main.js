/* Criar uma variavel para receber o form */
const form = document.getElementById("form-atividade"); 

/* Adicionar os emojis de celebração e decepção */
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Decepcionado" />';

/* Array para adicionar todas as atividades e todas as notas informadas pelo usuario */
const atividades = [];
const notas = [];

/* Criar o elemento de span para aprovação ou reprovação */
const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`;
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`;

/* Parametrizar a nota mínima */
const notaMinima = Number(prompt("Digite a nota mínima:"));


/* Manter o conteúdo e que seja acrescentado uma nova linha */
let linhas = "";

form.addEventListener("submit", function(e) { /* Criar o evento de submit (chamar)*/

    // Impede o comportamento padrão de envio do formulário
    e.preventDefault();

    adicionaLinha(); /* Chamar a function adicionaLinha */

    atualizaTabela(); /* Chamar a function atualizaTabela */

    atualizaMediaFinal(); /* Chamar a function atualizaMediaFinal */
});

function adicionaLinha() {
    /* Capturar os campos (nome da atividade e a nota) */
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    /* Não permitir entradas repetidas em atividades */
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {

    /* Fazer um push para adicionar o conteúdo */
    atividades.push(inputNomeAtividade.value);
    notas.push(Number(inputNotaAtividade.value));

    /* Adicionar se o aluno foi aprovado ou não */
    let linha = "<tr>";

    /* linha = linha + "Outro conteúdo"; */ /* Forma alterntaiva de fazer o mesmo que o código abaixo */
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; /* if se positivo = (?) - else senão = (:) */
    linha += "</tr>";

    /* Concatenar com a variavel linhas */
    linhas += linha;
    }

    /* Limpar o campo depois de adicionar o conteúdo */
    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";

    // Testar com um alert 
    // alert(`Atividade: ${inputNomeAtividade.value} - Nota: ${inputNotaAtividade.value}`);
}

function atualizaTabela() {
    /* Recuperar o corpo da tabela (Colocar o conteúdo dentro do corpo da tebela) */
    const corpoTabela = document.querySelector("tbody");

    /* Inserir o conteúdo dentro de uma tag */
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    /* Recuperar o elemento */
    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2);
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i];
    }

    /* Calcular média */
    return somaNotas / notas.length;
}