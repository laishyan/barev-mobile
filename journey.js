/* Place facts are linked to Armenia Travel and UNESCO. Practice phrases and
   kitchen recipes are authored samples, not claims about local dialects. */
const travel = 'https://armenia.travel/articles/the-perfect-7-day-itinerary-for-first-time-visitors/';
export const places = [
  { id:'yerevan', name:'Yerevan', hy:'Երևան', x:100, y:475, status:'completed', region:'The pink city', color:'#f29998',
    intro:'Café conversations, pink-stone streets, and a staircase full of art. Your adventure starts here.',
    culture:'The Cascade brings together gardens, fountains, sculpture, and views across the city. Turn a café stop into a chance to practice a friendly order.',
    sights:['The Cascade & Cafesjian Center for the Arts','Republic Square','Vernissage craft market'],
    phrase:['Մի սուրճ, խնդրում եմ։','Mi surch, khndrum em.','One coffee, please.'],
    task:'Order a coffee near the Cascade', dish:'Lavash & herb wraps', ingredients:'Lavash, fresh parsley and dill, cucumber, soft cheese.', recipe:['Wash and chop the herbs and cucumber.','Spread cheese on a sheet of lavash and add the herbs and cucumber.','Roll tightly, cut in half, and serve fresh.'], source:travel },
  { id:'garni', name:'Garni', hy:'Գառնի', x:192, y:535, status:'current', region:'Temple trails & warm lavash', color:'#ffc76f',
    intro:'Follow the stone columns to the gorge, then let the smell of freshly baked lavash lead the way.',
    culture:'Garni’s colonnaded temple overlooks the Azat Gorge. Nearby, the Symphony of Stones is a natural formation of basalt columns. Lavash baking is a living Armenian tradition you can encounter in Garni.',
    sights:['Garni Temple','Symphony of Stones','Azat Gorge'],
    phrase:['Հացը շատ համեղ է։','Hatsə shat hamegh e.','The bread is very delicious.'],
    task:'Thank your host for the fresh bread', dish:'Lavash, a kitchen version', ingredients:'250 g plain flour, 150 ml water, ½ tsp salt; extra flour for rolling.', recipe:['Mix flour, water, and salt into a soft dough. Knead until smooth, then cover and rest for 30 minutes.','Divide into 6 pieces and roll each very thinly on a floured surface.','Cook in a hot dry skillet, turning when brown spots appear. Stack under a clean towel to keep soft.'], source:travel },
  { id:'geghard', name:'Geghard', hy:'Գեղարդ', x:275, y:475, status:'future', region:'Stories carved in stone', color:'#baa2da',
    intro:'Rocky cliffs and monastery courtyards make a quiet place to slow down and discover a story.',
    culture:'Part of the Geghard monastery complex is carved into rock. UNESCO recognizes the monastery and the Upper Azat Valley for their architectural and cultural importance.',
    sights:['Geghard monastery courtyard','Rock-cut chambers','Upper Azat Valley'],
    phrase:['Այստեղ շատ գեղեցիկ է։','Aystegh shat geghetsik e.','It is very beautiful here.'],
    task:'Describe the view at the monastery', dish:'Herbs, cheese & lavash', ingredients:'Lavash, your favorite cheese, parsley, dill, and sliced tomatoes.', recipe:['Wash and dry the herbs and slice the tomatoes.','Arrange the cheese, herbs, and tomatoes on a plate.','Tear the lavash and wrap small bites at the table.'], source:'https://whc.unesco.org/en/list/960/' },
  { id:'sevan', name:'Lake Sevan', hy:'Սևան', x:276, y:338, status:'future', region:'Blue water, big adventures', color:'#6edbd8',
    intro:'A little boat, a lakeside breeze, and a new conversation waiting on the shore.',
    culture:'Sevanavank sits on a peninsula beside Lake Sevan. The lake and its mountain setting make this a memorable stop on the journey north.',
    sights:['Sevanavank peninsula','Lake Sevan shore','A lakeside viewpoint'],
    phrase:['Սա ինչքա՞ն արժե։','Sa inchkan arzhe?','How much does this cost?'],
    task:'Ask a lakeside vendor the price', dish:'Lemon & herb fish', ingredients:'Fish fillets, lemon, dill, a little oil, salt and pepper.', recipe:['Place the fish in a baking dish and brush with oil.','Add lemon slices, chopped dill, salt, and pepper.','Bake at 200°C until the fish is opaque and flakes easily. Cooking time depends on the thickness.'], source:travel },
  { id:'dilijan', name:'Dilijan', hy:'Դիլիջան', x:240, y:190, status:'future', region:'Into the forest', color:'#9ccc7a',
    intro:'Wander through green mountain trails and imagine a warm tea break on a wooden balcony.',
    culture:'Dilijan is a gateway to forest landscapes and Dilijan National Park. Nearby stops include Haghartsin monastery and Lake Parz.',
    sights:['Dilijan National Park','Lake Parz','Haghartsin monastery'],
    phrase:['Մի թեյ, խնդրում եմ։','Mi tey, khndrum em.','One tea, please.'],
    task:'Order tea after a forest walk', dish:'Mushrooms with herbs', ingredients:'250 g mushrooms, 1 small onion, butter or oil, parsley, salt and pepper.', recipe:['Slice the mushrooms and onion.','Soften the onion in butter or oil, then add the mushrooms.','Cook until browned and tender. Add chopped parsley and season to taste.'], source:travel },
  { id:'gyumri', name:'Gyumri', hy:'Գյումրի', x:83, y:190, status:'future', region:'Art, courtyards & character', color:'#dca48b',
    intro:'A welcoming courtyard, a creative spirit, and stone streets with plenty of character.',
    culture:'Gyumri is in Shirak. Its historic streets, creative arts, and welcoming, humorous spirit are part of the city’s appeal.',
    sights:['Historic Kumayri streets','A traditional stone courtyard','Local art and craft spaces'],
    phrase:['Շատ շնորհակալ եմ։','Shat shnorhakal em.','Thank you very much.'],
    task:'Thank a local craftsperson', dish:'Potato & herb skillet', ingredients:'3 potatoes, 1 small onion, oil, parsley, salt and pepper.', recipe:['Dice the potatoes and simmer in water until just tender; drain.','Soften the sliced onion in a little oil, then add the potatoes.','Cook until golden. Finish with parsley and season to taste.'], source:'https://armenia.travel/destination/gyumri/' }
];

