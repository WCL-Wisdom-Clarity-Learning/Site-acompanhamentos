const lojasLabels = ["BR","CN","SP","VP","ST","MS","CF","PF","SD","TP"];
const lojasValues = [68.45,66.83,66.00,60.08,50.00,49.27,46.62,36.22,16.06,13.04];

const vdLabels = ["ERS","ERP","CD"];
const vdValues = [97.61,96.43,94.57];

// ===== CONFIGURAÇÃO DO GRÁFICO BASE =====
const trace = {
    x: lojasValues,
    y: lojasLabels.map((l,i)=>`🏆 ${i+1} ${l}`),
    type: 'bar',
    orientation: 'h',

    // 🔹 Deixar as barras mais finas
    marker: {
        color: 'teal',
        line: { width: 1, color: '#fff' }
    },

    // 🔹 Mostrar % mais perto das barras
    text: lojasValues.map(v=>v.toFixed(2)+"%"),
    textposition: 'outside',

    // 🔹 “Espessura” da barra (0 = muito fina, 1 = espessa)
    width: 0.45
};

// ===== LAYOUT COM ESTILO PROFISSIONAL =====
const layout = {
    title: {
        text: 'Pirâmide - Rank de Lojas',
        font: { size: 22, color: "white" }
    },

    // 🔹 Fundo totalmente transparente
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',

    xaxis: {
        title: 'Percentual (%)',
        color: 'white',
        tickfont: { size: 12 },
        gridcolor: 'rgba(255,255,255,0.08)'
    },

    yaxis: {
        autorange: 'reversed',
        color: 'white',

        // 🔹 Mais espaçamento entre os textos do eixo Y
        tickfont: { size: 14 },
    },

    margin: { l: 120, r: 30, t: 60, b: 40 },

    // Transição suave
    transition: { duration: 500, easing: 'cubic-in-out' }
};

Plotly.newPlot('grafico', [trace], layout);



// ===== ANIMAÇÕES =====
function animarLojas() {
    Plotly.animate('grafico', {
        data: [{
            x: lojasValues,
            y: lojasLabels.map((l,i)=>`🏆 ${i+1} ${l}`),
            text: lojasValues.map(v=>v.toFixe
