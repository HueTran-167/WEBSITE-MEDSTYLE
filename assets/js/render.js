const NAVLINKS=[
  {href:"index.html",label:"Trang chủ"},
  {href:"products.html",label:"Sản phẩm & Dịch vụ"},
  {href:"about.html",label:"Về MedStyle"},
  {href:"b2b.html",label:"Đồng phục doanh nghiệp"}
];

function logoMark(extra){return `<a href="index.html" class="logo ${extra||""}" aria-label="${MS.brand.name} — trang chủ"><b>${MS.brand.name}</b><i>${MS.brand.tagline}</i></a>`}

function buildHeader(){
  const mount=document.getElementById("site-header");if(!mount)return;
  const here=location.pathname.split("/").pop()||"index.html";
  mount.outerHTML=`<header class="topbar" id="topbar"><div class="topbar__in">
    <nav class="navpill" aria-label="Điều hướng chính">${NAVLINKS.map((l,i)=>`<a href="${l.href}"${l.href===here?' aria-current="page"':""}>${i===0?ICON.home:""}${l.label}</a>`).join("")}</nav>
    <nav class="nav" id="nav">${NAVLINKS.map(l=>`<a href="${l.href}"${l.href===here?' aria-current="page"':""}>${l.label}</a>`).join("")}</nav>
    <div class="topbar__act"><button class="icobtn" id="navSaved" aria-label="Mẫu đã lưu">${ICON.bag2}<i data-n="0"></i></button><a class="icobtn" href="tel:${MS.brand.phoneRaw}" aria-label="Gọi ${MS.brand.phone}">${ICON.phone}</a><a class="icobtn icobtn--mess" href="#" onclick="openMess('web_nav');return false" aria-label="Nhắn tin Messenger">${ICON.mess}</a><button class="burger" id="burger" aria-label="Mở menu" aria-expanded="false">${ICON.burger}</button></div>
  </div></header>`;
  const bar=document.getElementById("topbar"),nav=document.getElementById("nav"),burger=document.getElementById("burger");
  burger.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");burger.setAttribute("aria-expanded",open)});
  nav.addEventListener("click",e=>{if(e.target.tagName==="A")nav.classList.remove("is-open")});
  addEventListener("scroll",()=>bar.classList.toggle("is-stuck",scrollY>12),{passive:true});
}

function buildFooter(){
  const mount=document.getElementById("site-footer");if(!mount)return;
  const social=[
    MS.links.facebook&&`<a href="${MS.links.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>`,
    MS.links.shopee&&`<a href="${MS.links.shopee}" target="_blank" rel="noopener" aria-label="Shopee">${ICON.bag}</a>`,
    MS.links.tiktok&&`<a href="${MS.links.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>`,
    `<a href="#" onclick="openMess('web_footer');return false" aria-label="Messenger">${ICON.mess}</a>`,
    `<a href="tel:${MS.brand.phoneRaw}" aria-label="Gọi điện">${ICON.phone}</a>`
  ].filter(Boolean).join("");
  const map=MS.links.mapsEmbed?`<div class="foot__map"><iframe src="${MS.links.mapsEmbed}" loading="lazy" title="Bản đồ đến MedStyle"></iframe></div>`:`<div class="ph ph--bare" style="--ar:16/9;border-radius:10px" data-label="Dán link Google Maps vào content.js"></div>`;
  mount.outerHTML=`<footer class="foot"><div class="wrap foot__grid"><div>${logoMark()}<p style="margin-top:18px;max-width:30ch">Đồng phục y tế cho người đi trực, đi học và đi làm trong ngành y. Cotton lạnh, co giãn 4 chiều, may theo số đo nếu bạn cần.</p><div class="foot__soc">${social}</div></div><div><h4>Sản phẩm</h4><ul>${MS.products.map(p=>`<li><a href="products.html#${p.id}">${p.name}</a></li>`).join("")}</ul></div><div><h4>Thông tin</h4><ul>${NAVLINKS.slice(1).map(l=>`<li><a href="${l.href}">${l.label}</a></li>`).join("")}<li><a href="products.html#size">Bảng size</a></li><li><a href="products.html#dichvu">Thêu tên & cầu vai</a></li><li><a href="index.html#faq">Câu hỏi thường gặp</a></li></ul></div><div><h4>Ghé shop</h4><p style="margin-bottom:10px">${MS.brand.address}</p><p style="margin-bottom:6px"><a href="tel:${MS.brand.phoneRaw}"><strong>${MS.brand.phone}</strong></a> · ${MS.brand.contactName}</p><p style="margin-bottom:16px">${MS.brand.hours}</p>${map}</div></div><div class="wrap foot__base"><span>© ${new Date().getFullYear()} ${MS.brand.name} · ${MS.brand.domain}</span><span>Đổi size trong 7 ngày · Giao toàn quốc</span></div></footer>`;
}

