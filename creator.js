import { icon } from './views.js';

export const storyTemplates = [
  { title: 'Շունն ու կատուն', subtitle: 'Tumanyan’s story world', symbol: '🐕', color: 'peach', format: 'video', prompt: 'Create a fairytale video of Hovhannes Tumanyan’s “Շունն ու կատուն” (Shunn u Katun), in Armenian, with gentle narration and subtitles.' },
  { title: 'A café in Yerevan', subtitle: 'Everyday conversation', symbol: '☕', color: 'mint', format: 'video', prompt: 'Create a short Armenian listening about ordering coffee in Yerevan, with a slow conversation and useful phrases.' },
  { title: 'A little trip to Sevan', subtitle: 'A story in 30 seconds', symbol: '⛵', color: 'blue', format: 'video', prompt: 'Create a short video in Armenian about a little trip to Lake Sevan, with simple vocabulary and Armenian subtitles.' },
  { title: 'An apricot adventure', subtitle: 'Imagine a new fairytale', symbol: '🍑', color: 'lavender', format: 'video', prompt: 'Create an original Armenian fairytale about a little apricot who goes on an adventure, with a warm ending and simple words.' }
];

export function creator(state) {
  return `<div class="screen creator-screen">
    <header class="creator-header"><div class="creator-kicker">A LITTLE IDEA. A WHOLE NEW WORLD.</div><h1 tabindex="-1">What will you <em>create?</em></h1><p>Turn your text into a little Armenian video.</p></header>
    <section class="storybook-banner" aria-label="Featured story"><img src="assets/dog-cat-poster.png" alt="A friendly dog and a cat tailor in a sunlit Armenian village workshop"><div class="storybook-badge">✦ THE STORY CORNER</div><div class="storybook-title"><span>Հովհաննես Թումանյան</span><strong lang="hy">Շունն ու կատուն</strong><small>A familiar tale. A little new magic.</small></div></section>
    <section class="creator-compose"><div class="creator-section-title"><h2>From text to video</h2><span>01</span></div>
    <div class="creator-prompt-label"><label for="story-prompt">Your prompt or story text</label><span>✦ IN ARMENIAN</span></div><div class="story-prompt-box"><textarea id="story-prompt" maxlength="2000" aria-describedby="creator-demo-note" placeholder="A story, a place, a little adventure…"></textarea><div class="prompt-footer"><span>Let your imagination wander</span><span class="character-count"></span></div></div>
    <button class="button create-story-button" data-action="build">${icon('sparkle',21)} Create my video ${icon('arrow',18)}</button><p id="creator-demo-note" class="creator-demo-note">Demo only · opens the same prepared video. AI video generation is not connected.</p><div class="subtitle-example"><small>SUBTITLE STYLE PREVIEW</small><strong lang="hy">Բարև՛։</strong><span>Barev.</span><small>Armenian + Latin transliteration. Exact generated subtitles will depend on the future video service.</small></div></section>
    <section class="creator-templates"><div class="creator-section-title"><h2>A spark to start with</h2><span>02</span></div><p>Pick a template and make it yours.</p><div class="story-templates">${storyTemplates.map((t,i)=>`<button class="button story-template ${t.color}" data-template="${i}" aria-pressed="false"><span class="template-symbol" aria-hidden="true">${t.symbol}</span><strong>${t.title}</strong><small>${t.subtitle}</small><span class="template-arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section>
    <div class="creator-footnote">Made for little moments of Armenian wonder. ✦</div>
  </div>`;
}

export function storyDemo() {
  return `<div class="screen story-result-screen"><header class="result-header"><button class="button result-back" data-route="create" aria-label="Back to Create">←</button><span>YOUR STORY CORNER</span><span class="result-demo-badge">DEMO</span></header><div class="result-title"><span>A TUMANYAN STORY WORLD</span><h1 tabindex="-1" lang="hy">Շունն ու կատուն</h1><p>The Dog and the Cat · Hovhannes Tumanyan</p></div>
    <div class="story-video-wrap"><video controls playsinline preload="metadata" poster="assets/dog-cat-poster.png" aria-label="The Dog and the Cat, prepared demo video"><source src="assets/dog-cat-demo.mp4" type="video/mp4">Your browser cannot play this video. <a href="assets/dog-cat-demo.mp4">Open the demo video</a>.</video></div>
    <div class="result-meta"><span>${icon('clock',14)} <span data-video-duration>Prepared video</span></span><span>Presentation preview</span></div><section class="result-story-note"><span>A LITTLE IDEA, BROUGHT TO LIFE</span><h2>Your story, ready to watch.</h2><p>Press play to explore our sample story video.</p><p class="result-disclosure">This is a prepared presentation demo. AI generation will come later; your prompt doesn’t change this sample yet.</p></section>
    <section class="video-caption-panel"><span>SUBTITLE DESIGN PREVIEW · NOT A TRANSCRIPT</span><strong lang="hy" data-caption-hy>Շունն ու կատուն</strong><p data-caption-latin>Shunn u katun</p><small>Sample title and character labels rotate during playback. They are not synchronized dialogue captions. Verified Armenian + transliteration subtitles will be added with the chosen video API.</small></section>

    <button class="button create-story-button" data-route="create">${icon('sparkle',19)} Dream up another story</button><a class="story-source" href="https://www.toumanianmuseum.am/en/tumanyan/creations/shunn-u-katun" target="_blank" rel="noopener noreferrer">Explore the original at the Tumanyan Museum ↗</a></div>`;
}
