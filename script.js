/* == JS LOADED SIGNAL ==================================
 * Runs first. Adds "js-loaded" to <html> so CSS knows JS
 * is active and safely applies the opacity:0 reveal animations.
 * Without this class, all tiles stay fully visible as a fallback.
 */
document.documentElement.classList.add('js-loaded');

/* == HAMBURGER NAV =====================================
 * 1. Click hamburger -> toggle "open" on button + nav-links.
 * 2. Click any nav link -> close the menu automatically.
 * 3. Click outside the nav -> close the menu.
 * Animation handled in CSS via max-height transition.
 */
(function(){
  var hamburger = document.getElementById('navHamburger');
  var navLinks  = document.getElementById('navLinks');

  function openMenu(){
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
  }

  hamburger.addEventListener('click', function(e){
    e.stopPropagation();
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('#mainNav')) closeMenu();
  });
})();

/* == TAP-TO-EXPAND JOB CARDS ===========================
 * On desktop job details open on :hover (pure CSS).
 * On touch devices hover does not fire, so we listen for
 * touchstart and toggle class "tapped" on the card instead.
 */
(function(){
  if(!('ontouchstart' in window)) return;

  var cards = document.querySelectorAll('.job-wrap');

  // ONE shared scroll flag for the whole document.
  // Listening on document (not each card) means we catch every scroll
  // gesture reliably on iOS and Android — even when the browser
  // intercepts the touch before it reaches the card element.
  var didScroll = false;

  document.addEventListener('touchstart', function(){
    didScroll = false;
  }, {passive:true});

  document.addEventListener('touchmove', function(){
    didScroll = true;
  }, {passive:true});

  cards.forEach(function(card){
    card.addEventListener('touchend', function(e){
      if(didScroll) return;                     // finger scrolled — ignore
      if(e.target.closest('a,button')) return; // tapped a link/button — ignore

      // True tap: toggle this card
      var isOpen = card.classList.contains('tapped');
      cards.forEach(function(c){ c.classList.remove('tapped'); });
      if(!isOpen) card.classList.add('tapped');
    }, {passive:true});
  });
})();

/* == THEME TOGGLE ======================================
 * 1. On load check localStorage for saved preference.
 * 2. If nothing saved, check OS prefers-color-scheme.
 * 3. Clicking the button flips data-theme on <html>.
 * 4. Canvas reads window.__lightMode for particle colors.
 */
(function(){
  var html = document.documentElement;
  var btn  = document.getElementById('themeToggle');

  var saved = localStorage.getItem('sk-theme');
  var preferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var isLight = saved ? saved === 'light' : preferLight;

  function applyTheme(light){
    isLight = light;
    html.setAttribute('data-theme', light ? 'light' : 'dark');
    localStorage.setItem('sk-theme', light ? 'light' : 'dark');
    window.__lightMode = light;
  }

  applyTheme(isLight);

  btn.addEventListener('click', function(){
    applyTheme(!isLight);
  });
})();

/* == CANVAS ============================================
 * On mobile we halve the node count to save battery.
 * 70 nodes on desktop, 35 on screens under 768px wide.
 */
