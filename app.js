const services=[
{id:'swedish',name:'Swedish Massage',description:'Long, flowing strokes and gentle, rhythmic pressure invite full-body relaxation. Settle in, switch off, and enjoy having all the attention.',tag:'THE CLASSIC RESET'},
{id:'deep',name:'Deep Tissue',description:'Slow, focused pressure gives tense muscles a little extra attention, always at your comfort level. A firm touch, with a soft spot for you.',tag:'LET IT ALL GO'},
{id:'aroma',name:'Aromatherapy',description:'Gentle, flowing massage paired with softly scented oils creates a calm, intimate escape. Breathe deeply. The atmosphere is doing a little flirting, too.',tag:'BREATHE IT IN'},
{id:'sport',name:'Recovery Massage',description:'Tweaked your back and won’t go to the chiropractor? We had a feeling. Gentle, comfort-focused attention for tired muscles, with a little affectionate persuasion to take it easy. Relaxation only—not injury treatment.',tag:'BACK TO YOURSELF'},
];
const extras=[['scalp','Scalp massage','A little head-in-the-clouds moment.'],['feet','Foot & hand focus','Extra care, right to your fingertips.'],['towels','Warm towels','The coziest finishing touch.'],['aroma','Aromatherapy oil','Soft lavender or fresh eucalyptus.']];
const flirty=[['candle','You & candlelight','Soft lighting, warm company, and one less reason to look at your phone. Yes, this is us setting the mood.'],['attention','A little extra attention','A little longer on your favorite spots. Just say where—mind reading is still in training.'],['slow','Take your time','Slow down. Stay close. Your to-do list can survive being the third wheel for a while.'],['closer','One last little indulgence','All happy things must come to an end.']];
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
const requestForm=$('request-form');
function todayLocal(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
$('preferred-date').min=todayLocal();
$('preferred-date').addEventListener('input',()=>{$('preferred-date').setCustomValidity('')});
requestForm.addEventListener('submit',event=>{
 const date=$('preferred-date');date.min=todayLocal();
 if(date.value<date.min){event.preventDefault();date.setCustomValidity('Please choose today or a future date.');date.reportValidity();return}
 if(!requestForm.checkValidity()){event.preventDefault();requestForm.reportValidity();return}
 $('request-massage').value=selectedService().name;
 $('request-duration').value=state.duration+' minutes';
 $('request-pressure').value=state.pressure;
 $('request-extras').value=[...extras,...flirty].filter(x=>state.extras.has(x[0])).map(x=>x[1]).join('; ')||'None';
 try{sessionStorage.setItem('allure-request-date',date.value)}catch{}
 $('request-status').textContent='Continuing to secure submission. Please complete the verification if prompted.';
});
window.addEventListener('pageshow',()=>{$('request-status').textContent='';$('preferred-date').min=todayLocal()});
render();

