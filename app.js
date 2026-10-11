import { routes, adventures, icon, quests, lesson } from './views.js';
import { places, placeSheet } from './journey.js';
import { creator, storyDemo, storyTemplates } from './creator.js';
import { roomDirectory, voiceRoom } from './rooms.js';
import { passport, stampInfo } from './passport.js';
import { welcome, signin, signup, assessment, verification, purpose, goals, knowledgeCards } from './onboarding.js';
import { conversation, rewards, topics, getTopic, topicPassed } from './practice.js';
import { settings } from './settings.js';
import { companion, companionMini, readWallet, saveWallet, equipItem, wardrobeItems, awardCoins, purchaseItem, rewardDay } from './companion.js';
import { yerevan, cascadeCafe, cafePhrase } from './city.js';

const container = document.querySelector('#screen-container');
const nav = document.querySelector('.bottom-nav');
const dialog = document.querySelector('#notice');
const defaultPrompt = storyTemplates[0].prompt;
let saved = {};
try { saved = JSON.parse(localStorage.getItem('barev-preferences') || '{}') || {}; } catch { /* Storage may be unavailable in a private browser. */ }
const state = {
  register: [0,1,2].includes(saved.register) ? saved.register : 2,
  dialect: [0,1].includes(saved.dialect) ? saved.dialect : 0,
  interceptor: typeof saved.interceptor === 'boolean' ? saved.interceptor : true,
  prompt: saved.creatorVersion === 1 && typeof saved.prompt === 'string' ? saved.prompt.slice(0,2000) : defaultPrompt,
  creationFormat: 'video',
  profileName: typeof saved.profileName === 'string' && saved.profileName.trim() ? saved.profileName.trim().slice(0,24) : 'Tigran',
  profileAvatar: ['apricot','sun','flower'].includes(saved.profileAvatar) ? saved.profileAvatar : 'apricot',
  dailyGoal: [5,10,15].includes(saved.dailyGoal) ? saved.dailyGoal : 10,
  savedPhrases: Array.isArray(saved.savedPhrases) ? [...new Set(saved.savedPhrases.filter(n=>[0,1,2].includes(n)))] : [0,1],
  gentleMotion: saved.gentleMotion === true, profileEditing: false,
  onboardingName: typeof saved.profileName === 'string' ? saved.profileName.slice(0,24) : 'Tigran',
  onboardingCompleted: saved.onboardingCompleted === true, profileRole: 'learner',
  registration:{surname:'',age:'',sex:'',email:'',partner:''},
  knowledgeIndex:0, knowledgeAnswers:[],
  learningGoal:['everyday','confidence','situations','personal'].includes(saved.learningGoal)?saved.learningGoal:'confidence',
  personalGoal:typeof saved.personalGoal==='string'?saved.personalGoal.slice(0,120):'',
  voiceStyle:saved.voiceStyle==='bright'?'bright':'gentle', voiceRate:saved.voiceRate===.8?.8:1,
  completedTopics:Array.isArray(saved.completedTopics)?saved.completedTopics.filter(id=>topics.some(t=>t.id===id)):[],
  topic:'cafe', roomTopic:'cafe', conversationStep:0, conversationDraft:'', conversationFeedback:false, conversationDone:false, conversationReward:false,
  wallet: readWallet(), dailyChallengeOpen: false, inviteOpen: false,
  cafeStep:'listen', cafeAnswer:null, cafePracticed:false, cafeNewReward:false,
  muted: true, hand: false, activeQuest: null,
  roomChatOpen: false, roomHint: false, roomDraft: '',
  roomMessages: [
    {author:'Barev AI',text:'Բարև՛։ Welcome to this topic room. Try a little Armenian together. This host message is a prepared demo.'},
    {author:'Mark',text:'Barev! Excited to practice with everyone 🌼'}
  ]
};
const views = { conversation, rewards, settings, signin, purpose, goals, yerevan, cafe:cascadeCafe, companion, welcome, signup, assessment, verification, quests, create: creator, story: storyDemo, barev: roomDirectory, room: voiceRoom, profile: passport, lesson };
const onboardingRoutes = ['welcome','signin','signup','assessment','verification','purpose','goals'];
let current = 'quests';
let selectedPlace = null;
let expandedPlace = false;
let playStoryOnOpen = false;
function changeWallet(message,focusSelector) {
  saveWallet(state.wallet); render();
  if(focusSelector) container.querySelector(focusSelector)?.focus({preventScroll:true});
  if(message) document.querySelector('#announcement').textContent=message;
}
const lessonRewardKey = () => 'lesson:'+(state.activeQuest?.id||'cascade-cafe');
function keepPlaceVisible() {
  const sheet = container.querySelector('#place-sheet');
  const marker = container.querySelector(`[data-place="${selectedPlace?.id}"]`);
  if (!sheet || !marker) return;
  requestAnimationFrame(() => {
    const screen = container.querySelector('.screen');
    const room = sheet.getBoundingClientRect().top - screen.getBoundingClientRect().top;
    const target = Math.max(35, room * .5);
    const markerRect = marker.getBoundingClientRect();
    const position = markerRect.top - screen.getBoundingClientRect().top + markerRect.height / 2;
    screen.scrollTop += position - target;
  });
}
function openPlace(id, expanded = false) {
  if(id==='yerevan') { go('yerevan'); return; }
  selectedPlace = places.find(place => place.id === id);
  if (!selectedPlace) return;
  expandedPlace = expanded;
  const sheet = container.querySelector('#place-sheet');
  sheet.innerHTML = placeSheet(selectedPlace,expanded);
  sheet.hidden = false;
  container.querySelector('.screen').classList.add('sheet-open');
  sheet.classList.toggle('expanded',expanded);
  container.querySelectorAll('[data-place]').forEach(marker => {
    if (marker.dataset.place === id) marker.setAttribute('aria-current','location');
    else marker.removeAttribute('aria-current');
  });
  keepPlaceVisible();
  sheet.querySelector('h2').focus({preventScroll:true});
}
function closePlace() {
  const marker = container.querySelector(`[data-place="${selectedPlace?.id}"]`);
  const sheet = container.querySelector('#place-sheet');
  if (sheet) sheet.hidden = true;
  container.querySelector('.screen')?.classList.remove('sheet-open');
  marker?.focus({preventScroll:true});
  selectedPlace = null;
}
function selectPlaceTab(id) {
  container.querySelectorAll('[data-place-tab]').forEach(tab=>{
    const active = tab.dataset.placeTab === id;
    tab.setAttribute('aria-selected',String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  container.querySelectorAll('.place-panel').forEach(panel=>panel.hidden = panel.id !== `panel-${id}`);
}

function persist() {
  try { localStorage.setItem('barev-preferences', JSON.stringify({ register: state.register, dialect: state.dialect, interceptor: state.interceptor, prompt: state.prompt, creationFormat: state.creationFormat, creatorVersion: 1, profileName: state.profileName, profileAvatar: state.profileAvatar, dailyGoal: state.dailyGoal, savedPhrases: state.savedPhrases, gentleMotion: state.gentleMotion, onboardingCompleted: state.onboardingCompleted, profileRole: 'learner', learningGoal:state.learningGoal, personalGoal:state.personalGoal, voiceStyle:state.voiceStyle, voiceRate:state.voiceRate, completedTopics:state.completedTopics })); } catch { /* Keep preferences in memory if persistence is blocked. */ }
}
function notice(title, message) {
  dialog.querySelector('h2').textContent = title;
  dialog.querySelector('p').textContent = message;
  dialog.showModal();
}
function updateEditor() {
  const textarea = container.querySelector('textarea');
  if (!textarea) return;
  container.querySelector('.character-count').textContent = `${textarea.value.length} / 2000`;
  container.querySelector('[data-action="build"]').disabled = !textarea.value.trim();
  container.querySelectorAll('[data-template]').forEach(button => button.setAttribute('aria-pressed', String(storyTemplates[Number(button.dataset.template)].prompt === textarea.value)));
}
function render(focus = false) {
  document.documentElement.classList.toggle('gentle-motion',state.gentleMotion);
  const scroll = container.querySelector('.screen')?.scrollTop || 0;
  container.innerHTML = views[current](state);
  const placeExplorer = container.querySelector('#place-sheet');
  if (placeExplorer) container.append(placeExplorer);
  container.scrollTop = 0;
  nav.hidden = current === 'conversation' || current === 'cafe' || current === 'lesson' || current === 'room' || onboardingRoutes.includes(current);
  const navRoute = current === 'lesson' ? 'quests' : current === 'rewards' ? 'quests' : current === 'settings' ? 'profile' : current === 'yerevan' ? 'quests' : current === 'story' ? 'create' : current === 'room' ? 'barev' : current === 'companion' ? 'profile' : current;
  nav.innerHTML = routes.map(([route,label,symbol])=>`<button class="button nav-item ${navRoute===route?'active':''}" data-route="${route}" ${navRoute===route?'aria-current="page"':''}>${icon(symbol,21)}<span>${label}</span></button>`).join('');
  if (current === 'create') {
    container.querySelector('textarea').value = state.prompt;
    updateEditor();
  }
  if (current === 'story') {
    const video = container.querySelector('video');
    video.addEventListener('loadedmetadata',()=>{
      if (Number.isFinite(video.duration)) container.querySelector('[data-video-duration]').textContent = `${Math.floor(video.duration/60)}:${String(Math.floor(video.duration%60)).padStart(2,'0')}`;
    },{once:true});
    const previewCaptions=[['Շունն ու կատուն','Shunn u katun'],['Շուն','Shun'],['Կատու','Katu']];
    video.addEventListener('timeupdate',()=>{ const line=previewCaptions[Math.floor(video.currentTime/7)%previewCaptions.length]; container.querySelector('[data-caption-hy]').textContent=line[0]; container.querySelector('[data-caption-latin]').textContent=line[1]; });
    video.addEventListener('error',()=>{
      document.querySelector('#announcement').textContent = 'The demo video could not load. Please try refreshing the page.';
    });
    if (playStoryOnOpen) {
      playStoryOnOpen = false;
      video.play().catch(()=>{ /* Native play controls remain available if autoplay is blocked. */ });
    }
  }
  if (current === 'room') {
    container.querySelector('#room-message').value = state.roomDraft;
    const messages = container.querySelector('.room-chat-messages');
    messages.scrollTop = messages.scrollHeight;
  }
  if (current === 'profile') {
    container.querySelector('.passport-identity').insertAdjacentHTML('afterend',companionMini(state));


  }

  if (current === 'quests') {
    const coins=container.querySelector('.journey-gems');
    const button=document.createElement('button');
    button.className='button journey-gems'; button.dataset.route='companion';
    button.setAttribute('aria-label',`Open coin wallet: ${state.wallet.coins} demo coins`);
    button.innerHTML=`🪙 <strong>${state.wallet.coins}</strong>`; coins.replaceWith(button);
  }
  if (current === 'lesson') {
    const earned=state.wallet.earned.includes(lessonRewardKey());
    container.querySelector('.screen').insertAdjacentHTML('beforeend',`<button class="button lesson-reward" data-action="complete-lesson" ${earned?'disabled':''}>${earned?'Lesson reward collected ✓':'Complete demo lesson · earn 30 coins'}</button><p class="demo-note lesson-reward-note">Self-marked practice · one reward per different demo lesson</p>`);
  }
  container.querySelector('.screen').scrollTop = focus ? 0 : scroll;
  document.title = `Barev — ${current==='companion'?'Your companion':onboardingRoutes.includes(current)?({welcome:'Welcome',signup:'Sign Up',assessment:'A little Armenian',verification:'Email preview'})[current]:current==='story'?'Your story':current==='room'?'Voice room':routes.find(([r])=>r===current)?.[1] || 'Speaking practice'}`;
  if(['signin','purpose','goals','settings','conversation','rewards'].includes(current)) document.title='Barev — '+({signin:'Sign In',purpose:'Find your voice',goals:'Your goals',settings:'Settings',conversation:getTopic(state.topic).name,rewards:'Daily challenges'})[current];
  if(current==='yerevan'||current==='cafe') document.title='Barev — '+(current==='yerevan'?'Yerevan adventure':'Cascade café quest');
  if (focus) container.querySelector('h1')?.focus({ preventScroll:true });
}
function routeFromHash() {
  const [route, query] = location.hash.slice(1).split('?');
  const params = new URLSearchParams(query || '');
  const next = route==='studio'?'settings':Object.hasOwn(views, route) ? route : 'welcome';
  if(next==='conversation') {
    const id=getTopic(params.get('topic')).id;
    if(id!==state.topic||current!=='conversation') resetConversation(id);
  }
  if(next==='room') {
    state.roomTopic=getTopic(params.get('topic')).id;
  }
  if(next==='assessment' && state.knowledgeIndex>=knowledgeCards.length) state.knowledgeIndex=0;
  current = next;
  if (current === 'lesson') state.activeQuest = places.find(place => place.id === params.get('place')) || null;
  selectedPlace = null;
  render(true);
  if (current === 'quests' && params.has('place')) openPlace(params.get('place'), params.get('expanded') === '1');
}
function resetConversation(id) {
  state.topic=getTopic(id).id; state.conversationStep=0; state.conversationDraft=''; state.conversationFeedback=false; state.conversationDone=false; state.conversationReward=false;
}
function openConversation(id) {
  resetConversation(id);
  if(current==='conversation' && location.hash===`#conversation?topic=${state.topic}`) render(true);
  else go(`conversation?topic=${state.topic}`);
}
function completeTopic(id) {
  if(!state.completedTopics.includes(id)) state.completedTopics.push(id);
  state.conversationReward=awardCoins(state.wallet,'topic:'+id,30,getTopic(id).name+' conversation');
  saveWallet(state.wallet); persist();
}
function go(route) {
  if (current === route) return;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  location.hash = route;
}
function speak(text, rate = state.voiceRate) {
  if (!('speechSynthesis' in window)) {
    notice('Audio preview', 'This browser does not offer speech playback. The Armenian line and transliteration are available on screen.'); return;
  }
  const voice = speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('hy'));
  if (!voice) {
    notice('Armenian voice needed', 'Your browser does not have an Armenian voice available. We can connect your partner’s voice in a later step. For now, use the Armenian line and its transliteration.'); return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice.lang; utterance.voice = voice; utterance.rate = rate;
  const stopTalking=()=>container.querySelectorAll('.partner-figure').forEach(el=>el.classList.remove('partner-talking'));
  utterance.onstart=()=>container.querySelectorAll('.partner-figure').forEach(el=>el.classList.add('partner-talking'));
  utterance.onend=stopTalking;
  utterance.onerror = () => { stopTalking(); notice('Audio unavailable', 'The browser could not play this line. Please try again.'); };
  speechSynthesis.speak(utterance);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.closest('#notice')) { dialog.close(); return; }
  if (button.dataset.topic) { openConversation(button.dataset.topic); return; }
  if (button.dataset.topicRoom) {
    const id=getTopic(button.dataset.topicRoom).id;
    state.roomTopic=id; state.muted=true; state.hand=false; state.roomChatOpen=false;
    state.roomMessages=[{author:'Barev AI',text:'Բարև՛։ Welcome to '+getTopic(id).name+'. This is a prepared AI host preview.'},{author:'Mark',text:'Barev! Ready to practice together.'}];
    go('room?topic='+id); return;
  }
  if (button.dataset.knowledge) {
    state.knowledgeAnswers[state.knowledgeIndex]=button.dataset.knowledge==='yes';
    if(state.knowledgeIndex<knowledgeCards.length-1) { state.knowledgeIndex++; render(true); }
    else go('goals'); return;
  }
  if (button.dataset.learningGoal) { state.learningGoal=button.dataset.learningGoal; persist(); render(); return; }
  if (button.dataset.voiceStyle) { state.voiceStyle=button.dataset.voiceStyle; persist(); render(); return; }
  if (button.dataset.voiceRate) { state.voiceRate=Number(button.dataset.voiceRate); persist(); render(); return; }
  if (button.dataset.route) { go(button.dataset.route); return; }
  if (button.dataset.place) { openPlace(button.dataset.place); return; }
  if (button.dataset.cafeAnswer) {
    state.cafeAnswer=button.dataset.cafeAnswer; render();
    container.querySelector(`[data-cafe-answer="${state.cafeAnswer}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.placeTab) { selectPlaceTab(button.dataset.placeTab); return; }
  if (button.dataset.buyItem) {
    const id=button.dataset.buyItem,result=purchaseItem(state.wallet,id);
    if(result==='insufficient') notice('A little more practice','Earn more demo coins through lessons and challenges to unlock this item.');
    else if(result==='purchased') changeWallet(`${wardrobeItems.find(item=>item.id===id).name} purchased and equipped.`,`[data-equip-item="${id}"]`);
    return;
  }
  if (button.dataset.equipItem) {
    const id=button.dataset.equipItem;
    if(!equipItem(state.wallet,id)) return;
    changeWallet('Outfit updated.',`[data-equip-item="${id}"]`); return;
  }
  if (button.dataset.stamp !== undefined) { notice(...stampInfo(Number(button.dataset.stamp))); return; }
  if (button.dataset.goal !== undefined) {
    state.dailyGoal = Number(button.dataset.goal); persist(); render();
    container.querySelector(`[data-goal="${state.dailyGoal}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.savePhrase !== undefined) {
    const index = Number(button.dataset.savePhrase);
    state.savedPhrases = state.savedPhrases.includes(index)?state.savedPhrases.filter(n=>n!==index):[...state.savedPhrases,index];
    persist(); render(); container.querySelector(`[data-save-phrase="${index}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.format) {
    state.creationFormat = button.dataset.format; persist();
    container.querySelectorAll('[data-format]').forEach(option=>{
      const active = option.dataset.format === state.creationFormat;
      option.classList.toggle('selected',active); option.setAttribute('aria-pressed',String(active));
    }); return;
  }
  if (button.dataset.template !== undefined) {
    const template = storyTemplates[Number(button.dataset.template)];
    state.prompt = template.prompt; state.creationFormat = template.format; persist(); render();
    container.querySelector(`[data-template="${button.dataset.template}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.register !== undefined) {
    state.register = Number(button.dataset.register); persist(); render();
    container.querySelector(`[data-register="${state.register}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.dialect !== undefined) {
    state.dialect = Number(button.dataset.dialect); persist(); render();
    container.querySelector(`[data-dialect="${state.dialect}"]`).focus({preventScroll:true}); return;
  }
  if (button.dataset.adventure !== undefined) {
    state.prompt = adventures[Number(button.dataset.adventure)][3]; persist();
    container.querySelector('textarea').value = state.prompt; updateEditor(); return;
  }
  switch (button.dataset.action) {
      case 'cascade-open': openConversation('cafe'); break;
      case 'cafe-audio': speak(cafePhrase,.8); break;
      case 'cafe-listen': state.cafeStep='listen'; render(true); break;
      case 'cafe-speak': if(state.cafeAnswer==='coffee') { state.cafeStep='speak'; render(true); container.querySelector('h2').focus({preventScroll:true}); } break;
      case 'cafe-practice': state.cafePracticed=true; render(); container.querySelector('[data-action="cafe-practice"]').focus({preventScroll:true}); break;
      case 'cafe-finish':
        if(!state.cafePracticed) break;
        state.cafeNewReward=awardCoins(state.wallet,'lesson:cascade-cafe',30,'Cascade Café lesson');
        saveWallet(state.wallet); state.cafeStep='done'; render(true);
        document.querySelector('#announcement').textContent='Café practice complete.'; break;
    case 'topic-audio': speak(getTopic(state.topic).steps[state.conversationStep][0]); break;
    case 'use-topic-phrase': state.conversationDraft=getTopic(state.topic).steps[state.conversationStep][3]; render(); container.querySelector('#conversation-answer').focus(); break;
    case 'conversation-next':
      if(!state.conversationFeedback) break;
      if(state.conversationStep===0) { state.conversationStep=1; state.conversationDraft=''; state.conversationFeedback=false; render(true); }
      else { completeTopic(state.topic); state.conversationDone=true; render(true); }
      break;
    case 'companion-lesson': openConversation('cafe'); break;
    case 'complete-lesson':
      if(awardCoins(state.wallet,lessonRewardKey(),30,(state.activeQuest?.name||'Cascade Café')+' lesson')) changeWallet('Demo lesson complete. 30 coins added.');
      break;
    case 'daily-challenge': state.dailyChallengeOpen=true; render(); container.querySelector('[data-action="claim-daily"]').focus({preventScroll:true}); break;
    case 'claim-daily':
      if(awardCoins(state.wallet,'daily:'+rewardDay(),20,'Daily thank-you challenge')) { state.dailyChallengeOpen=false; changeWallet('Daily challenge complete. 20 coins added.'); }
      break;
    case 'invite-preview': state.inviteOpen=true; render(); container.querySelector('[data-action="claim-invite"]').focus({preventScroll:true}); break;
    case 'claim-invite':
      if(awardCoins(state.wallet,'invite:demo-friend',50,'Sample friend joined')) { state.inviteOpen=false; changeWallet('Sample friend joined. 50 demo coins added.'); }
      break;
    case 'onboarding-back': go(({signin:'welcome',signup:'welcome',verification:'signup',purpose:'verification',assessment:'purpose',goals:'assessment'})[current]||'welcome'); break;
    case 'finish-signup':
      state.profileName = state.onboardingName; state.profileRole = 'learner';
      state.wallet.name=(state.registration.partner.trim()||state.onboardingName).replace(/[<>&"']/g,'').slice(0,24)||'Ani'; saveWallet(state.wallet);
      state.onboardingCompleted = true; persist(); go('profile'); break;
    case 'edit-profile': state.profileEditing = true; render(); container.querySelector('#profile-name').focus(); break;
    case 'cancel-profile': state.profileEditing = false; render(); container.querySelector('[data-action="edit-profile"]').focus({preventScroll:true}); break;
    case 'gentle-motion':
      state.gentleMotion = !state.gentleMotion; persist(); render();
      container.querySelector('[data-action="gentle-motion"]').focus({preventScroll:true}); break;
    case 'join-room': if(topicPassed(state,state.roomTopic)) go('room?topic='+state.roomTopic); break;
    case 'leave-room': state.roomChatOpen = false; go('barev'); break;
    case 'room-chat':
      state.roomChatOpen = !state.roomChatOpen; render();
      container.querySelector(state.roomChatOpen?'#room-message':'.chat-control').focus({preventScroll:true}); break;
    case 'room-mute':
      state.muted = !state.muted; render();
      container.querySelector('[data-action="room-mute"]').focus({preventScroll:true});
      document.querySelector('#announcement').textContent = `Demo microphone ${state.muted?'off':'on'}. No audio is captured.`; break;
    case 'room-hand':
      state.hand = !state.hand; render();
      container.querySelector('[data-action="room-hand"]').focus({preventScroll:true});
      document.querySelector('#announcement').textContent = state.hand?'Hand raised in room demo.':'Hand lowered.'; break;
    case 'room-hint':
      state.roomHint = !state.roomHint;
      container.querySelector('.room-hint-answer').hidden = !state.roomHint;
      button.setAttribute('aria-expanded',String(state.roomHint)); break;
    case 'quest': openConversation('cafe'); break;
    case 'lesson': openConversation('cafe'); break;
    case 'close-place': closePlace(); break;
    case 'expand-place':
      expandedPlace = !expandedPlace;
      container.querySelector('#place-sheet').classList.toggle('expanded',expandedPlace);
      button.setAttribute('aria-expanded',String(expandedPlace));
      button.setAttribute('aria-label',`${expandedPlace?'Collapse':'Expand'} place details`);
      setTimeout(keepPlaceVisible,260); break;
    case 'place-quest': openConversation(selectedPlace.id==='sevan'?'travel':selectedPlace.id==='gyumri'?'shopping':selectedPlace.id==='dilijan'?'travel':'cafe'); break;
    case 'place-audio': speak(selectedPlace.phrase[0]); break;
    case 'greeting': speak('Բարև՛։ Ինչպե՞ս ես։'); break;
    case 'icebreaker': speak('Ի՞նչ երգեր ես լսում հիմա։'); break;
    case 'slow': speak(state.activeQuest?.phrase[0] || 'Մի հատ սառը սուրճ կբերե՞ք, խնդրում եմ։', .8); break;
    case 'interceptor':
      state.interceptor = !state.interceptor; persist();
      button.classList.toggle('on',state.interceptor); button.setAttribute('aria-checked',String(state.interceptor));
      const screenTimeStatus=container.querySelector('[data-screen-time-status]');
      if(screenTimeStatus) screenTimeStatus.textContent=state.interceptor?'On':'Off';
      document.querySelector('#announcement').textContent = `Screen-time help ${state.interceptor?'enabled':'disabled'}.`; break;
    case 'mute':
      state.muted = !state.muted; button.classList.toggle('muted',state.muted); button.setAttribute('aria-pressed',String(!state.muted));
      container.querySelector('.participant:last-child small').textContent = state.muted?'Muted':'Mic on'; break;
    case 'hand':
      state.hand = !state.hand; button.setAttribute('aria-pressed',String(state.hand));
      button.setAttribute('aria-label',state.hand?'Lower hand':'Raise hand');
      document.querySelector('#announcement').textContent = state.hand?'Hand raised in room preview.':'Hand lowered.'; break;
    case 'whisper': notice('A little help', 'երգ (yerg) means “song”. Try the icebreaker: Ի՞նչ երգեր ես լսում հիմա։ — What songs are you listening to right now? This is a sample hint.'); break;
    case 'level': notice('Your next rank', 'This reference profile shows 1,420 cultural XP. You’re 180 XP away from Gyumri Explorer. Live progress will be connected later.'); break;
    case 'audio': notice('Audio preview', 'The slow playback button uses an Armenian voice if your browser provides one. Your partner’s generated voice has not been connected yet.'); break;
    case 'record': notice('Speaking preview', 'This screen is ready for voice practice. Microphone recording and pronunciation feedback will be connected in a later step.'); break;
    case 'build': playStoryOnOpen = true; go('story'); break;
  }
});
container.addEventListener('input', event => {
  event.target.setCustomValidity?.('');
  if (event.target.id === 'personal-goal') { state.personalGoal=event.target.value.slice(0,120); persist(); return; }
  if (event.target.id === 'conversation-answer') { state.conversationDraft=event.target.value; state.conversationFeedback=false; container.querySelector('.conversation-feedback')?.remove(); return; }
  if (event.target.id === 'signup-name') { state.onboardingName = event.target.value; event.target.setCustomValidity(''); return; }
  const field=({ 'signup-surname':'surname','signup-age':'age','signup-sex':'sex','signup-email':'email','signup-partner':'partner' })[event.target.id];
  if(field) { state.registration[field]=event.target.value; return; }
  if (event.target.id === 'profile-name') { event.target.setCustomValidity(''); return; }
  if (event.target.id === 'room-message') { state.roomDraft = event.target.value; return; }
  if (!event.target.matches('textarea')) return;
  state.prompt = event.target.value; persist(); updateEditor();
});
container.addEventListener('submit',event=>{
  if(event.target.matches('.signin-demo-form')) { event.preventDefault(); notice('Sign In preview','This form shows the design only. Authentication is not connected and nothing was submitted.'); return; }
  if(event.target.matches('.partner-name-form')) {
    event.preventDefault(); const input=event.target.querySelector('input');
    const name=input.value.replace(/[<>&"']/g,'').trim();
    if(!name) { input.setCustomValidity('Please enter a name.'); input.reportValidity(); return; }
    state.wallet.name=name.slice(0,24); saveWallet(state.wallet); render(); return;
  }
  if(event.target.matches('.conversation-form')) {
    event.preventDefault(); const input=event.target.querySelector('textarea');
    if(!input.value.trim()) { input.setCustomValidity('Try a phrase or use the helpful example.'); input.reportValidity(); return; }
    state.conversationDraft=input.value.trim(); state.conversationFeedback=true; render();
    container.querySelector('.conversation-feedback').focus(); container.querySelector('.conversation-feedback').scrollIntoView({block:'center',behavior:state.gentleMotion?'instant':'smooth'}); return;
  }
  if (event.target.matches('.signup-demo-form')) {
    event.preventDefault();
    const name = event.target.querySelector('#signup-name');
    if (!name.value.trim()) { name.setCustomValidity('Please enter a name for the demo.'); name.reportValidity(); return; }
    state.onboardingName = name.value.trim().slice(0,24);
    for(const key of ['surname','age','sex','email','partner']) state.registration[key]=event.target.elements[key].value.trim();
    const surname=event.target.elements.surname;
    if(!surname.value.trim()) { surname.setCustomValidity('Please enter your surname.'); surname.reportValidity(); return; }
    state.knowledgeIndex=0; state.knowledgeAnswers=[]; go('verification'); return;
  }
  if (event.target.matches('.passport-editor')) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#profile-name').value.trim();
    if (!name) { form.querySelector('#profile-name').setCustomValidity('Please enter your name.'); form.querySelector('#profile-name').reportValidity(); return; }
    state.profileName = name.slice(0,24);
    state.profileAvatar = form.querySelector('[name="mascot"]:checked').value;
    state.profileEditing = false; persist(); render();
    container.querySelector('h1').focus({preventScroll:true}); return;
  }
  if (!event.target.matches('.room-chat-form')) return;
  event.preventDefault();
  const message = state.roomDraft.trim().slice(0,240);
  if (!message) return;
  state.roomMessages.push({author:'You',text:message});
  if (state.roomMessages.length > 40) state.roomMessages.splice(2,1);
  state.roomDraft = ''; render();
  container.querySelector('#room-message').focus({preventScroll:true});
});
container.addEventListener('change',event=>{ if(event.target.id==='signup-sex') state.registration.sex=event.target.value; });
window.addEventListener('hashchange',routeFromHash);
document.addEventListener('keydown',event=>{
  if (event.key === 'Escape' && current === 'room' && state.roomChatOpen) {
    state.roomChatOpen = false; render(); container.querySelector('.chat-control').focus({preventScroll:true});
  }
  if (event.key === 'Escape' && selectedPlace && !dialog.open) closePlace();
  const tab = event.target.closest('[data-place-tab]');
  if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...container.querySelectorAll('[data-place-tab]')];
  const index = tabs.indexOf(tab);
  const next = event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  selectPlaceTab(tabs[next].dataset.placeTab); tabs[next].focus();
});
routeFromHash();