const symbols = `<defs>
  <linearGradient id="land" x2=".8" y2="1"><stop stop-color="#cbea96"/><stop offset=".5" stop-color="#a8d774"/><stop offset="1" stop-color="#73bb7e"/></linearGradient>
  <linearGradient id="water" x2=".6" y2="1"><stop stop-color="#71ede0"/><stop offset="1" stop-color="#35b9d1"/></linearGradient>
  <linearGradient id="mountain" x2="1" y2="1"><stop stop-color="#dcc9ed"/><stop offset="1" stop-color="#a18ecb"/></linearGradient>
  <linearGradient id="leaf" x2=".8" y2="1"><stop stop-color="#a9d962"/><stop offset="1" stop-color="#459865"/></linearGradient>
  <linearGradient id="pink" x2="1" y2="1"><stop stop-color="#ffb6a7"/><stop offset="1" stop-color="#da807f"/></linearGradient>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="5" stdDeviation="3" flood-color="#416959" flood-opacity=".18"/></filter>
  <pattern id="stones" width="18" height="13" patternUnits="userSpaceOnUse"><path d="M0 0h18M0 13h18M9 0v6M0 6h18M3 6v7M15 6v7" fill="none" stroke="#d7b890" stroke-width="1" opacity=".6"/></pattern>
  <symbol id="pine" viewBox="0 0 28 48"><ellipse cx="14" cy="44" rx="12" ry="3" fill="#579365" opacity=".18"/><path d="M12 32h4v12h-4" fill="#a97550"/><path d="M14 0 3 20h5L0 34q14 9 28 0l-8-14h5Z" fill="url(#leaf)"/><path d="M14 1v35q-8 2-14-2l8-14H3Z" fill="#3e9964" opacity=".3"/></symbol>
  <symbol id="tree" viewBox="0 0 30 43"><ellipse cx="15" cy="39" rx="14" ry="4" fill="#4a9263" opacity=".18"/><path d="M13 22h4v18h-4" fill="#a97550"/><circle cx="15" cy="16" r="14" fill="url(#leaf)"/><circle cx="10" cy="12" r="8" fill="#c7e984" opacity=".5"/></symbol>
  <symbol id="house" viewBox="0 0 55 65"><ellipse cx="27" cy="59" rx="26" ry="5" fill="#60906b" opacity=".15"/><path d="M4 20 34 12l17 9v31l-17 9L4 51Z" fill="url(#pink)"/><path d="m34 12 17 9v31l-17 9Z" fill="#c97779"/><path d="M1 20 32 6l22 14-20 7Z" fill="#df9d89"/><path d="m1 20 33 7v5L1 25Z" fill="#ffd1b4"/><path d="M11 32h7v10h-7M24 30h6v10h-6" fill="#fff4d0"/><path d="m39 32 6-3v9l-6 3" fill="#995c68"/><path d="M21 46h9v12h-9" fill="#a05f71"/></symbol>
  <symbol id="temple" viewBox="0 0 105 90"><ellipse cx="53" cy="80" rx="49" ry="8" fill="#6d956a" opacity=".18"/><path d="m8 71 70-2 22 10-68 8L2 78Z" fill="#c19f7f"/><path d="M9 69h68v7H9" fill="#f4d7ac"/><path d="m77 69 19 8V38L77 27" fill="#c8a78f"/><path d="M17 34h8v34h-8m12-34h8v34h-8m12-34h8v34h-8m12-34h8v34h-8m12-34h8v34h-8" fill="#ffe6bd" stroke="#e8c7a3" stroke-width="2"/><path d="M11 29h69v9H11" fill="#f5dbb4"/><path d="m5 28 38-23 39 23Z" fill="#fce4bd" stroke="#d5b89b" stroke-width="2"/><path d="m43 5 25-1 32 24-18 0Z" fill="#d5b394"/><path d="m20 25 23-14 23 14Z" fill="#d0af91"/><path d="m81 28 19 0v8H81" fill="#b9947e"/></symbol>
  <symbol id="church" viewBox="0 0 80 90"><ellipse cx="40" cy="82" rx="36" ry="6" fill="#54785e" opacity=".2"/><path d="M10 44 50 37l20 10v32l-20 7-40-8Z" fill="#e1c4a1"/><path d="m50 37 20 10v32l-20 7" fill="#bba791"/><path d="M4 45 29 25l23 15 23 7-25 7Z" fill="#bb897f"/><path d="M30 23h24v32H30" fill="#e8cdae"/><path d="m25 24 17-24 17 24Z" fill="#a77874"/><path d="M40 0v-7m-4 3h8" stroke="#977873" stroke-width="2"/><path d="M36 30q6-9 12 0v10H36" fill="#a18b81"/><path d="M25 64q7-12 14 0v16H25" fill="#8b7875"/></symbol>
  <symbol id="balcony" viewBox="0 0 75 70"><path d="M7 25 49 15l19 12v33L28 69 7 59Z" fill="#ecc7a0"/><path d="M49 15v42l19 3V27" fill="#c29c7c"/><path d="M2 25 43 3l30 23-23 5Z" fill="#d48677"/><path d="M13 30h12v12H13m19-15h12v12H32" fill="#79bfc1"/><path d="m6 45 45-11v9L6 54Z" fill="#98795d"/><path d="M9 45v15m9-17v18m10-21v19m11-22v19m11-22v18" stroke="#aa835e" stroke-width="3"/></symbol>
  <symbol id="cascade" viewBox="0 0 72 75"><path d="m20 2 31 0 18 68H2Z" fill="#fff0cf"/><path d="M17 14h37M14 25h43M11 36h49M8 47h55M5 58h61" stroke="#d8bcaa" stroke-width="3"/><path d="M30 7h13l4 55H26Z" fill="#96d6d1"/><circle cx="18" cy="34" r="5" fill="#71b86c"/><circle cx="56" cy="49" r="5" fill="#71b86c"/></symbol>
  <symbol id="cloud" viewBox="0 0 100 35"><path d="M14 34C-4 34-3 12 14 13c3-20 28-17 34-5 13-12 34-3 33 10 24-2 24 16 4 16Z" fill="#ffffff" opacity=".87"/></symbol>
</defs>`;