function buildDock(){
  const d=document.createElement("div");d.className="dock";d.innerHTML=`<button class="dock__btn" id="botOpen" aria-label="Mở trợ lý MedStyle">${ICON.chat}</button><a class="dock__btn dock__btn--mess" href="#" onclick="openMess('web_dock');return false" aria-label="Nhắn Messenger">${ICON.mess}</a><a class="dock__btn dock__btn--call" href="tel:${MS.brand.phoneRaw}" aria-label="Gọi ${MS.brand.phone}">${ICON.phone}</a>`;document.body.appendChild(d);
}

function renderTape(){const el=one("tape");if(!el)return;const words=["Cotton lạnh","Co giãn 4 chiều","Hạn chế nhăn nhàu","Thoáng khí","Hơn 200 màu scrubs","Size XS đến 3XL","Thêu tên · Cầu vai · May đo","Giao toàn quốc"];const run=words.map(w=>`<span>${w}</span>`).join("");el.innerHTML=`<div class="tape__run">${run}${run}</div>`}

function heroMarkup(page,list,cats){
  const vid=MS.links.lookbookVideo;
  return `<div class="hero__bg">${list.map((b,i)=>`<div class="hero__img${i===0?" is-on":""}">${heroFig(b)}</div>`).join("")}</div><div class="hero__in"><a class="hero__logo" href="index.html"><b>${MS.brand.name}</b><i>${MS.brand.tagline}</i></a><div class="hero__slides">${list.map((b,i)=>`<div class="hero__slide${i===0?" is-on":""}"><div class="hs"><div class="hs__copy">${b.eyebrow?`<p class="hs__eye">${b.eyebrow}</p>`:""}<h2>${b.title} <em>${b.script||""}</em></h2>${b.sub?`<p class="hs__sub">${b.sub}</p>`:""}<div class="hs__cta">${b.cta?`<a class="btn btn--lift" href="${b.cta.href}">${b.cta.label} ${ICON.arrow}</a>`:""}<a class="hs__play" href="${vid||"#"}" ${vid?'target="_blank" rel="noopener"':"hidden"}><span>${ICON.play}</span><em style="font-style:normal"><b>Xem lookbook</b><small>Video ngắn</small></em></a></div></div></div></div>`).join("")}</div>${list.length>1?`<div class="hero__dots">${list.map((_,i)=>`<button class="${i===0?"is-on":""}" aria-label="Ảnh ${i+1}"></button>`).join("")}</div>`:""}${cats?`<div class="hero__cats" id="danhmuc"><div class="cathead"><h2>Chọn theo nghề</h2><span class="rule"></span><a href="#lookbook" data-ms="catreset">Xem tất cả</a></div><div class="cats" data-ms="cats"></div></div>`:""}</div>${list.length>1?`<button class="hero__arrow hero__arrow--prev" aria-label="Ảnh trước">${ICON.chevL}</button><button class="hero__arrow hero__arrow--next" aria-label="Ảnh sau">${ICON.chevR}</button><div class="hero__bar"><i></i></div>`:""}`;
}

