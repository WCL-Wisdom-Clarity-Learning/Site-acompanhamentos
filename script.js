// Improved site JS: menu toggle, theme toggle, lazy load and simple data-driven project cards
document.addEventListener('DOMContentLoaded', ()=>{
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  // remember preference
  const savedTheme = localStorage.getItem('site-theme');
  if(savedTheme) body.className = savedTheme;

  themeToggle.addEventListener('click', ()=>{
    const isLight = body.classList.contains('theme-light');
    body.className = isLight ? 'theme-dark' : 'theme-light';
    localStorage.setItem('site-theme', body.className);
    themeToggle.setAttribute('aria-pressed', String(!isLight));
  });

  // lazy load images
  const lazyImgs = document.querySelectorAll('img.lazy');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, {rootMargin: '50px'});
    lazyImgs.forEach(img=>obs.observe(img));
  } else {
    lazyImgs.forEach(img=>{ img.src = img.dataset.src; img.classList.remove('lazy') });
  }

  // generate example project cards to demonstrate structure
  const projects = [
    {title: 'Dashboard de KPIs', desc: 'Painel interativo com filtros, gráficos e exportação.'},
    {title: 'Automação de Relatórios', desc: 'Scripts para coleta e consolidação diária de dados.'},
    {title: 'Integração API', desc: 'Pontos de integração com backends e webhook.'},
    {title: 'Monitoramento', desc: 'Alertas e monitoramento de eventos e SLAs.'},
    {title: 'Design System', desc: 'Componentes reutilizáveis e tokens de design.'},
    {title: 'Otimização de Performance', desc: 'Melhorias de carregamento e caching.'}
  ];
  const grid = document.getElementById('projectsGrid');
  projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><p><a class="btn-outline" href="#contato">Solicitar</a></p>`;
    grid.appendChild(card);
  });

  // simplistic contact form handler (no external network calls)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    // show success and reset
    alert('Obrigado, ' + (data.get('nome') || 'usuário') + '! Mensagem recebida.');
    form.reset();
  });
});