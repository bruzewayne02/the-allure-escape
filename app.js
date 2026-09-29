const services=[
{id:'swedish',name:'Swedish Massage',description:'Long, flowing strokes. A full-body invitation to switch off.',tag:'THE CLASSIC RESET'},
{id:'deep',name:'Deep Tissue',description:'Focused, firmer work for the tension you’ve been carrying.',tag:'LET IT ALL GO'},
{id:'stone',name:'Hot Stone Ritual',description:'Warm stones and slow massage for a little extra comfort.',tag:'WARMTH, EVERYWHERE'},
{id:'aroma',name:'Aromatherapy',description:'Gentle massage paired with a scent that sets the mood.',tag:'BREATHE IT IN'},
{id:'sport',name:'Recovery Massage',description:'Targeted attention for hardworking shoulders, legs and back.',tag:'BACK TO YOURSELF'},
{id:'couples',name:'Together, Unwind',description:'A side-by-side massage experience for your favorite plus-one.',tag:'BETTER WITH TWO'}];
const extras=[['scalp','Scalp massage','A little head-in-the-clouds moment.'],['feet','Foot & hand focus','Extra care, right to your fingertips.'],['towels','Warm towels','The coziest finishing touch.'],['aroma','Aromatherapy oil','Soft lavender or fresh eucalyptus.']];
const flirty=[['candle','You & candlelight','Soft light. Very good company.'],['attention','A little extra attention','Shoulders, neck… wherever you ask.'],['slow','Take your time','An unhurried pace. Nowhere else to be.'],['closer','One last little indulgence','All happy things must come to an end.']];
let state={step:0,service:'swedish',duration:60,pressure:'Medium',extras:new Set()};
const $=id=>document.getElementById(id);const selectedService=()=>services.find(s=>s.id===state.service);
function optionMarkup(x){return `<button class="extra ${state.extras.has(x[0])?'selected':''}" data-extra="${x[0]}" aria-pressed="${state.extras.has(x[0])}"><i aria-hidden="true">${state.extras.has(x[0])?'✓':'＋'}</i><span><strong>${x[1]}</strong><small>${x[2]}</small></span></button>`}
function render(){
$('services').innerHTML=services.map((s,i)=>`<button class="service ${state.service===s.id?'selected':''}" data-service="${s.id}" aria-pressed="${state.service===s.id}"><span class="number">0${i+1}</span><span class="check" aria-hidden="true">${state.service===s.id?'✓':''}</span><h3>${s.name}</h3><p>${s.description}</p><span class="tag">${s.tag}</span></button>`).join('');
$('durations').innerHTML=[30,60,90].map(n=>`<button data-duration="${n}" class="${state.duration===n?'selected':''}" aria-pressed="${state.duration===n}">${n} minutes</button>`).join('');
$('pressures').innerHTML=['Light','Medium','Firm'].map(n=>`<button data-pressure="${n}" class="${state.pressure===n?'selected':''}" aria-pressed="${state.pressure===n}">${n}</button>`).join('');
$('extras').innerHTML=extras.map(optionMarkup).join('');$('flirty').innerHTML=flirty.map(optionMarkup).join('');
const s=selectedService(),chosen=[...extras,...flirty].filter(x=>state.extras.has(x[0]));
$('summary-name').textContent=s.name;$('summary-description').textContent=s.tag.toLowerCase();$('summary-duration').textContent=state.duration+' minutes';$('summary-pressure').textContent=state.pressure;$('summary-extras').textContent=chosen.length?chosen.length+' selected':'Keep it simple';$('summary-tags').innerHTML=chosen.map(x=>`<span>${x[1]}</span>`).join('');
for(let i=0;i<3;i++)$('step'+i).hidden=i!==state.step;
document.querySelectorAll('[data-step]').forEach(b=>{b.classList.toggle('active',+b.dataset.step===state.step);if(+b.dataset.step===state.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
$('back').hidden=state.step===0;$('next').hidden=state.step===2;$('next').innerHTML=state.step===0?'Make it yours <span>＋</span>':'See my ritual <span>＋</span>';
if(state.step===2){$('review').innerHTML=`<p class="eyebrow">THE ALLURE ESCAPE · YOUR PERSONAL RITUAL</p><p class="hero-name">${s.name}</p><p class="helper">${s.description}</p><dl><div><dt>Duration</dt><dd>${state.duration} minutes</dd></div><div><dt>Pressure</dt><dd>${state.pressure}</dd></div></dl>${chosen.length?'<ul>'+chosen.map(x=>`<li>✧ &nbsp; ${x[1]}</li>`).join('')+'</ul>':'<p class="helper">Beautifully simple. Just the massage.</p>'}`}
}
function go(step){state.step=step;render();document.querySelector('.steps').scrollIntoView({behavior:'smooth',block:'start'})}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.service){state.service=b.dataset.service;render()}if(b.dataset.duration){state.duration=+b.dataset.duration;render()}if(b.dataset.pressure){state.pressure=b.dataset.pressure;render()}if(b.dataset.extra){state.extras.has(b.dataset.extra)?state.extras.delete(b.dataset.extra):state.extras.add(b.dataset.extra);render()}if(b.dataset.step!==undefined)go(+b.dataset.step)});
$('next').onclick=()=>go(Math.min(2,state.step+1));$('back').onclick=()=>go(Math.max(0,state.step-1));$('reset').onclick=()=>{state={step:0,service:'swedish',duration:60,pressure:'Medium',extras:new Set()};$('copy-status').textContent='';go(0)};
$('copy').onclick=async()=>{const chosen=[...extras,...flirty].filter(x=>state.extras.has(x[0])).map(x=>x[1]);const txt=`My Allure Escape ritual\n${selectedService().name}\n${state.duration} minutes · ${state.pressure} pressure\n${chosen.length?'Finishing touches: '+chosen.join(', '):'Just the massage. Perfectly simple.'}`;try{await navigator.clipboard.writeText(txt);$('copy-status').textContent='Copied. Send it to your favorite person.'}catch{$('copy-status').textContent='Select and copy your ritual below.';const t=document.createElement('textarea');t.value=txt;t.style.width='100%';t.rows=6;$('copy-status').appendChild(t);t.select()}};
render();