/** Layered vector landmarks used both on the map and the place-sheet cover. */
export function landmark(id, x = 0, y = 0, scale = 1) {
  const drawings = {
    yerevan:`<use href="#house" x="-33" y="0" width="52" height="62"/><use href="#house" x="5" y="12" width="48" height="58"/><use href="#cascade" x="-2" y="-44" width="56" height="58"/><ellipse cx="-20" cy="53" rx="16" ry="6" fill="#f8cb72"/><path d="M-20 42v12" stroke="#a67a58" stroke-width="3"/><path d="M-40 39q20-28 40 0Z" fill="#f58e83"/><path d="M-24 25v14" stroke="#ffdfb1" stroke-width="4"/>`,
    garni:`<path d="M-54 55q40-20 100 0l-12 26-18-4-10 20-15-11-21 4Z" fill="#baab9b"/><path d="m-46 61 4 21m8-23 6 30m6-32 5 33m6-35 9 25m5-24 8 17" stroke="#8e9294" stroke-width="3"/><use href="#temple" x="-50" y="-35" width="105" height="90"/>`,
    geghard:`<path d="m-54 38 12-80 27 48L9-37l26 46 13-25 17 54Z" fill="url(#mountain)"/><path d="m-42-42 8 26 19 22-12 21m36-64 7 31 19 15" fill="none" stroke="#b2a1c9" stroke-width="4"/><use href="#church" x="-27" y="-12" width="71" height="79"/>`,
    sevan:`<use href="#church" x="-22" y="-35" width="48" height="54"/><path d="M34 48h31l-10 9H40Z" fill="#ba8769"/><path d="M48 11v39" stroke="#fff7dd" stroke-width="2"/><path d="m46 14-16 29h16Z" fill="#fff8da"/><path d="m51 17 13 22H51Z" fill="#ffc29a"/>`,
    dilijan:`<use href="#pine" x="-55" y="-15" width="31" height="54"/><use href="#pine" x="25" y="-42" width="38" height="65"/><use href="#balcony" x="-33" y="-13" width="75" height="70"/>`,
    gyumri:`<g style="filter:saturate(.5)"><use href="#house" x="-51" y="-15" width="48" height="58"/><use href="#house" x="-12" y="0" width="57" height="68"/></g><path d="M-43 48 1 38l43 19-40 16Z" fill="#e4c89f"/><path d="M-13 34v20m0-14 14-4v16l-14 4Z" fill="#fff0cd" stroke="#d59878" stroke-width="2"/><circle cx="-8" cy="45" r="3" fill="#ec9b8b"/><path d="M-22 66h24m-21 0v-8m18 8v-8" stroke="#9a7a62" stroke-width="3"/>`
  };
  return `<g transform="translate(${x} ${y}) scale(${scale})" filter="url(#soft)">${drawings[id]}</g>`;
}

