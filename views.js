import { companionArt, partnerName } from './companion.js';
import { journey } from './journey.js';
/** Original inline icons from the published Figma reference. */
const paths = {
  mic: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  map: '<path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2Z"/><path d="M8 4v13M16 7v13"/>',
  sparkle: '<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8ZM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6Z"/>',
  chat: '<path d="M20 14a4 4 0 0 1-4 4H8l-5 3 1.5-5A7 7 0 0 1 3 12V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  arrow: '<path d="M5 12h14M15 8l4 4-4 4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  speaker: '<path d="M11 5 6 9H3v6h3l5 4ZM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
  diamond: '<path d="m3 9 4-5h10l4 5-9 11Z"/><path d="m7 4 5 16 5-16M3 9h18"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 2.8 8.2 7 10 4.2-1.8 7-5.5 7-10V6Z"/>',
  hand: '<path d="M7 11V7a2 2 0 0 1 4 0v3-5a2 2 0 0 1 4 0v5-3a2 2 0 0 1 4 0v6c0 5-3 8-8 8h-1c-3 0-5-2-7-6l-1-2a2 2 0 0 1 3-2l2 2Z"/>',
  fire: '<path d="M13 3s2 4-1 7c-2-3-5-1-5 3a5 5 0 0 0 10 0c0-2-1-4-4-10Z"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  micOff: '<path d="m3 3 18 18M9 9v3a3 3 0 0 0 5 2M9 5a3 3 0 0 1 6 1v5M5 11a7 7 0 0 0 12 5M19 11a7 7 0 0 1-.5 2.5M12 18v3M8 21h8"/>',
  exit: '<path d="M10 4H5v16h5M10 12h11m-4-4 4 4-4 4"/>',
  edit: '<path d="m14 5 5 5M4 20l5-1L20 8l-5-5L4 14Z"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>'
  ,film: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4m-10-7 4 4-4 4Z"/>'
  ,book: '<path d="M12 6C8 3 4 4 2 5v14c4-2 7-1 10 1 3-2 6-3 10-1V5c-2-1-6-2-10 1v14Z"/>'
};
/** Render a decorative icon. */
export const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
const avatar = (letter, color = 'gold') => `<div class="avatar avatar-${color}"><span>${letter}</span></div>`;
const anoush = (guide = false) => `<div class="anoush ${guide ? 'guide-anoush' : ''}" aria-hidden="true"><div class="hair back"></div><div class="neck"></div><div class="face"><div class="brow left"></div><div class="brow right"></div><div class="eye left"></div><div class="eye right"></div><div class="nose"></div><div class="mouth"></div></div><div class="hair front"></div><div class="earring">✦</div><div class="body"></div>${guide ? '' : '<div class="name-tag"><strong>Anoush</strong><span>YOUR VOICE GUIDE</span></div>'}</div>`;
const header = (eyebrow, title, description) => `<header class="screen-header"><div class="eyebrow">${eyebrow}</div><h1 tabindex="-1">${title}</h1><p>${description}</p></header>`;

/** Five primary routes retained from the reference. */
export const routes = [
  ['quests', 'Map', 'map'],
  ['create', 'Create', 'sparkle'], ['barev', 'Barev', 'chat'], ['profile', 'Profile', 'person']
];
export const adventures = [
  ['🛒', 'Vernissage', 'Bargain like a local', 'I’m at Vernissage and want to bargain for a handmade souvenir.'],
  ['☕', 'Cascade Café', 'Order with confidence', 'I’m at a café near the Cascade and want to order a cold coffee.'],
  ['🍲', 'Tatik’s Table', 'Compliment her dolma', 'I’m having dinner with my grandmother and want to compliment her dolma.'],
  ['🚕', 'Yerevan Taxi', 'Guide your driver', 'I’m taking a taxi in Yerevan and want to tell the driver where to stop.']
];

/** Render the interactive illustrated Armenia journey. */
export const quests = journey;

/** Render the speaking screen already present in the prototype. */
export function lesson(state = {}) {
  const place = state.activeQuest;
  return `<div class="screen coach-screen"><div class="coach-topbar"><button class="button icon-button" data-route="quests" aria-label="Exit lesson">${icon('close')}</button><div><span>${place?'CITY QUEST':'SCENE 02'}</span><strong>${place?place.name:'At the Cascade Café'}</strong></div><button class="button icon-button" data-action="audio" aria-label="Audio settings">${icon('speaker')}</button></div><div class="lesson-progress"><span style="width:42%"></span></div>
    <section class="avatar-stage">${companionArt(state.wallet)}<div class="phonetics-window"><div class="phonetic-top"><span>Ղ</span><div><strong>GHAT</strong><small>VISUAL PHONETICS</small></div></div><div class="mouth-diagram"><div class="lip upper"></div><div class="teeth"></div><div class="tongue"></div><div class="lip lower"></div><span>soft palate</span></div><p>Touch the back of your tongue softly — softer than Russian Х.</p></div></section>
    <section class="dialogue-card glass-card"><div class="dialogue-head"><span>${place?place.task:'YOUR LINE'}</span><button class="button speed-button" data-action="slow">${icon('speaker',15)} 0.8× slow</button></div><div class="armenian" lang="hy">${place?place.phrase[0]:'Մի հատ սառը սուրճ կբերե՞ք, խնդրում եմ։'}</div><div class="transliteration">${place?place.phrase[1]:'Mi hat sarə surj kbereq, khndrum em?'}</div><div class="translation">“${place?place.phrase[2]:'Could you bring one cold coffee, please?'}”</div></section>
    <section class="record-area"><div class="waveform" aria-hidden="true">${Array.from({length:28},(_,i)=>`<i style="height:${8+(i*11)%30}px"></i>`).join('')}</div><p>Tap and speak naturally</p><button class="button record-button" data-action="record" aria-label="Start recording">${icon('mic',28)}</button></section><p class="demo-note">Speaking preview · speech scoring is not connected yet</p></div>`;
}
