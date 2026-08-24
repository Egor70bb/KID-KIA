const motifs={
  Nf1:{q:"Qual è la manovra tipica per reindirizzare il cavallo verso h2/g3/e3 e sostenere l'attacco?",idea:"Nf1 è una manovra-cardine della KIA: il cavallo lascia d2, libera pezzi e può raggiungere h2-g4 oppure e3, a seconda della struttura."},
  e5:{q:"Il centro lo consente: quale avanzata definisce lo spazio della KIA e restringe il Nero?",idea:"e5 guadagna spazio, scaccia o limita il cavallo f6 e crea le condizioni per un attacco sull'ala di Re."},
  h4:{q:"Il centro è abbastanza stabile. Quale spinta avvia il gioco diretto contro il Re nero?",idea:"h4 è una leva tipica della KIA quando il Bianco può iniziare l'espansione h4-h5 senza concedere troppo controgioco centrale."},
  h3:{q:"Quale mossa profilattica dà al Re una casa di fuga e controlla g4 prima di manovrare?",idea:"h3 è utile per togliere g4 ai pezzi neri, dare aria al Re e preparare con calma Nf1-h2-g4."},
  d4:{q:"Il Nero non controlla abbastanza il centro. Quale rottura trasforma la KIA in un centro più aperto?",idea:"d4 è la rottura centrale alternativa: va scelta quando il Nero concede il centro e il Bianco può aprire linee senza perdere il controllo di e4/e5."},
  c4:{q:"Quale spinta laterale può colpire la catena centrale del Nero e guadagnare spazio?",idea:"c4 mette pressione sulla base della catena nera e può creare un secondo fronte, evitando che il Nero concentri tutto il gioco sull'ala di Re."},
  Qc2:{q:"Dove collocare la Donna per sostenere e4/e5 e creare pressione sulla diagonale verso h7?",idea:"Qc2 coordina la Donna con l'alfiere g2, sostiene il centro e spesso prepara e5 oppure un attacco su h7."},
  a3:{q:"Quale mossa profilattica limita ...Nb4 e prepara eventuale espansione a Donna?",idea:"a3 controlla b4 e rende più stabile il centro prima di intraprendere operazioni sull'ala di Re."}
};

const familyDefs={
FRENCH:{label:"Contro struttura Francese",fen:"r1bq1rk1/pp2bppp/2nppn2/2p1P3/8/2PP1NP1/PP1NPPBP/R1BQR1K1 w - - 0 11",moves:["Nf1","h4","c4","Qc2","h3","Nf1","h4","c4","a3","Nf1"]},
SIC_E6:{label:"Contro Siciliana ...e6",fen:"r1bq1rk1/pp2bppp/2nppn2/2p1P3/8/2PP1NP1/PP1NPPBP/R1BQR1K1 w - - 0 11",moves:["Nf1","h4","c4","Qc2","h3","a3","Nf1","h4","c4","Qc2"]},
SIC_G6:{label:"Contro Siciliana ...g6",fen:"r1bq1rk1/pp2ppbp/2np1np1/2p5/4P3/2PP1NP1/PP1N1PBP/R1BQR1K1 w - - 0 11",moves:["e5","h3","d4","Nf1","Qc2","h4","a3","e5","d4","Nf1"]},
CARO:{label:"Contro Caro-Kann",fen:"r1bq1rk1/pp2bppp/2p1pn2/3pP3/8/2PP1NP1/PP1NPPBP/R1BQR1K1 w - - 0 11",moves:["Nf1","h4","c4","d4","Qc2","h3","Nf1","h4","c4","a3"]},
PIRC:{label:"Contro Pirc / Moderna",fen:"r1bq1rk1/ppp1ppbp/2np1np1/8/4P3/2PP1NP1/PP1N1PBP/R1BQR1K1 w - - 0 11",moves:["e5","h3","d4","Nf1","Qc2","h4","a3","e5","d4","Nf1"]},
CLASSICAL:{label:"Contro setup classico ...d5/...Nf6",fen:"r1bq1rk1/ppp1bppp/2n1pn2/3p4/4P3/2PP1NP1/PP1N1PBP/R1BQR1K1 w - - 0 11",moves:["e5","d4","Nf1","h4","c4","Qc2","h3","a3","e5","d4"]},
B6:{label:"Contro fianchetto di Donna ...b6/...Bb7",fen:"r2q1rk1/pbpn1ppp/1p2pn2/3p4/4P3/2PP1NP1/PP1N1PBP/R1BQR1K1 w - - 0 11",moves:["e5","Nf1","h4","d4","c4","Qc2","a3","h3","e5","Nf1"]}
};

