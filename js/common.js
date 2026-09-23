/* common header, cart */
function getCart(){
  try{ return JSON.parse(localStorage.getItem('vs_cart')||'[]'); }catch(e){ return []; }
}
function setCart(c){ localStorage.setItem('vs_cart', JSON.stringify(c)); updateCartCount(); }
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s+(i.qty||1),0);
  document.querySelectorAll('[data-cart-count]').forEach(el=>{
    el.textContent = count;
    el.style.display = count? 'grid':'none';
  });
}
function addToCart(toolId, days=1){
  let cart=getCart();
  let found=cart.find(i=>i.id===toolId && i.days===days);
  if(found) found.qty=(found.qty||1)+1;
  else cart.push({id:toolId, days, qty:1, added:Date.now()});
  setCart(cart);
  toast(`Добавлено в корзину`);
}
function toast(msg){
  let t=document.getElementById('toast');
  if(!t){
    t=document.createElement('div');
    t.id='toast';
    t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:#1C212C;border:1px solid rgba(255,255,255,.14);color:#F2F3F5;padding:12px 18px;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);z-index:999;opacity:0;transition:.3s;font-size:14px;font-weight:500;pointer-events:none';
    document.body.appendChild(t);
  }
  t.textContent=msg;
  t.style.opacity='1';
  t.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(20px)';},2200);
}
function formatPrice(n){ return n.toLocaleString('ru-RU')+' ₽'; }
function getTool(id){ return (window.TOOLS||[]).find(t=>t.id===id); }

document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCount();
  // burger
  const burger=document.querySelector('.burger');
  const menu=document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.addEventListener('click', ()=>menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
  }
});
