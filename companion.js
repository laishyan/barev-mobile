import { icon } from './views.js';
export const wardrobeItems = [
  {id:'tidy',name:'Soft waves',category:'hair',price:50,symbol:'〰️',description:'Soft chestnut waves, swept and ready.'},
  {id:'curls',name:'Playful curls',category:'hair',price:70,symbol:'🌀',description:'Bouncy curls with a loose bun for her.'},
  {id:'basic',name:'Cozy cream',category:'clothes',price:0,symbol:'🤍',description:'A soft knit with little sage patches.'},
  {id:'jacket',name:'Coral varsity',category:'clothes',price:160,symbol:'🧥',description:'Cream sleeves, coral warmth, denim.'},
  {id:'hoodie',name:'Sage hoodie',category:'clothes',price:140,symbol:'🌿',description:'A cozy hood, drawstrings, and a pocket.'},
  {id:'hat',name:'Adventure cap',category:'accessories',price:80,symbol:'🧢',description:'Sage green with a little golden star.'},
  {id:'headphones',name:'Story headphones',category:'accessories',price:120,symbol:'🎧',description:'Cream cushions and sage ear cups.'},
  {id:'glasses',name:'Honey frames',category:'accessories',price:60,symbol:'👓',description:'Round amber frames for curious eyes.'},
  {id:'flower',name:'Apricot blossom',category:'accessories',price:40,symbol:'🌼',description:'A little flower tucked into the hair.'},
  {id:'scarf',name:'Lavender scarf',category:'accessories',price:90,symbol:'🧣',description:'A soft lavender accent for any outfit.'}
];
export function equipItem(wallet,id) {
  const item=wardrobeItems.find(item=>item.id===id);
  if(!item) return false;
  if(wallet.equipped.includes(id)) wallet.equipped=wallet.equipped.filter(value=>value!==id);
  else {
    if(item.category!=='accessories') wallet.equipped=wallet.equipped.filter(value=>wardrobeItems.find(entry=>entry.id===value)?.category!==item.category);
    wallet.equipped.push(id);
  }
  return true;
}
export const partnerName = () => 'Ani';
export const initialWallet = () => ({coins:0,gender:'female',age:'teen',owned:[],equipped:[],earned:[],history:[]});
export function readWallet() {
  const wallet = initialWallet();
  try {
    const saved = JSON.parse(localStorage.getItem('barev-companion')||'{}');
    if (Number.isSafeInteger(saved.coins)&&saved.coins>=0) wallet.coins=saved.coins;
    // The presentation has one teenage girl speaking partner.

    const ids=wardrobeItems.map(item=>item.id);
    if(Array.isArray(saved.owned)) wallet.owned=[...new Set(saved.owned.filter(id=>ids.includes(id)))];
    // Keep the chosen hair and clothes, but begin each app visit without old accessories.
    if(Array.isArray(saved.equipped)) wallet.equipped=[...new Set(saved.equipped.filter(id=>wardrobeItems.some(item=>item.id===id&&item.category!=='accessories')))];
    if(Array.isArray(saved.earned)) wallet.earned=saved.earned.filter(id=>typeof id==='string');
    if(Array.isArray(saved.history)) wallet.history=saved.history.filter(item=>typeof item.label==='string'&&Number.isSafeInteger(item.amount)).slice(0,12);
  } catch { /* Local demo starts fresh if saved data is unavailable. */ }
  return wallet;
}
export function saveWallet(wallet) { try { localStorage.setItem('barev-companion',JSON.stringify(wallet)); } catch { /* Keep the demo in memory if storage is blocked. */ } }
export function awardCoins(wallet,key,amount,label) {
  if(wallet.earned.includes(key)||!Number.isSafeInteger(amount)||amount<=0||!Number.isSafeInteger(wallet.coins+amount)) return false;
  wallet.earned.push(key); wallet.coins+=amount;
  wallet.history.unshift({label,amount}); wallet.history=wallet.history.slice(0,12); return true;
}
export function purchaseItem(wallet,id) {
  const item=wardrobeItems.find(item=>item.id===id);
  if(!item||wallet.owned.includes(id)) return 'owned';
  if(wallet.coins<item.price) return 'insufficient';
  wallet.coins-=item.price; wallet.owned.push(id); if(!wallet.equipped.includes(id)) equipItem(wallet,id);
  wallet.history.unshift({label:item.name,amount:-item.price}); wallet.history=wallet.history.slice(0,12); return 'purchased';
}
export const rewardDay = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Yerevan',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function companionArt(wallet) {
  const equipped=wallet.equipped,gender='female';
  const hair=equipped.includes('curls')?'curl':'wave';
  const body=equipped.includes('jacket')?'coral':equipped.includes('hoodie')?'sage':'basic';
  const extras=[];
  if(equipped.includes('hat')) extras.push('<g class="partner-cap"><path d="M54 60 Q53 17 101 18 Q147 19 146  sixty"/><path d="M53 57 Q101 46 150 57 L165 67 Q111 81 50 68Z"/><path d="M57 58 Q57 18 101 19 Q144 20 146 57Z" fill="url(#sage-accessory)"/><path d="m99 31 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" fill="#ffe5a6"/></g>'.replace('Q147 19 146  sixty','Q147 19 146 60'));
  if(equipped.includes('headphones')) extras.push('<g class="partner-headphones"><path d="M54 91V83 Q53 23 101 23 Q149 23 148 83V91" fill="none" stroke="url(#sage-accessory)" stroke-width="7"/><path d="M55 83v25m92-25v25" stroke="#f9ebd1" stroke-width="16" stroke-linecap="round"/><path d="M49 87v18m104-18v18" stroke="url(#sage-accessory)" stroke-width="7" stroke-linecap="round"/></g>');
  if(equipped.includes('glasses')) extras.push('<g class="partner-glasses" fill="#fff9e822" stroke="#bb8955" stroke-width="2.7"><ellipse cx="81" cy="77" rx="17" ry="13"/><ellipse cx="121" cy="77" rx="17" ry="13"/><path d="M98 76q3-4 6 0M64 75l-9-4m83 4 9-4" fill="none"/></g>');
  if(equipped.includes('flower')) extras.push('<g class="partner-flower" transform="translate(145 68)"><g fill="#f3b277" stroke="#ef9c63" stroke-width=".8"><ellipse cy="-7" rx="4" ry="8"/><ellipse cy="-7" rx="4" ry="8" transform="rotate(72)"/><ellipse cy="-7" rx="4" ry="8" transform="rotate(144)"/><ellipse cy="-7" rx="4" ry="8" transform="rotate(216)"/><ellipse cy="-7" rx="4" ry="8" transform="rotate(288)"/></g><circle r="4" fill="#ffe2a2"/></g>');
  const scarf=equipped.includes('scarf') ? '<g class="partner-scarf" fill="#b5a0d2" stroke="#9e8abf" stroke-width="1"><path d="M76 156q23 13 47 0l5 12q-26 20-58 1Z"/><path d="M111 169l11 46 17-4-14-47Z"/><path d="m123 207 13-3" stroke="#d6c6ed" stroke-width="3"/></g>' : '';
  return `<div class="companion-art partner-${gender} partner-teen partner-${hair}" role="img" aria-label="${partnerName(wallet)}, your customized 3D speaking partner: ${hair==='curl'?'curly hair':'wavy hair'}, ${body} outfit${equipped.length?', '+equipped.map(id=>wardrobeItems.find(item=>item.id===id)?.name).filter(Boolean).join(', '):''}"><div class="partner-figure"><img class="partner-body body-${body}" src="assets/partner-body-${body}${body==='basic'?'-v2':''}.png" alt=""><img class="partner-head" src="assets/partner-${gender}-${hair}.png" alt=""><svg class="partner-extras" viewBox="0 0 200 300" aria-hidden="true"><defs><linearGradient id="sage-accessory" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bdd0aa"/><stop offset=".5" stop-color="#91b184"/><stop offset="1" stop-color="#628856"/></linearGradient></defs><g class="partner-head-accessories">${extras.join('')}</g>${scarf}</svg></div></div>`;
}
export function companionMini(state) {
  return `<button class="button companion-mini" data-route="companion"><span class="companion-mini-art">${companionArt(state.wallet)}</span><span><strong>Your speaking partner</strong><small>Your look, your voice companion.</small></span><span class="mini-coins">🪙 ${state.wallet.coins}<small>Wardrobe ↗</small></span></button>`;
}
export function companion(state) {
  const wallet=state.wallet,claimed=wallet.earned.includes('daily:'+rewardDay()),invited=wallet.earned.includes('invite:demo-friend');
  return `<div class="screen companion-screen"><header class="companion-header"><button class="button" data-route="profile" aria-label="Back to Profile">←</button><span>YOUR AI SPEAKING PARTNER</span><span class="coin-wallet" aria-label="${wallet.coins} demo coins">🪙 ${wallet.coins}</span></header><h1 tabindex="-1">A little more <em>you.</em></h1><p class="companion-intro">Meet ${partnerName(wallet)}. Style the partner you’ll speak Armenian with.</p><section class="companion-stage"><span class="companion-stage-label">${partnerName(wallet).toUpperCase()} · YOUR SPEAKING PARTNER</span>${companionArt(wallet)}<span class="companion-stage-caption">The very same character you’ll meet in AI Studio.</span></section><p class="partner-identity">Ani · your teenage speaking companion</p><button class="button partner-meet" data-route="studio">Meet ${partnerName(wallet)} in AI Studio ↗</button><section class="wardrobe-section"><div class="companion-section-heading"><h2>Your little style studio</h2><span>${wallet.owned.length} / ${wardrobeItems.length} owned</span></div><p class="wardrobe-trial">Presentation dressing room · try every look freely. Coins let you collect favorites.</p>${['hair','clothes','accessories'].map(category=>`<h3 class="wardrobe-category">${{hair:'Hair with personality',clothes:'Something cozy to wear',accessories:'The finishing touches'}[category]}</h3><div class="wardrobe-grid">${wardrobeItems.filter(item=>item.category===category).map(item=>{const owned=wallet.owned.includes(item.id),equipped=wallet.equipped.includes(item.id);return `<div class="wardrobe-item"><span aria-hidden="true">${item.symbol}</span><strong>${item.name}</strong><p>${item.description}</p><button class="button ${equipped?'equipped':''}" data-equip-item="${item.id}" aria-pressed="${equipped}">${equipped?'Wearing ✓':'Try it on'}</button>${owned?'<small class="wardrobe-owned">In your collection ✓</small>':`<button class="button wardrobe-buy" data-buy-item="${item.id}" ${wallet.coins<item.price?'disabled':''}>${item.price?'🪙 '+item.price+' · Collect':'Collect free'}</button>`}</div>`}).join('')}</div>`).join('')}</section><section class="coin-earn-section"><h2>Little wins, lovely rewards</h2><div class="coin-earn-row"><span>🗣️</span><div><strong>Complete a lesson</strong><p>30 coins for each different demo lesson.</p></div><button class="button" data-action="companion-lesson">+30 ↗</button></div><div class="coin-earn-row"><span>🌞</span><div><strong>Your daily little challenge</strong><p>Say thank you in Armenian.</p></div><button class="button" data-action="daily-challenge" ${claimed?'disabled':''}>${claimed?'Done ✓':'+20 ↗'}</button></div>${state.dailyChallengeOpen&&!claimed?'<div class="daily-coin-challenge"><strong lang="hy">Շնորհակալություն։</strong><span>Shnorhakalutyun. · Thank you.</span><p>Try the phrase aloud, then mark your practice complete.</p><button class="button" data-action="claim-daily">I practiced · collect 20 coins</button></div>':''}<div class="coin-earn-row"><span>💌</span><div><strong>Bring a friend along</strong><p>50 coins when a new friend joins.</p></div><button class="button" data-action="invite-preview" ${invited?'disabled':''}>${invited?'Done ✓':'+50 ↗'}</button></div>${state.inviteOpen&&!invited?'<div class="daily-coin-challenge"><strong>Your invitation preview</strong><span>BAREV-FRIEND · sample code</span><p>Try the reward flow without sending an invitation.</p><button class="button" data-action="claim-invite">Simulate a friend joining · +50</button></div>':''}<p class="coin-demo-disclosure">Presentation economy · lessons are self-marked, daily rewards are once per day, and invitations are simulated. No real referrals or payments.</p></section>${wallet.history.length?`<section class="coin-history"><h2>Your little wins</h2>${wallet.history.map(item=>`<div><span>${escape(item.label)}</span><strong class="${item.amount<0?'spent':''}">${item.amount>0?'+':''}${item.amount} 🪙</strong></div>`).join('')}</section>`:''}<p class="companion-local-note">Coins and outfits save on this device.</p></div>`;
}
