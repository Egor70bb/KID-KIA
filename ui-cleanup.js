(function(){
  const banned=new Set(['Il Nero muove.','Il Bianco muove.']);
  function cleanup(){
    document.querySelectorAll('h1,h2,h3,p,div,span').forEach(el=>{
      if(banned.has((el.textContent||'').trim())) el.remove();
    });
    const form=document.getElementById('answerForm');
    const row=document.querySelector('.answer-row');
    const input=document.getElementById('moveInput');
    const button=row?.querySelector('button');
    if(form){form.style.marginTop='10px';form.style.maxWidth='430px'}
    if(row){row.style.maxWidth='430px'}
    if(input){input.style.padding='8px 11px';input.style.fontSize='15px'}
    if(button){button.style.padding='0 14px';button.style.fontSize='13px'}
  }
  const observer=new MutationObserver(cleanup);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',cleanup,{once:true});
  cleanup();
})();
