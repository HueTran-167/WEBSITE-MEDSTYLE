window.ICON = {
  mess:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.3 2 2 6.2 2 11.5c0 2.9 1.4 5.5 3.6 7.2v3.1l3.1-1.7c1 .3 2.1.4 3.3.4 5.7 0 10-4.2 10-9.5S17.7 2 12 2Zm1 12.1-2.5-2.7-4.6 2.7 5.1-5.4 2.6 2.6 4.5-2.6-5.1 5.4Z"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"/></svg>',
  bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6ZM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.6 3.6 3.6 3.9v2.7c-1.4.1-2.7-.3-3.9-1.1v5.9c0 3.4-2.7 6.1-6 6.1S3.7 17.8 3.7 14.4c0-3.1 2.3-5.7 5.3-6v2.9a3.2 3.2 0 1 0 2.3 3.1V3H16Z"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-3.8-.8L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l18 9-18 9 4-9-4-9Z"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4Z"/></svg>',
  bag2:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 8Zm4 0V6a4 4 0 0 1 8 0v2"/></svg>'
};

window.msPrice = n => typeof n === "number" ? n.toLocaleString("vi-VN") + "đ" : "";
window.msMess = ref => MS.links.messengerBase + ref;
window.one = name => document.querySelector(`[data-ms="${name}"]`);
window.fill = (name, html) => document.querySelectorAll(`[data-ms="${name}"]`).forEach(el => el.innerHTML = html);

window.phFig = function(file,label,ar,cls){
  const fallback = MS.fallbackImg ? `this.onerror=null;this.src='assets/img/${MS.fallbackImg}'` : "this.remove()";
  const style = ar === null ? "" : ` style="--ar:${ar || "3/4"}"`;
  return `<figure class="ph ${cls || ""}"${style} data-label="${label || file}"><img src="assets/img/${file}" alt="" loading="lazy" onerror="${fallback}"></figure>`;
};
window.heroFig = function(b){
  const desktop = b.img;
  const mobile = b.imgMobile || b.img;

  return `
    <figure class="ph ph--hero">

      <img
        class="hero-img-desktop"
        src="assets/img/${desktop}"
        alt=""
        loading="eager"
        decoding="async"
        fetchpriority="high"
        onerror="
          this.onerror=null;
          this.src='assets/img/${mobile}';
        "
      >

      <img
        class="hero-img-mobile"
        src="assets/img/${mobile}"
        alt=""
        loading="eager"
        decoding="async"
        fetchpriority="high"
        onerror="
          this.onerror=null;
          this.src='assets/img/${desktop}';
        "
      >

    </figure>
  `;
};

window.Store = (()=>{
  let mem={};
  const ok=(()=>{try{localStorage.setItem("_t","1");localStorage.removeItem("_t");return true}catch(e){return false}})();
  return {get(k){try{return ok?localStorage.getItem(k):mem[k]??null}catch(e){return mem[k]??null}},set(k,v){try{ok?localStorage.setItem(k,v):(mem[k]=v)}catch(e){mem[k]=v}}};
})();

window.dailyRefCode = function(){
  const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const today=new Date().toISOString().slice(0,10);
  if(Store.get("ms_ref_day")===today&&Store.get("ms_ref_code")) return Store.get("ms_ref_code");
  const code=Array.from({length:5},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
  Store.set("ms_ref_code",code);Store.set("ms_ref_day",today);return code;
};

window.messLink = function(fallbackRef){
  const ids=Object.keys(window.Saved?.data||{});
  if(!ids.length||!MS.links.cartApi) return msMess(fallbackRef);
  const code=dailyRefCode();
  const items=ids.map(id=>{const p=MS.products.find(x=>x.id===id);return p?{name:p.name,qty:Saved.data[id]}:null}).filter(Boolean);
  fetch(MS.links.cartApi+"/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code,items}),keepalive:true}).catch(()=>{});
  return MS.links.messengerBase+code;
};
window.openMess = fallbackRef => window.open(messLink(fallbackRef),"_blank","noopener");
window.firstImg = p => p.imgs?.nu?.[0] || p.imgs?.nam?.[0] || p.img;
window.nrm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/\s+/g," ").trim();
window.md = s => s.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/~~(.+?)~~/g,"<s>$1</s>").replace(/_(.+?)_/g,"<em>$1</em>");