const outline = 'M75 130Q93 107 119 124L153 101 183 120 222 108 260 133 307 157 324 196 300 229 316 267 298 303 327 352 309 399 319 443 290 484 282 532 304 568 290 610 316 648 310 691 343 728 341 779 365 817 345 863 309 845 301 805 278 770 273 725 245 697 235 652 208 625 178 590 164 553 134 532 111 486 93 456 96 421 70 390 72 353 47 317 53 276 37 245 52 207 48 170Z';
const road = 'M100 475C120 505 160 568 192 535S295 527 275 475S215 420 276 338S304 209 240 190S133 131 83 190';

export function mapArt() {
  const trees = [[64,257],[87,288],[110,325],[50,348],[145,225],[164,191],[179,253],[209,138],[270,151],[289,207],[216,225],[239,242],[277,275],[314,302],[137,393],[161,415],[107,555],[151,604],[211,593],[239,652],[275,687],[304,751],[326,793]];
  return `<svg class="journey-art" viewBox="0 60 390 890" aria-hidden="true">${symbols}
    <ellipse cx="201" cy="488" rx="159" ry="382" fill="#89b5b0" opacity=".12"/>
    <path d="${outline}" fill="#80b68e" transform="translate(0 10)"/>
    <path d="${outline}" fill="url(#land)" stroke="#f4f7c3" stroke-width="4"/>
    <path d="M69 236q92-86 221 10M87 365q51-75 104-41M170 563q54-43 116 0M244 729q52-33 84 13" fill="none" stroke="#deecad" stroke-width="24" opacity=".4"/>
    <g transform="translate(3 552)"><circle cx="58" cy="-21" r="28" fill="#fff0ae" opacity=".7"/><path d="m-30 48 82-109 78 109Z" fill="url(#mountain)"/><path d="m19-16 33-45 33 45-21-10-12 14-13-15Z" fill="#fff8f0"/><path d="m73 49 42-58 51 58Z" fill="#bca8d5"/><path d="m100 12 15-21 19 21-20-7Z" fill="#fff8f0"/><text x="9" y="71" fill="#80789e" font-size="9" font-weight="700">ARARAT · DISTANT VIEW</text></g>
    <path d="M274 300q-28 9-19 37t-2 40q-4 25 17 25l12 28q12 12 25-5l-10-31q18-23 6-48l-4-37q-8-25-25-9Z" fill="#43b6bb" opacity=".3" transform="translate(0 6)"/>
    <path d="M274 300q-28 9-19 37t-2 40q-4 25 17 25l12 28q12 12 25-5l-10-31q18-23 6-48l-4-37q-8-25-25-9Z" fill="url(#water)" stroke="#c8f4d9" stroke-width="3"/>
    <g class="lake-sparkles" fill="none" stroke="#d9fff4" stroke-width="2" stroke-linecap="round"><path d="M273 350h10m-10 22h12m-2 26h7m-18-84h7"/><path d="m286 334 3-4 3 4-3 4Z"/></g>
    <path d="${road}" fill="none" stroke="#84a66b" stroke-width="24" opacity=".3" transform="translate(0 5)"/>
    <path d="${road}" fill="none" stroke="#fff5cf" stroke-width="23" stroke-linecap="round"/>
    <path d="${road}" fill="none" stroke="#e9cf9c" stroke-width="17" stroke-linecap="round"/>
    <path d="${road}" fill="none" stroke="url(#stones)" stroke-width="17"/>
    <path d="M100 475C120 505 160 568 192 535" fill="none" stroke="#fff0b8" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 12"/>
    ${trees.map(([x,y],i)=>`<use href="#${i%3?'pine':'tree'}" x="${x}" y="${y}" width="${i%3?23:26}" height="${i%3?40:37}"/>`).join('')}
    ${landmark('gyumri',78,123,.84)}${landmark('dilijan',239,121,.9)}${landmark('sevan',271,288,.9)}${landmark('yerevan',103,409,.9)}${landmark('geghard',276,410,.85)}${landmark('garni',192,478,.8)}
    <g fill="#fff2c3"><path d="m116 253 2-4 2 4 4 1-4 2-2 4-2-4-4-2Z"/><path d="m229 435 2-4 2 4 4 1-4 2-2 4-2-4-4-2Z"/><circle cx="157" cy="321" r="2"/><circle cx="323" cy="676" r="3"/></g>
    <g class="map-cloud"><use href="#cloud" x="10" y="55" width="88" height="31"/><use href="#cloud" x="277" y="93" width="91" height="32"/></g>
    <text x="170" y="720" transform="rotate(36 170 720)" fill="#678e77" font-size="13" font-weight="800" letter-spacing="5">ARMENIA</text>
    <text x="255" y="896" fill="#7b9e88" font-size="10" text-anchor="middle">More adventures are on the horizon ✦</text>
  </svg>`;
}

