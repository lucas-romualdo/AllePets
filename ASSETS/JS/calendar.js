const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let dataAtual = new Date(2024, 5); // Junho 2024

const diasContainer = document.getElementById("dias");
const mesAtualSpan = document.getElementById("mesAtual");

document.getElementById("anterior").addEventListener("click", () => mudarMes(-1));
document.getElementById("proximo").addEventListener("click", () => mudarMes(1));

function mudarMes(delta) {
  dataAtual.setMonth(dataAtual.getMonth() + delta);
  renderizarCalendario();
}

function renderizarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  mesAtualSpan.textContent = `${meses[mes]} ${ano}`;
  diasContainer.innerHTML = "";

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  // Dados simulados
  const diasDisponiveis = [12, 16, 17, 18, 19, 23, 24, 26, 27, 28];
  const diasParciais = [20, 21, 22];
  const hoje = new Date();

  // Espaços vazios antes do primeiro dia
  for (let i = 0; i < primeiroDia; i++) {
    const div = document.createElement("div");
    div.className = "vazio";
    diasContainer.appendChild(div);
  }

  // Dias do mês
  for (let dia = 1; dia <= totalDias; dia++) {
    const div = document.createElement("div");
    div.textContent = dia;
    div.className = "dia";

    const data = new Date(ano, mes, dia);

    // Lógica de status
    if (diasDisponiveis.includes(dia)) {
      div.classList.add("disponivel");
    } else if (diasParciais.includes(dia)) {
      div.classList.add("parte-dia");
    } else {
      div.classList.add("indisponivel");
    }

    // Marcar hoje
    if (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    ) {
      div.classList.add("selecionado");
    }

    diasContainer.appendChild(div);
  }
}

renderizarCalendario();