function renderHero(){
  document.querySelectorAll("[data-hero]").forEach(box=>{
    const list=MS.banners?.[box.dataset.hero]||[];if(!list.length){box.remove();return}
    box.classList.add("hero");box.innerHTML=heroMarkup(box.dataset.hero,list,box.hasAttribute("data-cats"));
    if(list.length<2)return;
    const imgs=[...box.querySelectorAll(".hero__img")],slides=[...box.querySelectorAll(".hero__slide")],dots=[...box.querySelectorAll(".hero__dots button")];let i=0,timer;
    const show=n=>{imgs[i].classList.remove("is-on");slides[i].classList.remove("is-on");dots[i].classList.remove("is-on");i=(n+slides.length)%slides.length;imgs[i].classList.add("is-on");slides[i].classList.add("is-on");dots[i].classList.add("is-on");box.classList.remove("is-run");void box.offsetWidth;box.classList.add("is-run")};
    const play=()=>{clearInterval(timer);timer=setInterval(()=>show(i+1),5000);box.classList.remove("is-run");void box.offsetWidth;box.classList.add("is-run")};
    const jump=n=>{show(n);play()};box.querySelector(".hero__arrow--prev").onclick=()=>jump(i-1);box.querySelector(".hero__arrow--next").onclick=()=>jump(i+1);dots.forEach((d,n)=>d.onclick=()=>jump(n));let x0=null;box.addEventListener("touchstart",e=>x0=e.touches[0].clientX,{passive:true});box.addEventListener("touchend",e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>45)jump(i+(d<0?1:-1));x0=null});play();
  });
}

function genderShotsHTML(p,ar){
  const nu=p.imgs?.nu||[],nam=p.imgs?.nam||[],n=Math.max(nu.length,nam.length),frames=[];
  for(let k=0;k<n;k++){if(nu[k])frames.push({g:"nu",k,f:nu[k]});if(nam[k])frames.push({g:"nam",k,f:nam[k]})}
  if(!frames.length)return phFig(p.img,`${p.img} · 900×1200`,ar);
  return `<div class="shots gshots" data-shots data-mode="" data-n="${frames.length}">${frames.map((s,i)=>`<div class="shots__f${i===0?" is-on":""}" data-g="${s.g}" data-k="${s.k}">${phFig(s.f,`${s.f} · 900×1200`,ar)}</div>`).join("")}<div class="shots__dots" hidden></div><div class="gpill" onclick="event.stopPropagation()"><button type="button" data-g="nu">Nữ</button><button type="button" data-g="nam">Nam</button></div></div>`;
}

function initShots(root=document){
  root.querySelectorAll("[data-shots]").forEach(box=>{
    const allFrames=()=>[...box.querySelectorAll(".shots__f")],dotsBox=box.querySelector(".shots__dots"),pill=box.querySelector(".gpill");let i=0,timer=null;
    const active=()=>{const mode=box.dataset.mode,fr=allFrames();return mode?fr.filter(f=>f.dataset.g===mode):fr};
    const paint=()=>{const fr=allFrames(),on=active();if(i>=on.length)i=0;fr.forEach(f=>f.classList.toggle("is-on",f===on[i]));if(dotsBox){if(box.dataset.mode){dotsBox.hidden=on.length<2;dotsBox.innerHTML=on.map((_,n)=>`<i class="${n===i?"is-on":""}"></i>`).join("")}else dotsBox.hidden=true}};
    const step=()=>{const on=active();if(on.length<2)return;i=(i+1)%on.length;paint()};
    if(pill)pill.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();box.dataset.mode=btn.dataset.g;pill.querySelectorAll("button").forEach(b=>b.classList.toggle("is-on",b===btn));i=0;paint()}));
    paint();const card=box.closest(".card,.prow__media")||box;const run=ms=>{clearInterval(timer);timer=setInterval(step,ms)};run(3200);card.addEventListener("mouseenter",()=>run(1300));card.addEventListener("mouseleave",()=>run(3200));
  });
}

