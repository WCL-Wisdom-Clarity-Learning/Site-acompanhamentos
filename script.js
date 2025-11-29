/* ============================================================
   🔵 1. EDITAR OS DADOS AQUI — (COLAR NOVOS DADOS SEM MEXER NO RESTO)
   ============================================================ */
const lojasLabels = ["BR", "CN", "SP", "VP", "ST", "MS", "CF", "PF"];
const lojasValues = [68.45, 66.83, 66.00, 60.08, 50.00, 49.27, 46.62, 36.22];

const vdLabels = ["ERS", "ERP", "CD"];
const vdValues = [97.61, 96.43, 94.57];
/* ============================================================ */



/* ============================================================
   🔵 2. CONFIGURAÇÃO VISUAL DO GRÁFICO
   ============================================================ */
const barThickness = 22;
const barGap = 0.35;
const fontSize = 18;

const color1 = "#d4af37"; // ouro
const color2 = "#c0c0c0"; // prata
const color3 = "#cd7f32"; // bronze
const colorDefault = "#008b8b"; // padrão



/* ============================================================
   🔵 3. CRIA TRACE COM CORES DINÂMICAS POR POSIÇÃO
   ============================================================ */
function criarTrace(valores, labels) {

    // Ordena automaticamente
    const combinado = valores
        .map((v, i) => ({ valor: v, label: labels[i] }))
        .sort((a, b) => b.valor - a.valor);

    const valoresOrd = combinado.map(o => o.valor);
    const labelsOrd = combinado.map(o => o.label);

    // Cores por ranking
    const cores = valoresOrd.map((_, i) => {
        if (i === 0) return color1;
        if (i === 1) return color2;
        if (i === 2) return color3;
        return colorDefault;
    });

    return {
        x: valoresOrd,
        y: labelsOrd.map((l, i) => `🏆 ${i + 1}   ${l}`),
        type: "bar",
        orientation: "h",
        text: valoresOrd.map(v => v.toFixed(2) + "%"),
        textposition: "outside",
        marker: { color: cores, line: { width: 1 } },
        textfont: { size: fontSize },
        hoverinfo: "none",
        width: barThickness
    };
}



/* ============================================================
   🔵 4. LAYOUT — FUNDO TRANSPARENTE
   ============================================================ */
const layout = {
    title: "",
    xaxis: { showgrid: false, zeroline: false, tickfont: { size: 16 } },
    yaxis: { autorange: "reversed", tickfont: { size: 18 } },
    margin: { l: 140, r: 80, t: 40, b: 40 },
    bargap: barGap,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)"
};



/* ============================================================
   🔵 5. FUNÇÃO PRINCIPAL — MOSTRA O GRÁFICO
   ============================================================ */
function mostrarRank(tipo) {

    const area = document.getElementById("graficoArea");
    const grafico = document.getElementById("graficoRank");
    const titulo = document.getElementById("tituloRank");

    area.classList.remove("oculto");

    if (tipo === "loja") {
        titulo.innerText = "Ranking — Lojas";
        Plotly.newPlot(grafico, [criarTrace(lojasValues, lojasLabels)], layout);
        animar();
    }

    if (tipo === "vd") {
        titulo.innerText = "Ranking — VD";
        Plotly.newPlot(grafico, [criarTrace(vdValues, vdLabels)], layout);
        animar();
    }

    // coloca botões internos de troca
    colocarBotoesTroca();
}



/* ============================================================
   🔵 6. ANIMAÇÃO AUTOMÁTICA AO EXIBIR
   ============================================================ */
function animar() {
    Plotly.animate("graficoRank", {}, {
        transition: { duration: 650, easing: "cubic-in-out" }
    });
}



/* ============================================================
   🔵 7. DOWNLOAD DO GRÁFICO
   ============================================================ */
function baixarImagem() {
    Plotly.downloadImage("graficoRank", {
        format: "png",
        filename: "rank",
        width: 1600,
        height: 900
    });
}



/* ============================================================
   🔵 8. BOTÃO VOLTAR
   ============================================================ */
function voltar() {
    document.getElementById("graficoArea").classList.add("oculto");
}



/* ============================================================
   🔵 9. BOTÕES INTERNOS PARA TROCAR ENTRE LOJA / VD
   ============================================================ */
function colocarBotoesTroca() {

    if (document.getElementById("btnTrocaL")) return; // evita duplicar

    const titulo = document.getElementById("tituloRank");
    const container = titulo.parentElement;

    const btnL = document.createElement("button");
    btnL.id = "btnTrocaL";
    btnL.className = "btn-voltar";
    btnL.style.marginLeft = "10px";
    btnL.innerText = "Lojas";
    btnL.onclick = () => mostrarRank("loja");

    const btnV = document.createElement("button");
    btnV.id = "btnTrocaV";
    btnV.className = "btn-voltar";
    btnV.style.marginLeft = "5px";
    btnV.innerText = "VD";
    btnV.onclick = () => mostrarRank("vd");

    container.appendChild(btnL);
    container.appendChild(btnV);
}



/* ============================================================
   🔵 10. THEME (OPCIONAL)
   ============================================================ */
const themeBtn = document.getElementById("toggle-theme");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
}
