window.Saved={
  KEY:"ms_saved_v1",data:{},
  init(){
    try{this.data=JSON.parse(Store.get(this.KEY)||"{}")}catch(e){this.data={}}
    const tab=document.createElement("button");tab.className="save-tab";tab.id="saveTab";tab.type="button";tab.innerHTML=`${ICON.bag2}<span>Đã lưu</span><i>0</i>`;document.body.appendChild(tab);
    const scrim=document.createElement("div");scrim.className="scrim";scrim.id="saveScrim";document.body.appendChild(scrim);
    const panel=document.createElement("aside");panel.className="save-panel";panel.id="savePanel";panel.setAttribute("aria-label","Mẫu bạn đang quan tâm");panel.innerHTML=`<div class="save-panel__top">${ICON.bag2}<div><b>Mẫu bạn đang quan tâm</b></div><button class="save-panel__x" aria-label="Đóng">&times;</button></div><div class="save-panel__list" id="saveList"></div><div class="save-panel__foot"><a class="btn btn--pri" id="saveSend" href="#">Nhắn shop về các mẫu này</a></div>`;document.body.appendChild(panel);
    tab.onclick=()=>this.open();document.getElementById("navSaved")?.addEventListener("click",()=>this.open());scrim.onclick=()=>this.close();panel.querySelector(".save-panel__x").onclick=()=>this.close();addEventListener("keydown",e=>{if(e.key==="Escape")this.close()});
    document.addEventListener("click",e=>{const t=e.target.closest("[data-save]");if(!t)return;this.add(t.dataset.save);this.open()},true);
    this.render();
  },
  add(id){if(!MS.products.some(p=>p.id===id))return;this.data[id]=(this.data[id]||0)+1;Store.set(this.KEY,JSON.stringify(this.data));this.render()},
  step(id,delta){const n=(this.data[id]||0)+delta;if(n<=0)this.drop(id);else{this.data[id]=n;Store.set(this.KEY,JSON.stringify(this.data));this.render()}},
  drop(id){delete this.data[id];Store.set(this.KEY,JSON.stringify(this.data));this.render()},
  open(){document.getElementById("savePanel")?.classList.add("is-open");document.getElementById("saveScrim")?.classList.add("is-on")},
  close(){document.getElementById("savePanel")?.classList.remove("is-open");document.getElementById("saveScrim")?.classList.remove("is-on")},
  render(){
    let changed=false;Object.keys(this.data).forEach(id=>{if(!MS.products.some(p=>p.id===id)){delete this.data[id];changed=true}});if(changed)Store.set(this.KEY,JSON.stringify(this.data));
    const ids=Object.keys(this.data),total=ids.reduce((sum,id)=>sum+this.data[id],0),tab=document.getElementById("saveTab");if(!tab)return;tab.querySelector("i").textContent=total;tab.hidden=total===0;const badge=document.querySelector("#navSaved i");if(badge){badge.textContent=total;badge.dataset.n=total}
    const list=document.getElementById("saveList");if(!ids.length)list.innerHTML=`<p class="save-empty">Chưa lưu mẫu nào.<br>Bấm nút Nhắn shop, Bảng size hoặc Chọn màu để lưu mẫu.</p>`;else{
      list.innerHTML=ids.map(id=>{const p=MS.products.find(x=>x.id===id);return `<div class="sv" data-go="${id}">${phFig(firstImg(p),p.name,"3/4")}<span><b>${p.name}</b><u>${msPrice(p.price)}</u></span><span class="sv__qty"><button data-qty="-1" data-id="${id}" aria-label="Bớt 1">−</button><b>${this.data[id]}</b><button data-qty="1" data-id="${id}" aria-label="Thêm 1">+</button></span><button class="sv__x" data-drop="${id}" aria-label="Bỏ ${p.name}">&times;</button></div>`}).join("");
      list.onclick=e=>{const q=e.target.closest("[data-qty]");if(q){e.stopPropagation();this.step(q.dataset.id,+q.dataset.qty);return}const x=e.target.closest("[data-drop]");if(x){e.stopPropagation();this.drop(x.dataset.drop);return}const g=e.target.closest("[data-go]");if(g){this.close();const id=g.dataset.go;if(document.getElementById(id))document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"});else location.href="products.html#"+id}};
    }
    const send=document.getElementById("saveSend"),ref=ids.length?"web_saved_"+ids.map(i=>i.replace(/-/g,"")).join("_").slice(0,40):"web_saved";send.onclick=()=>{openMess(ref);return false};send.textContent=ids.length>1?`Nhắn shop về ${ids.length} mẫu này`:"Nhắn shop về mẫu này";
  }
};