(function(){
  var cv  = document.getElementById('bgCanvas');
  var ctx = cv.getContext('2d');
  var isMobile = window.innerWidth < 768;
  var N=isMobile?35:70, D=150, SP=0.45, MR=1.2, XR=2.8, LW=0.4, CS=0.0004;
  var W, H, nodes=[], paused=false;

  function neb(){
    var light = window.__lightMode;
    var g = ctx.createRadialGradient(W*.25,H*.3,0,W*.25,H*.3,W*.55);
    g.addColorStop(0, light?'rgba(92,90,224,.07)':'rgba(0,180,220,.055)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    g = ctx.createRadialGradient(W*.78,H*.72,0,W*.78,H*.72,W*.45);
    g.addColorStop(0, light?'rgba(130,80,200,.05)':'rgba(120,80,240,.045)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }

  function init(){
    nodes=[];
    for(var i=0;i<N;i++){
      var a=Math.random()*Math.PI*2;
      nodes.push({
        x:Math.random()*W, y:Math.random()*H,
        vx:Math.cos(a)*SP*(0.4+Math.random()*.6),
        vy:Math.sin(a)*SP*(0.4+Math.random()*.6),
        r:MR+Math.random()*(XR-MR), ph:Math.random()*Math.PI*2
      });
    }
  }

  function nc(n,t,a){
    var light = window.__lightMode;
    var h = light
      ? 250+Math.sin(((t+n.ph/(Math.PI*2))%1)*Math.PI*2)*20
      : 185+Math.sin(((t+n.ph/(Math.PI*2))%1)*Math.PI*2)*42.5;
    return 'hsla('+h+','+(light?'75%':'100%')+','+(light?'55%':'70%')+','+a+')';
  }

  function draw(ts){
    if(paused){ requestAnimationFrame(draw); return; }
    var light = window.__lightMode;
    var t = (ts*CS)%1;
    ctx.clearRect(0,0,W,H);
    neb();

    for(var i=0;i<nodes.length;i++){
      nodes[i].x+=nodes[i].vx; nodes[i].y+=nodes[i].vy;
      if(nodes[i].x<0||nodes[i].x>W){ nodes[i].vx*=-1; nodes[i].x=Math.max(0,Math.min(W,nodes[i].x)); }
      if(nodes[i].y<0||nodes[i].y>H){ nodes[i].vy*=-1; nodes[i].y=Math.max(0,Math.min(H,nodes[i].y)); }
    }

    ctx.lineWidth=LW;
    for(var i=0;i<nodes.length;i++){
      for(var j=i+1;j<nodes.length;j++){
        var dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        var d=Math.sqrt(dx*dx+dy*dy);
        if(d<D){
          var h = light
            ? 250+Math.sin(((t+(nodes[i].ph+nodes[j].ph)/2/(Math.PI*2))%1)*Math.PI*2)*20
            : 185+Math.sin(((t+(nodes[i].ph+nodes[j].ph)/2/(Math.PI*2))%1)*Math.PI*2)*42.5;
          ctx.strokeStyle='hsla('+h+','+(light?'70%':'90%')+','+(light?'50%':'65%')+','+(1-d/D)*(light?.22:.28)+')';
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
        }
      }
    }

    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      var gw=[[n.r*5,.04],[n.r*3,.09],[n.r*1.8,.18]];
      for(var k=0;k<gw.length;k++){
        ctx.beginPath(); ctx.arc(n.x,n.y,gw[k][0],0,Math.PI*2);
        ctx.fillStyle=nc(n,t,gw[k][1]); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle=nc(n,t,1); ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange',function(){ paused=document.hidden; });
  window.addEventListener('resize',function(){ W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; init(); });
  W=cv.width=window.innerWidth; H=cv.height=window.innerHeight;
  init();
  requestAnimationFrame(draw);
})();

/* == SCROLL REVEAL =====================================
 * Replays on every scroll up and down.
 * Uses IntersectionObserver with scroll event fallback.
 */
(function(){
  var S = '.reveal,.reveal-left,.reveal-right';

  function getDelay(el){
    var siblings = el.parentElement.querySelectorAll(S);
    for(var i=0;i<siblings.length;i++){
      if(siblings[i]===el) return i*200;
    }
    return 0;
  }

  window.addEventListener('load', function(){
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.transitionDelay = getDelay(entry.target)+'ms';
            entry.target.classList.add('visible');
          } else {
            entry.target.style.transitionDelay = '0ms';
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });

      document.querySelectorAll(S).forEach(function(el){ io.observe(el); });
    }

    function scan(){
      var els = document.querySelectorAll(S);
      var vh  = window.innerHeight;
      for(var i=0;i<els.length;i++){
        var r = els[i].getBoundingClientRect();
        if(r.top < vh*0.9 && r.bottom > 0){
          els[i].style.transitionDelay = getDelay(els[i])+'ms';
          els[i].classList.add('visible');
        } else {
          els[i].style.transitionDelay = '0ms';
          els[i].classList.remove('visible');
        }
      }
    }
    window.addEventListener('scroll', scan, {passive:true});
    scan();
  });
})();

/* == NAV HIGHLIGHT ===================================== */
(function(){
  var secs  = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');
  if(!('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){
        for(var j=0;j<links.length;j++) links[j].classList.remove('active');
        var a = document.querySelector('.nav-links a[data-section="'+entries[i].target.id+'"]');
        if(a) a.classList.add('active');
      }
    }
  },{threshold:0.35});
  for(var i=0;i<secs.length;i++) obs.observe(secs[i]);
})();

/* == QUOTES ============================================ */
var curQ=0, qTimer=null;
function goQ(idx){
  if(idx===curQ) return;
  var slides = document.querySelectorAll('.q-slide');
  var dots   = document.querySelectorAll('.q-dot');
  slides[curQ].classList.remove('active');
  slides[curQ].classList.add('exit');
  var p=curQ;
  setTimeout(function(){ slides[p].classList.remove('exit'); },650);
  curQ=idx;
  slides[idx].style.transform='translateY(14px)';
  slides[idx].style.opacity='0';
  slides[idx].classList.add('active');
  requestAnimationFrame(function(){
    slides[idx].style.transition='opacity .6s ease,transform .6s ease';
    slides[idx].style.transform='';
    slides[idx].style.opacity='';
  });
  for(var i=0;i<dots.length;i++) dots[i].classList.toggle('on',i===idx);
  clearInterval(qTimer);
  qTimer=setInterval(function(){ goQ((curQ+1)%4); },4500);
}
qTimer=setInterval(function(){ goQ((curQ+1)%4); },4500);

/* == EMAILJS =========================================== */
(function(){ emailjs.init('Rh0Qgyl8lyqdHJ1mP'); })();
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('composeForm').addEventListener('submit',function(e){
    e.preventDefault();
    var btn = this.querySelector('.compose-send');
    var st  = document.getElementById('composeStatus');
    btn.disabled=true; btn.textContent='Sending...'; st.className='compose-status';

    var params={
      from_name:  document.getElementById('c_name').value,
      from_email: document.getElementById('c_email').value,
      subject:    document.getElementById('c_subject').value,
      message:    document.getElementById('c_message').value
    };

    emailjs.send('service_qamg8rg','template_fr4kits',params)
    .then(function(){
      return emailjs.send('service_qamg8rg','template_pvogdlo',params);
    })
    .then(function(){
      st.className='compose-status success';
      st.textContent='Message sent!';
      btn.textContent='Sent!';
      document.getElementById('composeForm').reset();
      setTimeout(function(){
        btn.disabled=false;
        btn.innerHTML='<svg width="13" height="13" fill="currentColor"><use href="#i-send"/></svg> Send';
      },3000);
    })
    .catch(function(err){
      console.error(err);
      st.className='compose-status error';
      st.textContent='Could not send. Please email sreyakambhatla@outlook.com directly.';
      btn.disabled=false;
      btn.innerHTML='<svg width="13" height="13" fill="currentColor"><use href="#i-send"/></svg> Send';
    });
  });
});
