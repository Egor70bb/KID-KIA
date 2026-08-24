(function(){
  const filesWhite=['a','b','c','d','e','f','g','h'];
  const ranksWhite=['8','7','6','5','4','3','2','1'];
  const filesBlack=['h','g','f','e','d','c','b','a'];
  const ranksBlack=['1','2','3','4','5','6','7','8'];

  function ensureBorderCoordinates(){
    const board=document.getElementById('board');
    if(!board)return;
    const wrap=board.parentElement;
    if(!wrap)return;
    wrap.querySelectorAll('.board-files-top,.board-ranks-right').forEach(el=>el.remove());

    const blackBottom=(document.querySelector('.orientation')?.textContent||'').includes('NERO');
    const files=blackBottom?filesBlack:filesWhite;
    const ranks=blackBottom?ranksBlack:ranksWhite;

    const top=document.createElement('div');
    top.className='board-files-top';
    files.forEach(file=>{const s=document.createElement('span');s.textContent=file;top.appendChild(s)});

    const right=document.createElement('div');
    right.className='board-ranks-right';
    ranks.forEach(rank=>{const s=document.createElement('span');s.textContent=rank;right.appendChild(s)});

    wrap.appendChild(top);
    wrap.appendChild(right);
  }

  const observer=new MutationObserver(()=>ensureBorderCoordinates());
  const board=document.getElementById('board');
  if(board)observer.observe(board,{childList:true});
  ensureBorderCoordinates();
})();
