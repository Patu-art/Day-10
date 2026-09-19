(()=>{
  'use strict';
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  const closeMenu=()=>{
    if(!toggle||!nav)return;
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const opening=toggle.getAttribute('aria-expanded')!=='true';
      toggle.setAttribute('aria-expanded',String(opening));
      toggle.setAttribute('aria-label',opening?'Close navigation':'Open navigation');
      nav.classList.toggle('is-open',opening);
      document.body.classList.toggle('menu-open',opening);
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
    document.addEventListener('pointerdown',event=>{
      if(nav.classList.contains('is-open')&&!nav.contains(event.target)&&!toggle.contains(event.target))closeMenu();
    });
    const desktop=window.matchMedia('(min-width: 901px)');
    desktop.addEventListener?.('change',()=>{if(desktop.matches)closeMenu()});
  }
  const stage=document.querySelector('.moment-stage');
  const modes={
    day:{eyebrow:'THE FIRST SIDE / COFFEE BY DAY',title:'COFFEE.\nAND THE\nGOOD STUFF.',description:'Speciality coffee, pastries and records played the way they were meant to be heard. Find a seat and stay a while.',art:'assets/illustrations/coffee-scene.svg',alt:'Original concept illustration of coffee on a wooden table with a record in the background',tag:'DAY / A-SIDE'},
    night:{eyebrow:'THE FLIP SIDE / LISTENING BY NIGHT',title:'A DRINK.\nAND A\nDEEPER LISTEN.',description:'As the room moves into evening, cocktails, wine and beer meet vintage hi-fi and the records selected for the night.',art:'assets/illustrations/turntable-scene.svg',alt:'Original illustration of a turntable and vinyl record under warm lamplight',tag:'NIGHT / B-SIDE'}
  };
  function setMode(mode){
    if(!stage||!modes[mode])return;
    const data=modes[mode];
    stage.dataset.stage=mode;
    stage.querySelector('[data-mode-eyebrow]').textContent=data.eyebrow;
    const heading=stage.querySelector('[data-mode-title]');
    const words=data.title.split('\n');
    heading.replaceChildren(document.createTextNode(words[0]),document.createElement('br'));
    const emph=document.createElement('em');emph.textContent=words[1];heading.append(emph,document.createElement('br'),document.createTextNode(words[2]));
    stage.querySelector('[data-mode-description]').textContent=data.description;
    const image=stage.querySelector('[data-mode-art]');image.src=data.art;image.alt=data.alt;
    stage.querySelector('[data-mode-tag]').textContent=data.tag;
    document.querySelectorAll('.moment-tab').forEach(btn=>{
      const current=btn.dataset.mode===mode;
      btn.classList.toggle('is-current',current);
      btn.setAttribute('aria-pressed',String(current));
    });
  }
  document.querySelectorAll('.moment-tab').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
})();
