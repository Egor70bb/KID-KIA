(function(){
  const letters=['A','B','C','D'];
  const hintButton=document.getElementById('hintButton');
  const hintChoices=document.getElementById('hintChoices');
  const moveInput=document.getElementById('moveInput');
  const answerForm=document.getElementById('answerForm');
  if(!hintButton||!hintChoices||!moveInput||!answerForm)return;

  function rawMove(ex){
    if(ex && Array.isArray(ex.answers) && ex.answers.length)return ex.answers[0];
    if(ex && ex.best)return ex.best.replace(/^\d+\.(?:\.\.)?/, '');
    return '';
  }

  function displayMove(move){
    const opening=(document.getElementById('opening')?.textContent||'').toUpperCase();
    return opening.startsWith('KID') && move && !move.startsWith('...') ? `...${move}` : move;
  }

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function candidateMoves(){
    const e=exercises[current];
    const correct=rawMove(e);
    const sameFamily=exercises.filter(x=>x.family===e.family && x!==e).map(rawMove);
    const broader=exercises.filter(x=>x!==e).map(rawMove);
    const pool=[...sameFamily,...broader].filter(Boolean);
    const unique=[];
    const seen=new Set([cleanMove(correct)]);
    for(const m of pool){
      const k=cleanMove(m);
      if(!seen.has(k)){
        seen.add(k);
        unique.push(m);
      }
      if(unique.length>=3)break;
    }
    return shuffle([correct,...unique.slice(0,3)]);
  }

  function hideHints(){
    hintChoices.classList.add('hidden');
    hintChoices.replaceChildren();
    hintButton.setAttribute('aria-expanded','false');
  }

  function showHints(){
    const moves=candidateMoves();
    hintChoices.replaceChildren();
    moves.forEach((move,i)=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='hint-choice';
      b.innerHTML=`<span class="hint-letter">${letters[i]}</span><span class="hint-move">${displayMove(move)}</span>`;
      b.addEventListener('click',()=>{
        moveInput.value=displayMove(move);
        answerForm.requestSubmit();
      });
      hintChoices.appendChild(b);
    });
    const note=document.createElement('div');
    note.className='hint-note';
    note.textContent='Scegli una delle quattro continuazioni: la valutazione partirà subito.';
    note.style.gridColumn='1 / -1';
    hintChoices.appendChild(note);
    hintChoices.classList.remove('hidden');
    hintButton.setAttribute('aria-expanded','true');
  }

  hintButton.addEventListener('click',()=>{
    if(hintChoices.classList.contains('hidden'))showHints();
    else hideHints();
  });

  ['newTop','newBottom'].forEach(id=>document.getElementById(id)?.addEventListener('click',hideHints));
  document.getElementById('familySelect')?.addEventListener('change',hideHints);

  const question=document.getElementById('question');
  if(question){
    new MutationObserver(hideHints).observe(question,{childList:true,characterData:true,subtree:true});
  }
})();