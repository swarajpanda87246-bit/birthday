/* ============ EDIT THIS PART ============ */
var CFG={
  name:"Papa",   /* change to what you call him */
  reasons:[
    ["Your example","You taught by doing, not by lecturing."],
    ["Your support","You were there on the days that mattered most."],
    ["Your stories","I could listen to every one all over again."],
    ["Your patience","You never rushed me, even when I was slow."],
    ["Your laugh","The best sound in any room."],
    ["Your advice","Still right, even when I didn't want to hear it."]
  ],
  seed:[["Family","Wishing you health, peace and many more years of joy!"],["A friend","Happy Birthday! You are an inspiration to everyone around you."]]
};
var QZ=[
  ["On a free Sunday, Papa is most likely to...",[["Fix something around the house","fixer"],["Tell a story from the old days","story"],["Plan something for the family","provider"],["Sit calmly with his tea","rock"]]],
  ["When something goes wrong, Papa says...",[["Let me look at it","fixer"],["This reminds me of a time...","story"],["Don't worry, I'll arrange it","provider"],["Stay calm, it will be fine","rock"]]],
  ["Papa's best gift to us is...",[["His skill and hard work","fixer"],["His wisdom","story"],["His sacrifices","provider"],["His steady presence","rock"]]],
  ["Papa's favourite kind of food day is...",[["Whatever he cooks himself","fixer"],["A big family table","story"],["Treating everyone","provider"],["Something simple and homely","rock"]]]
];
var RES={
  fixer:["The Fixer","If it's broken, Papa can mend it, and he'll do it without being asked."],
  story:["The Storyteller","Every lesson comes wrapped in a story we never get tired of."],
  provider:["The Provider","Papa quietly makes sure we have everything we need."],
  rock:["The Rock","Papa is the calm in every storm."]
};
/* ============ END OF EDIT AREA ============ */

var $=function(i){return document.getElementById(i)};
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.title="Happy Birthday, "+CFG.name;

/* animated title: each letter drops in */
(function(){
  var n=0;
  function word(t){return '<span class="w">'+t.split('').map(function(ch){
    return ch===' '?' ':'<span class="l" style="animation-delay:'+(n++*.05+.2)+'s">'+esc(ch)+'</span>';
  }).join('')+'</span>'}
  $('title').innerHTML=word('Happy Birthday,')+word(CFG.name);
})();

/* missing photos get a friendly placeholder */
document.querySelectorAll('img').forEach(function(img){
  var box=img.parentElement;
  function miss(){box.classList.add('missing')}
  img.addEventListener('error',miss);
  if(img.complete&&!img.naturalWidth)miss();
});

/* routing */
var pages=['home','letter','memories','gallery','quiz','wishes'];
function go(){
  var h=(location.hash||'#home').slice(1);if(pages.indexOf(h)<0)h='home';
  pages.forEach(function(p){$(p).classList.toggle('on',p===h)});
  document.querySelectorAll('#nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+h)});
  window.scrollTo(0,0);
  watch();
}
addEventListener('hashchange',go);

/* scroll reveal */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){
    e.target.style.transitionDelay=(e.target.dataset.d||0)+'s';
    e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.15});
function watch(){
  var pg=document.querySelector('.page.on');
  pg.querySelectorAll('.reveal:not(.in)').forEach(function(el,i){el.dataset.d=Math.min(i%4,3)*.12;io.observe(el)});
  var y=pg.querySelector('.years');if(y)setTimeout(function(){y.classList.add('on')},200);
}

/* balloons */
(function(){
  if(calm)return;
  var cols=['#ff6b9d','#ffb627','#6ea8ff','#ff7a1a','#7be0a4','#c792ea'],box=$('balloons');
  for(var i=0;i<14;i++){
    var b=document.createElement('div');b.className='balloon';
    b.style.left=(Math.random()*96)+'%';b.style.background=cols[i%cols.length];b.style.borderBottomColor=cols[i%cols.length];
    b.style.animationDuration=(14+Math.random()*14)+'s';b.style.animationDelay=(-Math.random()*20)+'s';
    var s=.7+Math.random()*.7;b.style.width=46*s+'px';b.style.height=58*s+'px';
    box.appendChild(b);
  }
})();

/* marquee text */
(function(){
  var t=('Happy Birthday '+CFG.name+'   \u2605   ').repeat(8);
  $('nav'); document.querySelector('.track').textContent=t+t;
})();

