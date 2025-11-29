
/* Generated script.js: fetch ranking and render */
async function fetchJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error('Network error');
  return res.json();
}

async function loadRanking(){
  try{
    const data = await fetchJSON('/api/ranking.json');
    renderRanking(data);
  }catch(e){console.error(e);}
}


window.addEventListener('DOMContentLoaded', function(){ loadRanking(); loadContribuicoes(); });

async function loadContribuicoes(){
  try{
    const list = await fetchJSON('/api/contribuicoes.json');
    renderContribs(list);
  }catch(e){console.warn('contribs',e);}
}

function renderContribs(list){
  const grid = document.getElementById('contrib-grid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(function(item){
    const card = document.createElement('div');
    card.className='contrib-card';
    card.innerHTML = '<h3>' + (item.titulo || '') + '</h3><p>' + (item.descricao || '') + '</p><a href="' + (item.link||'#') + '" target="_blank">Ver</a>';
    grid.appendChild(card);
  });
}



/* --- Navigation active state --- */
function setActiveNav(){
  try{
    var links = document.querySelectorAll('.topnav a');
    links.forEach(function(a){
      try{
        var linkPath = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/+$/, '');
        var curr = location.pathname.replace(/\/+$/, '');
        if(linkPath === curr || (linkPath !== '' && curr.endsWith(linkPath)) ){
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      }catch(e){ /* ignore */ }
    });
  }catch(e){}
}

/* --- Ranking toggle Loja / VD --- */
var currentRankingType = 'loja'; // default

async function loadRanking(type){
  currentRankingType = type || currentRankingType || 'loja';
  var path = '/api/ranking.json';
  if(currentRankingType === 'vd') path = '/api/ranking_vd.json';
  // try fallback to default if not exists
  try{
    var res = await fetch(path);
    if(!res.ok) throw new Error('not found');
    var data = await res.json();
    renderRanking(data);
  }catch(e){
    if(path !== '/api/ranking.json'){
      try{
        var res2 = await fetch('/api/ranking.json');
        if(res2.ok){ var data2 = await res2.json(); renderRanking(data2); return; }
      }catch(e2){ console.error('fallback failed', e2); }
    }
    console.error('Failed to load ranking', e);
    // show empty state
    var c = document.getElementById('ranking-container');
    if(c) c.innerHTML = '<p style="color:#777">Ranking indisponível.</p>';
  }
}

/* Attach toggle buttons */
function initRankSwitch(){
  try{
    var btns = document.querySelectorAll('.rank-switch button');
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        btns.forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        var t = (b.getAttribute('data-type') || b.textContent || '').toLowerCase();
        if(t.indexOf('vd')!==-1) loadRanking('vd'); else loadRanking('loja');
      });
    });
  }catch(e){}
}

/* Ensure active nav set on load and history navigation */
window.addEventListener('DOMContentLoaded', function(){
  setActiveNav();
  initRankSwitch();
});
window.addEventListener('popstate', setActiveNav);


/* Fade animation */
function fadeOutIn(el, callback){
  if(!el) return callback&&callback();
  el.style.opacity = 1;
  el.style.transition = 'opacity 0.4s';
  el.style.opacity = 0;
  setTimeout(function(){
    callback&&callback();
    el.style.opacity = 0;
    setTimeout(function(){
      el.style.opacity = 1;
    },20);
  },400);
}

function renderRanking(data){
  var c = document.getElementById('ranking-container');
  fadeOutIn(c, function(){
    var html = '';
    if(data && Array.isArray(data)){
      data.forEach(function(item){
        html += `
          <div class="rank-row">
            <span class="pos">${item.pos}</span>
            <span class="sigla">${item.sigla}</span>
            <div class="bar"><div class="fill" style="width:${item.percent}%"></div></div>
            <span class="pct">${item.percent}%</span>
          </div>
        `;
      });
    }
    c.innerHTML = html;
  });
}