export function journey() {
  return `<div class="screen journey-screen"><header class="journey-heading"><div class="journey-top"><button class="journey-profile" data-route="profile" aria-label="Open your profile"><span>T</span></button><div class="streak-bubble">🔥 <strong>14</strong> day streak</div><div class="journey-gems">✦ <strong>340</strong></div></div><div class="journey-eyebrow">A LITTLE ARMENIAN. A BIG ADVENTURE.</div><h1 tabindex="-1">Your next <em>բարև</em><br>is out there.</h1><p>Follow the trail. Find your story.</p><div class="journey-progress"><span>YOUR JOURNEY</span><span>1 of 6 explored</span><div><i></i></div></div></header>
    <div class="journey-world" aria-label="Illustrated Armenia quest map">${mapArt()}${places.map((p,i)=>`<button class="place-marker ${p.status}" data-place="${p.id}" style="--x:${p.x/390*100}%;--y:${(p.y-60)/890*100}%" aria-label="Explore ${p.name}${p.status==='current'?', current quest':''}"><span class="marker-core">${p.status==='completed'?'✓':p.status==='current'?'<span class="apricot-face"><i></i></span>':'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="11" rx="4"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg>'}</span><span class="marker-label">${p.name}<small>${p.status==='current'?'YOUR NEXT QUEST':p.status==='completed'?'EXPLORED':`STOP ${i+1}`}</small></span></button>`).join('')}<div class="map-invitation">Tap a place.<br><strong>A whole world opens.</strong><span>✦</span></div><div class="map-scale-note">An illustrated journey · locations simplified</div></div>
    <div id="place-sheet" class="place-sheet" hidden role="region" aria-label="Place explorer"></div></div>`;
}