/* sparkle trail */
var lastS=0;
addEventListener('pointermove',function(e){
  if(calm)return;var now=Date.now();if(now-lastS<45)return;lastS=now;
  var s=document.createElement('div');s.className='spark';
  s.style.left=(e.clientX+(Math.random()*16-8))+'px';s.style.top=(e.clientY+(Math.random()*16-8))+'px';
  s.style.background=['#ffb627','#ff6b9d','#6ea8ff','#fff'][Math.floor(Math.random()*4)];
  document.body.appendChild(s);setTimeout(function(){s.remove()},900);
});

/* confetti */
var cv=$('c'),cx=cv.getContext('2d'),P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
var ccols=['#ffb627','#ff7a1a','#f6efe0','#6ea8ff','#ff6b9d'];
function burst(){
  if(calm)return;
  for(var i=0;i<170;i++)P.push({x:innerWidth/2,y:innerHeight*.55,vx:(Math.random()-.5)*16,vy:-Math.random()*16-3,s:Math.random()*7+4,r:Math.random()*6,c:ccols[i%5],l:1});
  if(!run){run=true;tick()}
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(function(p){return p.l>0});
  P.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.r+=.2;p.l-=.008;cx.save();cx.globalAlpha=Math.max(p.l,0);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});
  if(P.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}

/* candle */
var blown=false;
$('cake').onclick=function(){if(blown)return;blown=true;$('home').classList.add('out');burst();setTimeout(burst,500)};

/* birthday tune */
var ac=null,playing=false;
var S=[[392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],[392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],[392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],[698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]];
$('song').onclick=function(){
  if(playing)return;
  try{
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();
    playing=true;var t=ac.currentTime+.05,b=.42;
    S.forEach(function(n){
      var o=ac.createOscillator(),g=ac.createGain();
      o.type='triangle';o.frequency.value=n[0];
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.25,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+n[1]*b*.95);
      o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+n[1]*b);t+=n[1]*b;
    });
    setTimeout(function(){playing=false;burst()},(t-ac.currentTime)*1000);
  }catch(e){playing=false}
};

/* flip cards */
$('flips').innerHTML=CFG.reasons.map(function(r){return '<button class="flip reveal" aria-label="'+esc(r[0])+'"><i><b>'+esc(r[0])+'</b><em>'+esc(r[1])+'</em></i></button>'}).join('');
document.querySelectorAll('.flip').forEach(function(b){b.onclick=function(){b.classList.toggle('f')}});

/* lightbox */
var lb=$('lb');
document.querySelectorAll('.pol').forEach(function(p){p.onclick=function(){
  if(p.classList.contains('missing'))return;
  lb.querySelector('img').src=p.querySelector('img').src;lb.hidden=false;
}});
function closeLb(){lb.hidden=true}
$('lbx').onclick=closeLb;lb.onclick=function(e){if(e.target===lb)closeLb()};
addEventListener('keydown',function(e){if(e.key==='Escape')closeLb()});

/* quiz */
var qi=0,tally={};
function renderQ(){
  var box=$('qbox');
  if(qi>=QZ.length){
    var top='rock',mx=-1;for(var k in tally){if(tally[k]>mx){mx=tally[k];top=k}}
    var r=RES[top];
    box.innerHTML='<div class="cert"><div class="tiny">Our verdict</div><h3>'+r[0]+'</h3><p>'+r[1]+'</p><button class="btn" id="again">Try again</button></div>';
    $('again').onclick=function(){qi=0;tally={};renderQ()};
    burst();return;
  }
  var q=QZ[qi];
  box.innerHTML='<div class="bar"><div style="width:'+(qi/QZ.length*100)+'%"></div></div><div class="q"><h3>'+esc(q[0])+'</h3>'+q[1].map(function(o){return '<button data-k="'+o[1]+'">'+esc(o[0])+'</button>'}).join('')+'</div>';
  box.querySelectorAll('.q button').forEach(function(b){b.onclick=function(){var k=b.dataset.k;tally[k]=(tally[k]||0)+1;qi++;renderQ()}});
}
renderQ();

/* wishes (saved in this browser only) */
var KEY='papa-wishes',mine=[];
try{mine=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
function renderW(){
  var all=mine.concat(CFG.seed.map(function(s){return{n:s[0],m:s[1]}}));
  $('wall').innerHTML=all.map(function(w,i){return '<div class="note" style="animation-delay:'+i*.08+'s">'+esc(w.m)+'<small>'+esc(w.n)+'</small></div>'}).join('');
}
$('wf').onsubmit=function(e){
  e.preventDefault();
  mine.unshift({n:$('wn').value.trim(),m:$('wm').value.trim()});
  try{localStorage.setItem(KEY,JSON.stringify(mine))}catch(x){}
  $('wm').value='';renderW();burst();
};
renderW();
go();
