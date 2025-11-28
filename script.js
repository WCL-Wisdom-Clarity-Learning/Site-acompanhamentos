
const lojasLabels = ["BR","CN","SP","VP","ST","MS","CF","PF","SD","TP"];
const lojasValues = [68.45,66.83,66.00,60.08,50.00,49.27,46.62,36.22,16.06,13.04];
const vdLabels = ["ERS","ERP","CD"];
const vdValues = [97.61,96.43,94.57];

const trace = {
    x: lojasValues,
    y: lojasLabels.map((l,i)=>`🏆 ${i+1} ${l}`),
    type: 'bar',
    orientation: 'h',
    text: lojasValues.map(v=>v.toFixed(2)+"%"),
    textposition: 'outside',
    marker: {color: 'teal'}
};

const layout = {
    title: 'Pirâmide - Rank de Lojas',
    xaxis: {title: 'Percentual (%)'},
    yaxis: {autorange: 'reversed'},
    margin: {l: 100},
    transition: {duration: 500, easing: 'cubic-in-out'}
};

Plotly.newPlot('grafico', [trace], layout);

function animarLojas() {
    Plotly.animate('grafico', {
        data: [{x: lojasValues, y: lojasLabels.map((l,i)=>`🏆 ${i+1} ${l}`), text: lojasValues.map(v=>v.toFixed(2)+"%"), marker: {color: 'teal'}}],
        layout: {title: 'Pirâmide - Rank de Lojas'}
    }, {transition: {duration: 700, easing: 'cubic-in-out'}});
}

function animarVD() {
    Plotly.animate('grafico', {
        data: [{x: vdValues, y: vdLabels.map((l,i)=>`🏆 ${i+1} ${l}`), text: vdValues.map(v=>v.toFixed(2)+"%"), marker: {color: 'darkblue'}}],
        layout: {title: 'Pirâmide - Rank de VD'}
    }, {transition: {duration: 700, easing: 'cubic-in-out'}});
}

function baixarCSV() {
    let csv = "Categoria,Percentual\n";
    const titulo = document.querySelector('.plotly .title').innerText;
    if(titulo.includes('VD')) {
        vdLabels.forEach((l,i)=>{ csv += `${l},${vdValues[i]}\n`; });
    } else {
        lojasLabels.forEach((l,i)=>{ csv += `${l},${lojasValues[i]}\n`; });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.csv';
    a.click();
}

function baixarImagem() {
    Plotly.downloadImage('grafico', {format: 'png', filename: 'grafico'});
}

document.getElementById('toggle-theme').addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme');
});