export function placeSheet(place, expanded = false) {
  return `<div class="sheet-toolbar"><button class="sheet-expand" data-action="expand-place" aria-expanded="${expanded}" aria-label="${expanded?'Collapse':'Expand'} place details"><i></i></button><button class="sheet-close" data-action="close-place" aria-label="Close place details">×</button></div>
    <div class="sheet-scroll"><div class="place-cover" style="--place-color:${place.color}"><svg viewBox="0 0 390 130" aria-hidden="true"><ellipse cx="300" cy="91" rx="92" ry="29" fill="#fff3"/>${landmark(place.id,297,57,.92)}<use href="#cloud" x="227" y="5" width="60" height="22"/></svg><div><span>${place.region}</span><h2 tabindex="-1">${place.name} <small lang="hy">${place.hy}</small></h2></div></div><p class="place-intro">${place.intro}</p>
      <div class="place-tabs" role="tablist" aria-label="Explore this place">${[['speak','Speak'],['culture','Stories'],['sights','Discover'],['food','Taste']].map(([id,label],i)=>`<button role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-place-tab="${id}">${label}</button>`).join('')}</div>
      <section id="panel-speak" class="place-panel" role="tabpanel" aria-labelledby="tab-speak"><span class="panel-kicker">SPEAK LIKE A LOCAL</span><p class="place-phrase" lang="hy">${place.phrase[0]}</p><p class="phrase-transliteration">${place.phrase[1]}</p><p class="phrase-meaning">${place.phrase[2]}</p><button class="phrase-listen" data-action="place-audio">▷ Hear the phrase</button><p class="language-note">Sample practice phrase · standard Eastern Armenian. Regional dialect recordings will need local speakers.</p></section>
      <section id="panel-culture" class="place-panel" role="tabpanel" aria-labelledby="tab-culture" hidden><span class="panel-kicker">A STORY TO TAKE WITH YOU</span><h3>More than a stop on the map</h3><p>${place.culture}</p><a href="${place.source}" target="_blank" rel="noopener">Read the cultural source ↗</a></section>
      <section id="panel-sights" class="place-panel" role="tabpanel" aria-labelledby="tab-sights" hidden><span class="panel-kicker">LITTLE DISCOVERIES</span>${place.sights.map((s,i)=>`<div class="sight-row"><span>0${i+1}</span><div>${s}</div></div>`).join('')}<a href="${place.source}" target="_blank" rel="noopener">Explore the destination source ↗</a></section>
      <section id="panel-food" class="place-panel" role="tabpanel" aria-labelledby="tab-food" hidden><span class="panel-kicker">A TASTE OF THE JOURNEY</span><h3>${place.dish}</h3><p class="recipe-note">Home-style sample recipe inspired by the journey; not exclusive to ${place.name}.</p><details class="place-recipe"><summary>Ingredients &amp; recipe <span>＋</span></summary><h4>What you’ll need</h4><p>${place.ingredients}</p><h4>Make it at home</h4><ol>${place.recipe.map(s=>`<li>${s}</li>`).join('')}</ol>${place.id==='garni'?'<p>Traditional lavash is baked in a tonir. This skillet version is a home adaptation.</p>':''}</details></section>
    </div><footer class="sheet-footer"><span>YOUR MINI MISSION<br><strong>${place.task}</strong></span><button data-action="place-quest">Start this quest <span>→</span></button></footer>`;
}
