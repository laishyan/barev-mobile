# Barev mobile

A mobile web presentation for practicing Armenian through everyday conversations, an illustrated Armenia journey, and topic rooms.

## Run locally

Requires Node.js 20 or newer. No dependencies to install.

```sh
npm run dev
```

Open http://127.0.0.1:4173/. The root starts on the landing page. The app fills phone viewports and stays capped at 480px on larger screens. This is a mobile web app, not an iOS/Android binary.

## Current demo

Shareable demo: https://laishyan.github.io/barev-mobile/

This revision implements the confirmed meeting changes and room-preview navigation.

- Landing: illustrated introduction with Sign In and Sign Up. No shortcut to Profile. Sign In is visual only.
- Registration: name, surname, numeric age, sex, email, optional companion name. Email verification is a preview; no email is sent. Contact details remain in memory for that session, not in local storage.
- Onboarding: purpose explanation for people with basic Armenian, four familiar/not-yet expression cards, daily minutes and speaking goal. This is a self-check, not a proficiency assessment. Name, practice goal, and minutes personalize the local profile.
- All users are learners. Native-speaker roles, voice/video identity verification, and the ten-second speaking check are removed.
- The teenage girl artwork remains by confirmed demo scope. Age and sex do not change artwork yet. The companion can use the learner’s name or a separate name, editable in Settings.
- Navigation: Map, Create, Barev, Profile. AI Studio is removed. Old #studio links show Settings for compatibility. Settings holds response style, voice preference, playback speed, Armenian variety, companion name and gentle motion.
- Map: the illustrated country, cultural explorers and Yerevan city journey remain. Airport, Café, Shopping and Travel markers open two-turn scenario conversations. Cascade also opens the Café conversation.
- Conversations: authored Armenian opening line, transliteration/translation, a helpful phrase, written or spoken-aloud practice and a prepared fuller-sentence example. Suggestions are scripted, not an analysis of the user’s text. Self-marking both turns unlocks the matching topic room and awards 30 coins once per topic.
- Rooms: clicking any card opens its room preview with the AI host and sample people. Participation starts locked until the corresponding topic has been completed. Locked previews offer an explicit practice button and disable chat, microphone and hand controls; direct room URLs use the same participation gate. Unlocked rooms have local chat and UI microphone/hand controls. No live connections or microphone capture. Completion is not a real passing score; criteria and participant limits are future decisions.
- Create: one text-to-video concept, with editable prompts or up to 2,000 characters of supplied text. Every prompt opens the existing prepared 20-second video. A separate Armenian/Latin subtitle design preview rotates the title and character labels; it is explicitly not a dialogue transcript or synchronized captions. Real generation, transcription and verified subtitle timing await API selection.
- Profile: phrase pocket, comfort-zone panel and screen-time/less-scrolling section removed. Goals, sample passport/streak/activity and Settings remain.
- Wardrobe: compact items and clear available/locked labels. Basic outfit and waves are free; other items need earned coins. Ownership is enforced by the purchase/equip functions. Prior unpurchased previews reset to defaults. Purchases persist; accessories start off on every app load.
- Map gift icon: daily challenges and bonuses. Topic reward 30 once, daily thank-you 20 once per Yerevan calendar day, simulated friend join 50 once. No invitation is sent. Streak remains illustrative.
- Leaderboard, exact age categories, real AI feedback/scoring, live room management and video API integration remain future work.

## Validation

```sh
npm run check
npm test
```

Tests cover ownership enforcement, insufficient funds, duplicate rewards/purchases, migration of old outfit previews, accessory reset and matching topic room access. Browser review covers onboarding, topic completion, direct room access, persistence, video playback, settings and phone layouts. Physical iOS/Android testing remains necessary.

## Files

- `app.js`: local state, routing and interactive behavior.
- `onboarding.js`: landing, registration, email preview, purpose, self-check and goals.
- `journey.js`, `journey.css`: Armenian world and cultural place sheets.
- `city.js`, `city.css`: illustrated Yerevan route.
- `practice.js`: authored topics, conversation demo and map rewards.
- `settings.js`: conversation preferences.
- `rooms.js`, `rooms.css`: gated topic rooms and local chat.
- `creator.js`, `creator.css`: text/video presentation and prepared film.
- `passport.js`, `passport.css`: simplified profile.
- `companion.js`, `companion.css`, `partner.css`: wallet, wardrobe and layered companion artwork.
- `update.css`: new presentation styles and mobile refinements.
- `assets/`: generated illustration assets, prompts, reference styles and supplied demo video.
- `server.mjs`: loopback-only static server with MP4 range support.

Preferences, wallet and completed topics save on the current device; there is no real account or backend. Speech playback requires a browser Armenian voice. Voice style and Armenian variety are saved preferences for future integration; sample lines remain standard Eastern Armenian. The artwork is layered animated imagery, not a rigged 3D model. Reduced motion is respected. Fonts use the original Google Fonts reference with local fallback.

## Cultural content

The cultural sheets retain references to [Armenia Travel](https://armenia.travel/), [UNESCO Geghard](https://whc.unesco.org/en/list/960/) and [Visit Yerevan](https://visityerevan.am/). Source links remain in the corresponding place sections. Practice lines are authored examples, not dialect claims. Recipes are home-style samples, not dishes claimed as unique to a city. Geography is illustrative, not navigation. Room participants, host activity, level, passport stamps and streaks are sample data.