function cardHTML(p){
  const off=p.priceOld?Math.round((1-p.price/p.priceOld)*100):0,sale=off>0;
  return `<article class="card" data-for="${p.forWho.join(" ")}" data-id="${p.id}"><div class="card__media">${p.badge?`<span class="card__badge${sale?" card__badge--sale":""}">${p.badge}</span>`:""}${genderShotsHTML(p,"3/4")}<div class="card__over"><p>${p.short}</p><span class="card__go">Chi tiết ${ICON.arrow}</span></div><a class="card__hit" href="products.html#${p.id}" aria-label="${p.name} — xem chi tiết"></a></div><div class="card__body"><span class="card__kind">${p.kind}</span><h3 class="card__name">${p.name}</h3><p class="card__claim">${p.claim}</p><div class="card__price"><b>${msPrice(p.price)}</b>${sale?`<s>${msPrice(p.priceOld)}</s><i>−${off}%</i>`:""}</div></div></article>`;
}
function renderProducts(){const grid=one("pgrid");if(!grid)return;grid.innerHTML=MS.products.map(cardHTML).join("")}

function renderCategories(){
  document.querySelectorAll('[data-ms="cats"]').forEach(box=>{
    box.innerHTML=MS.categories.map(c=>`<button class="cat" type="button" data-k="${c.key}">${phFig(c.img,`${c.img} · 900×1200`,"3/4")}<span class="cat__cap"><b>${c.label}</b><small>${c.sub}</small><u>Xem mẫu ${ICON.arrow}</u></span></button>`).join("");
    const grid=document.querySelector('[data-ms="pgrid"]');
    const apply=k=>{box.querySelectorAll(".cat").forEach(c=>c.classList.toggle("is-on",c.dataset.k===k));if(grid){grid.querySelectorAll(".card").forEach(c=>c.style.display=!k||c.dataset.for.split(" ").includes(k)?"":"none");const n=[...grid.querySelectorAll(".card")].filter(c=>c.style.display!=="none").length;const label=one("catcount");if(label)label.textContent=k?`${n} mẫu`:`${MS.products.length} mẫu`}};
    box.addEventListener("click",e=>{const b=e.target.closest(".cat");if(!b)return;const same=b.classList.contains("is-on"),k=same?null:b.dataset.k;apply(k);if(same)return;if(grid)document.querySelector("#lookbook")?.scrollIntoView({behavior:"smooth",block:"start"});else{const p=MS.products.find(x=>x.forWho.includes(k));if(p)location.href=`products.html#${p.id}`}});
    const reset=document.querySelector('[data-ms="catreset"]');if(reset)reset.addEventListener("click",e=>{e.preventDefault();apply(null)});apply(null);
  });
}

function renderCustom(){document.querySelectorAll('[data-ms="custom"]').forEach(buildCustom)}
function buildCustom(box){
  box.classList.add("cst");box.innerHTML=`<div class="cst__stage"><div class="cst__base">${phFig(MS.customBase,`${MS.customBase} · ảnh toàn cảnh`,null)}</div>${MS.services.map((s,i)=>`<div class="cst__layer" data-i="${i}">${phFig(s.img,`${s.img} · ${s.name}`,null)}</div>`).join("")}</div><div class="cst__list">${MS.services.map((s,i)=>`<button class="cst__row" data-i="${i}" type="button"><span><b>${s.name}</b><small>${s.note}</small></span><em class="${s.free?"is-free":""}">${s.price}</em></button>`).join("")}</div>`;
  const stage=box.querySelector(".cst__stage"),base=box.querySelector(".cst__base"),layers=[...box.querySelectorAll(".cst__layer")],rows=[...box.querySelectorAll(".cst__row")];
  const zoomTo=i=>{const svc=MS.services[i];if(svc.zoom===false)stage.classList.remove("is-zoom");else{const[x,y]=svc.spot;base.style.transformOrigin=`${x}% ${y}%`;base.style.setProperty("--zoom",svc.scale||1.7);stage.classList.add("is-zoom")}layers.forEach(l=>l.classList.toggle("is-on",+l.dataset.i===i));rows.forEach(r=>r.classList.toggle("is-on",+r.dataset.i===i))};
  rows.forEach(r=>{const i=+r.dataset.i;r.addEventListener("mouseenter",()=>zoomTo(i));r.addEventListener("focus",()=>zoomTo(i));r.addEventListener("click",()=>{zoomTo(i);stage.scrollIntoView({behavior:"smooth",block:"center"})})});
}

