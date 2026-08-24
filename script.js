const canvas = document.querySelector('#hero-canvas');
const ctx = canvas.getContext('2d');
let width, height, dpr, mouse = { x: 0, y: 0 }, target = { x: 0, y: 0 };
const particles = Array.from({ length: 95 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.7 + .25, speed: Math.random() * .00018 + .00004, drift: Math.random() * 1.7, alpha: Math.random() * .45 + .12 }));
function resize() { dpr = Math.min(devicePixelRatio, 2); width = innerWidth; height = innerHeight; canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = width+'px'; canvas.style.height = height+'px'; ctx.scale(dpr,dpr); }
function draw(time = 0) { ctx.clearRect(0, 0, width, height); target.x += (mouse.x-target.x)*.035; target.y += (mouse.y-target.y)*.035; const cx=width*.72+target.x*25,cy=height*.44+target.y*18, g=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(width,height)*.44); g.addColorStop(0,'rgba(190,239,78,.13)');g.addColorStop(.45,'rgba(127,158,42,.035)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,width,height);particles.forEach(p=>{p.y-=p.speed;if(p.y<-.02)p.y=1.02;const x=p.x*width+Math.sin(time*.0003+p.drift)*18+target.x*10,y=p.y*height;ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(215,236,154,${p.alpha})`;ctx.fill()});requestAnimationFrame(draw); }
addEventListener('resize',resize); addEventListener('pointermove',e=>{mouse.x=(e.clientX/innerWidth-.5)*2;mouse.y=(e.clientY/innerHeight-.5)*2});resize();requestAnimationFrame(draw);

const hero = document.querySelector('.hero');
const scenes = document.querySelectorAll('.scene');
let currentScene = 0;
function setScene(index) { currentScene = (index + 3) % 3; hero.classList.remove('scene-1','scene-2','scene-3'); hero.classList.add(`scene-${currentScene+1}`); scenes.forEach((button,i)=>button.classList.toggle('active',i===currentScene)); }
scenes.forEach(button=>button.addEventListener('click',()=>setScene(Number(button.dataset.scene))));
addEventListener('keydown',e=>{ if(e.code==='Space' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();setScene(currentScene+1)} });

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4*70,210)}ms`;observer.observe(el)});
addEventListener('scroll',()=>{const y=Math.min(scrollY,innerHeight),content=document.querySelector('.hero-content');if(content)content.style.transform=`translate3d(0,${y*.08}px,0)`},{passive:true});
