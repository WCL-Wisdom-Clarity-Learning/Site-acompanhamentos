
/* A: data editable */
const lojas = [
  {label:'BR', val:75.86},
  {label:'CN', val:68.45},
  {label:'SP', val:66.83},
  {label:'VP', val:66.00},
  {label:'ST', val:60.08},
  {label:'MS', val:50.00},
  {label:'CF', val:49.27},
  {label:'PF', val:46.62}
];

const vd = [
  {label:'ERS', val:97.61},
  {label:'ERP', val:96.43},
  {label:'CD', val:94.57}
];

/* config */
const maxPercent = 100; // scale
const panel = document.getElementById('rankPanel');

let mode = 'loja';

function colorByRank(i){
  if(i===0) return '#d4af37';
  if(i===1) return '#c0c0c0';
  if(i===2) return '#cd7f32';
  return '#0e8c86';
}

function render(){
  panel.innerHTML='';
  const data = (mode==='loja') ? lojas.slice() : vd.slice();
  // sort desc
  data.sort((a,b)=>b.val - a.val);
  data.forEach((it, idx)=>{
    const row = document.createElement('div');
    row.className='rank-row';
    row.innerHTML = `
      <div class="rank-left">
        <div class="trophy">🏆 ${idx+1}</div>
        <div class="rank-label">${it.label}</div>
      </div>
      <div class="bar-wrap"><div class="bar" style="width:0;background:${colorByRank(idx)}"></div></div>
      <div class="percent">${it.val.toFixed(2)}%</div>
    `;
    panel.appendChild(row);
    // animate fill width
    const bar = row.querySelector('.bar');
    const pct = Math.max(2, (it.val / maxPercent) * 100);
    setTimeout(()=>{ bar.style.width = pct + '%'; bar.style.transition = 'width 700ms cubic-bezier(.22,.9,.32,1)'; }, 50 + idx*80);
  });
}

// button handlers
document.getElementById('btnLoja').addEventListener('click', ()=>{
  mode='loja';
  document.getElementById('btnLoja').classList.add('active');
  document.getElementById('btnVD').classList.remove('active');
  render();
});
document.getElementById('btnVD').addEventListener('click', ()=>{
  mode='vd';
  document.getElementById('btnVD').classList.add('active');
  document.getElementById('btnLoja').classList.remove('active');
  render();
});

// init
render();
