/* Espaço de Eventos JM · dados da demonstração (fica só neste navegador) */
window.JM=(function(){
 const K={reqs:'jm_reqs',block:'jm_block',mine:'jm_mine',me:'jm_me'};
 const get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
 let bc=null;try{bc=new BroadcastChannel('jm')}catch(e){}
 const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}try{bc&&bc.postMessage(k)}catch(e){}};
 const on=fn=>{addEventListener('storage',e=>{if(!e.key||e.key.startsWith('jm_'))fn()});bc&&bc.addEventListener('message',()=>fn())};
 const pad=n=>String(n).padStart(2,'0');
 const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
 const today=()=>{const p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo'}).format(new Date());return p};
 const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const fmt=s=>{const [y,m,d]=s.split('-').map(Number);return cap(new Date(y,m-1,d).toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}))};
 const month=(y,m)=>cap(new Date(y,m,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}));
 const short=s=>{const [y,m,d]=s.split('-');return d+'/'+m};
 /* datas de exemplo já ocupadas (fins de semana), pra agenda não começar vazia */
 const demo=s=>{const [y,m,d]=s.split('-').map(Number);const dw=new Date(y,m-1,d).getDay();if(dw!==6&&dw!==0&&dw!==5)return false;let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h%100<(dw===6?38:dw===0?22:14)};
 const ACTIVE=['novo','orcado','sinal','confirmado'];
 function dayState(s){const r=get(K.reqs,[]).filter(x=>x.date===s&&ACTIVE.includes(x.status));
  if(get(K.block,[]).includes(s)||r.some(x=>x.status==='sinal'||x.status==='confirmado'))return 'res';
  if(demo(s))return 'res';
  if(r.length)return 'pre';return 'livre'}
 const brl=v=>'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const ST={novo:'Pedido recebido',orcado:'Orçamento enviado',sinal:'Sinal recebido',confirmado:'Confirmado',recusado:'Data indisponível'};
 return{cap,month,K,get,set,on,iso,today,fmt,short,demo,dayState,brl,esc,ST,ACTIVE,pad,WA:'5538984177312'}
})();
