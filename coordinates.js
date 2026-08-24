(function(){
  const filesWhite=['a','b','c','d','e','f','g','h'];
  const ranksWhite=['8','7','6','5','4','3','2','1'];
  const filesBlack=['h','g','f','e','d','c','b','a'];
  const ranksBlack=['1','2','3','4','5','6','7','8'];

  function addCoord(square,text,styles){
    const span=document.createElement('span');
    span.className='coord';
    span.textContent=text;
    Object.assign(span.style,styles);
    square.appendChild(span);
  }

  function applyCoordinates(){
    const board=document.getElementById('board');
    if(!board)return;
    const squares=[...board.children];
    if(squares.length!==64)return;
    squares.forEach(s=>s.querySelectorAll('.coord').forEach(c=>c.remove()));

    const blackBottom=(document.querySelector('.orientation')?.textContent||'').includes('NERO');
    const files=blackBottom?filesBlack:filesWhite;
    const ranks=blackBottom?ranksBlack:ranksWhite;

    squares.forEach((sq,i)=>{
      const row=Math.floor(i/8),col=i%8;
      if(row===0){
        addCoord(sq,files[col],{top:'3px',left:'50%',transform:'translateX(-50%)'});
      }
      if(row===7){
        addCoord(sq,files[col],{bottom:'3px',left:'50%',transform:'translateX(-50%)'});
      }
      if(col===0){
        addCoord(sq,ranks[row],{left:'4px',top:'50%',transform:'translateY(-50%)'});
      }
      if(col===7){
        addCoord(sq,ranks[row],{right:'4px',top:'50%',transform:'translateY(-50%)'});
      }
    });
  }

  const originalRenderBoard=window.renderBoard;
  if(typeof originalRenderBoard==='function'){
    window.renderBoard=function(fen){
      originalRenderBoard(fen);
      applyCoordinates();
    };
  }

  const observer=new MutationObserver(()=>applyCoordinates());
  const board=document.getElementById('board');
  if(board)observer.observe(board,{childList:true});
  applyCoordinates();
})();