function initCounters(){
  const els=document.querySelectorAll("[data-to]");if(!els.length)return;
  const run=el=>{if(el.dataset.done)return;el.dataset.done="1";const to=+el.dataset.to,sfx=el.dataset.suffix||"";if(matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=to.toLocaleString("vi-VN")+sfx;return}const t0=performance.now(),D=2000;const tick=now=>{const k=Math.min((now-t0)/D,1),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e).toLocaleString("vi-VN")+sfx;if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)};
  const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){run(x.target);io.unobserve(x.target)}}),{threshold:.4});els.forEach(e=>io.observe(e));
}

function renderBlocks(){
  fill("stats",MS.stats.map(s=>`<div><b data-to="${s.to}" data-suffix="${s.suffix}">0${s.suffix}</b><p>${s.label}</p></div>`).join(""));
  fill("pol",MS.policies.map(p=>`<div class="pol__i"><b>${p.t}</b><p>${p.d}</p></div>`).join(""));
  fill("promo",MS.promos.map(p=>`<div class="promo__i"><time>${p.period}</time><h3>${p.title}</h3><ul>${p.lines.map(l=>`<li>${l}</li>`).join("")}</ul><small>${p.who}</small></div>`).join(""));
  fill("partners",MS.partners.map(p=>`<li>${p}</li>`).join(""));
  fill("faq-list",MS.faq.map((f,i)=>`<details${i===0?" open":""}><summary>${f.q}</summary><p>${f.a}</p></details>`).join(""));
  const fb=one("fb");if(fb)fb.innerHTML=MS.testimonials.map((t,i)=>`<button class="fb__i" type="button" aria-label="Xem ảnh lớn ${i+1}">${phFig(t.img,`${t.img} · ảnh khách mặc`,"4/5")}</button>`).join("");
  renderCustom();initCounters();
}

function renderProductRows(){
  const wrap=one("prows");if(!wrap)return;
  wrap.innerHTML=MS.products.map(p=>`<article class="prow" id="${p.id}"><div class="prow__media">${genderShotsHTML(p,"3/4")}</div><div><span class="prow__who">${p.forWhoText}</span><h3>${p.name}</h3><p class="lede" style="font-size:15.5px">${p.short}</p><div class="prow__price"><b>${msPrice(p.price)}</b>${p.priceOld?`<s>${msPrice(p.priceOld)}</s><em class="is-sale">Giảm ${Math.round((1-p.price/p.priceOld)*100)}%</em>`:p.badge?`<em>${p.badge}</em>`:""}</div>${p.note?`<p class="prow__note">${p.note}</p>`:""}<ul>${p.features.map(f=>`<li>${f}</li>`).join("")}</ul><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--pri" data-save="${p.id}" href="#" onclick="openMess('web_sp_${p.id.replace(/-/g,"_")}');return false">Nhắn shop ${ICON.arrow}</a><a class="btn btn--ghost" data-save="${p.id}" href="#size">Bảng size</a>${p.kind==="Scrubs"?`<button class="prow__colorbtn" type="button" data-save="${p.id}" data-goto-colors="${p.id}"><i></i>Chọn màu</button>`:""}</div></div></article>`).join("");
  renderSizeTable();
}

function renderSizeTable(){
  const st=one("sizeTable");if(!st||!MS.sizeGroups)return;const groups=MS.sizeGroups;let curGroup=0,curGender="nu";
  const table=(t,gender)=>t?`<div class="sztable ${gender==="nu"?"is-nu":"is-nam"}"><div class="szgender"><button type="button" data-gd="nu" class="${gender==="nu"?"is-on":""}">Nữ</button><button type="button" data-gd="nam" class="${gender==="nam"?"is-on":""}">Nam</button></div><div class="tbl-wrap"><table class="tbl"><thead><tr>${t.cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>${t.note?`<p class="lede" style="margin-top:14px;font-size:13px">⚠ ${t.note}</p>`:""}`:"";
  const paint=()=>{const g=groups[curGroup],gender=g[curGender]?curGender:g.nu?"nu":"nam";curGender=gender;st.querySelectorAll("[data-gk]").forEach(b=>b.classList.toggle("is-on",+b.dataset.gk===curGroup));st.querySelector("[data-size-table]").innerHTML=table(g[gender],gender);st.querySelectorAll("[data-gd]").forEach(b=>b.disabled=!g[b.dataset.gd])};
  st.innerHTML=`<div class="szpick__grp">${groups.map((g,i)=>`<button type="button" data-gk="${i}">${g.label}</button>`).join("")}</div><div data-size-table></div>`;st.addEventListener("click",e=>{const gk=e.target.closest("[data-gk]"),gd=e.target.closest("[data-gd]");if(gk)curGroup=+gk.dataset.gk;if(gd)curGender=gd.dataset.gd;if(gk||gd)paint()});paint();
}