const exercises=[];
Object.entries(familyDefs).forEach(([family,def])=>{
  def.moves.forEach((move,i)=>{
    const whiteMove=11+(i%5), blackMove=whiteMove-1;
    exercises.push({family,familyLabel:def.label,n:whiteMove,opening:`KIA · ${def.label}`,fen:def.fen,last:`${blackMove}...Nf6`,best:move,answers:[move.toLowerCase(),`${whiteMove}.${move}`.toLowerCase()],question:motifs[move].q,idea:motifs[move].idea});
  });
});

const glyphs={k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟",K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙"};
let current=0,activeFamily="ALL";const $=id=>document.getElementById(id);
function fenSquares(fen){const out=[];for(const c of fen.split(" ")[0]){if(c==="/")continue;if(/\d/.test(c))out.push(...Array(Number(c)).fill(null));else out.push(c)}return out}
function cleanMove(v){return v.toLowerCase().trim().replace(/[+#?!]/g,"").replace(/\s/g,"").replace(/^\d+\./,"")}
function pool(){return activeFamily==="ALL"?exercises:exercises.filter(e=>e.family===activeFamily)}
function renderBoard(fen){const board=$("board");board.replaceChildren();fenSquares(fen).forEach((piece,i)=>{const row=Math.floor(i/8),col=i%8,s=document.createElement("div");s.className=`square ${(row+col)%2?"dark":"light"}`;s.title=`${"abcdefgh"[col]}${8-row}`;if(piece){const p=document.createElement("span");p.className=`piece ${piece===piece.toUpperCase()?"white-piece":"black-piece"}`;p.textContent=glyphs[piece];s.appendChild(p)}board.appendChild(s)})}
function render(){const e=exercises[current],p=pool(),localIndex=p.findIndex(x=>x===e)+1;$("exerciseNumber").textContent=`ESERCIZIO ${String(localIndex).padStart(2,"0")} / ${p.length}`;$("moveNumber").textContent=`Dopo la mossa ${e.n-1} del Nero`;$("opening").textContent=e.opening;$("lastMove").textContent=e.last;$("question").textContent=e.question;$("moveInput").value="";$("feedback").classList.add("hidden");$("solution").classList.add("hidden");renderBoard(e.fen);$("moveInput").focus({preventScroll:true})}
function pickRandom(){const p=pool();if(p.length===1){current=exercises.indexOf(p[0]);return}let candidate=p[Math.floor(Math.random()*p.length)];while(exercises.indexOf(candidate)===current)candidate=p[Math.floor(Math.random()*p.length)];current=exercises.indexOf(candidate)}
function next(){pickRandom();render();window.scrollTo({top:0,behavior:"smooth"})}
function evaluate(event){event.preventDefault();const e=exercises[current],move=cleanMove($("moveInput").value);if(!move){$("moveInput").focus();return}const correct=e.answers.map(cleanMove).includes(move),score=correct?10:3,text=correct?"Eccellente: hai riconosciuto il piano tematico della KIA.":"La mossa può essere giocabile, ma non è il piano tematico scelto per questo esercizio. Confronta la soluzione e soprattutto l'idea strategica.";$("scoreValue").textContent=score;$("scoreTitle").textContent=correct?"Mossa corretta":"Da migliorare";$("scoreText").textContent=text;$("bestMove").textContent=`${e.n}.${e.best}`;$("idea").textContent=e.idea;$("feedback").classList.remove("hidden");$("solution").classList.remove("hidden")}
function changeFamily(){activeFamily=$("familySelect").value;const p=pool();$("familyCount").textContent=`${p.length} posizioni disponibili`;current=exercises.indexOf(p[Math.floor(Math.random()*p.length)]);render()}
$("newTop").addEventListener("click",next);$("newBottom").addEventListener("click",next);$("answerForm").addEventListener("submit",evaluate);$("familySelect").addEventListener("change",changeFamily);current=Math.floor(Math.random()*exercises.length);render();
