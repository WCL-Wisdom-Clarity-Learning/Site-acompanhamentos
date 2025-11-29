/* ============================================================
   🔵 1. EDITAR OS DADOS AQUI — (COLAR NOVOS DADOS SEM MEXER NO RESTO)
   Basta atualizar as duas listas abaixo quando receber novos percentuais.
   ============================================================ */
const lojasLabels = ["BR","CN","SP","VP","ST","MS","CF","PF"];   // ← (A) EDITAR NOMES DAS LOJAS
const lojasValues = [68.45,66.83,66.00,60.08,50.00,49.27,46.62,36.22]; // ← (B) EDITAR VALORES (%)

const vdLabels = ["ERS","ERP","CD"]; // ← (C) EDITAR NOMES VD
const vdValues = [97.61,96.43,94.57]; // ← (D) EDITAR VALORES VD
/* ============================================================ */



/* ============================================================
   🔵 2. CONFIGURAÇÃO VISUAL DO GRÁFICO
   (barras mais curtas, rótulos mais visíveis e espaçados)
   ============================================================ */
const barThickness = 22;   // ← (E) AQUI ALTERA O TAMANHO DA BARRA (pode deixar 20–26)
const barGap = 0.35;       // ← (F) ESPAÇAMENTO ENTRE BARRAS (0.2 a 0.5)
const fontSize = 18;       // ← (G) TAMANHO DOS RÓTULOS
const colorLojas = "teal"; // ← (H) COR LOJAS
const colorVD = "darkblue";// ← (I) COR VD



/* ============================================================
   🔵 3. TRAÇO PRINCIPAL (formatação igual à imagem)
   ============================================================ */
function criarTrace(valores, labels, cor) {
    return {
        x: valores,
        y: labels.map((l,i)=>`🏆 ${i+1}   ${l}`),
        type: "bar",
        orientation: "h",
        text: valores.map(v => v.toFixed(2) + "%"),
        textposition: "outside",
        marker: {
            color: cor,
            line: { width: 1 }
        },
        textfont: { size: fontSize },
        hoverinfo: "none",
        width: barThickness
    };
}



/* ============================================================
   🔵 4. LAYOUT — FUNDO TRANSPARENTE + MAIS ESPAÇO
   ============================================================ */
const layout = {
    title: "",
    xaxis: {
        title: "",
        showgrid: false,
        zeroline: false,
        tickfont: { size: 16 }
    },
    yaxis: {
        autorange: "reversed",
        tickfont: { size: 18 }
    },
    margin: { l: 140, r: 80, t: 40, b: 40 },
    bargap: barGap,
    plot_bgcolor: "rgba(0,0,0,0)",     // ← FUNDO DO GRÁFICO TRANSPARENTE
    paper_bgcolor: "rgba(0,0,0,0)"     // ← FUNDO TOTAL TRANSPARENTE
};



/* ============================================================
   🔵 5. CRIA GRÁFICO INICIAL (LOJAS)
   ============================================================ */
Plotly.newPlot("grafico", [criarTrace(lojasValues, lojasLabels, colorLojas)], layout);



/* ============================================================
   🔵 6. ANIMAÇÕES
   ============================================================ */
function animarLojas() {
    Plotly.animate("grafico", {
        data: [criarTrace(lojasValues, lojasLabels, colorLojas)]
    }, {transition: {duration: 700, easing: "cubic-in-out"}});
}

function animarVD() {
    Plotly.animate("grafico", {
        data: [criarTrace(vdValues, vdLabels, colorVD)]
    }, {transition: {duration: 700, easing: "cubic-in-out"}});
}



/* ============================================================
   🔵 7. DOWNLOAD DE IMAGEM
   ============================================================ */
function baixarImagem() {
    Plotly.downloadImage("grafico", {
        format: "png",
        filename: "rank",
        width: 1600,
        height: 900
    });
}



/* ============================================================
   🔵 8. THEME (OPCIONAL)
   ============================================================ */
document.getElementById("toggle-theme").addEventListener("click", ()=>{
    document.body.classList.toggle("dark-theme");
});