let msColorReturn=null;
function renderSwatch(){
  const hotBox=one("swatch-hot"),box=one("swatch");if(!box||!MS.scrubsColors)return;const hot=MS.scrubsHotColors||[],hotHex=new Set(hot.map(c=>c.hex)),rest=MS.scrubsColors.filter(hex=>!hotHex.has(hex));if(hotBox)hotBox.innerHTML=hot.map(c=>`<button class="swatch-hot__i" type="button" data-hex="${c.hex}"><span style="background:${c.hex}"></span><b>${c.name}</b><small>Bán chạy</small></button>`).join("");box.innerHTML=rest.map((hex,i)=>`<button class="swatch__i" type="button" style="background:${hex}" data-n="${i+1}" data-hex="${hex}" aria-label="Màu số ${i+1}"></button>`).join("");
  const select=e=>{const b=e.target.closest(".swatch__i,.swatch-hot__i");if(!b)return;document.querySelectorAll(".swatch__i.is-on,.swatch-hot__i.is-on").forEach(x=>x.classList.remove("is-on"));b.classList.add("is-on");if(msColorReturn)document.getElementById(msColorReturn)?.scrollIntoView({behavior:"smooth",block:"center"})};box.addEventListener("click",select);hotBox?.addEventListener("click",select);
}
function initColorNav(){document.addEventListener("click",e=>{const btn=e.target.closest("[data-goto-colors]");if(!btn)return;msColorReturn=btn.dataset.gotoColors;document.getElementById("bang-mau")?.scrollIntoView({behavior:"smooth",block:"start"})})}

function initLightbox(){
  const box=document.createElement("div");box.className="lightbox";box.innerHTML=`<button class="lightbox__x" aria-label="Đóng">&times;</button><img alt="">`;document.body.appendChild(box);const img=box.querySelector("img"),close=()=>box.classList.remove("is-on");box.querySelector(".lightbox__x").addEventListener("click",close);box.addEventListener("click",e=>{if(e.target===box)close()});addEventListener("keydown",e=>{if(e.key==="Escape")close()});document.addEventListener("click",e=>{const b=e.target.closest(".fb__i");if(!b)return;const real=b.querySelector("img");img.src=real?.currentSrc||real?.src||"";img.alt=real?.alt||"";box.classList.add("is-on")});
}
function initReveal(){const els=document.querySelectorAll(".rv");if(!els.length)return;if(!("IntersectionObserver"in window)){els.forEach(e=>e.classList.add("is-in"));return}const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.08});els.forEach(e=>io.observe(e))}
function initSwirl(){const els=document.querySelectorAll(".zoom__circle");if(!els.length||!("IntersectionObserver"in window))return;const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target)}}),{threshold:.2});els.forEach(e=>io.observe(e))}

function bindPageButtons(){
  const bindings={closerMess:"web_closer",promoJoin:"web_promo_join",pMess:"web_sp_callout",aMess:"web_about",bMess:"web_b2b",bMess2:"web_b2b",bMess3:"web_b2b",bMess4:"web_b2b"};Object.entries(bindings).forEach(([id,ref])=>{const el=document.getElementById(id);if(el)el.onclick=()=>{openMess(ref);return false}});["aCall","bCall","bCall2"].forEach(id=>{const el=document.getElementById(id);if(el)el.href="tel:"+MS.brand.phoneRaw});const mail=document.getElementById("bMail");if(mail)mail.innerHTML=`<a href="mailto:${MS.brand.email}" style="color:#fff;text-decoration:underline">${MS.brand.email}</a>`;
}