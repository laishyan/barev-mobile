# Barev mobile

A phone-only web project based on the published Figma Make app at https://waffle-hero-95933592.figma.site/.

## Run

Requires Node.js 20 or newer. No dependency installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. The app fills phone viewports and stays capped at 480px on larger displays for review. This is a mobile web app, not an iOS/Android native binary.

## Project

- `views.js`: editable screen components, reference icons, content.
- `journey.js`: layered SVG world, interactive place markers, six place profiles, and explorer sheet.
- `journey.css`: map palette, floating controls, animated details, and expandable place sheet.
- `studio.css`: cream, coral, and sage AI Studio character stage.
- `assets/anoush-3d.png`: transparent 3D-style Anoush illustration generated using the built-in image tool.
- `creator.js` and `creator.css`: story studio, format choices, editable templates, and prepared video result.
- `rooms.js` and `rooms.css`: four-room directory and a volunteer-led voice room demo with local chat, mic/hand controls, and sample AI hints.
- `passport.js` and `passport.css`: personal adventure passport, editable name/mascot, city stamps, daily goal, saved phrase pocket, and gentle-motion preference.
- `onboarding.js` and `onboarding.css`: welcome, learner/mentor role selection, local demo registration, a ten-second speaking preview, and voice/video verification previews.
- `companion.js` and `companion.css`: customized 3D speaking partner, teenage girl character, wardrobe, persistent demo coin wallet, reward guards, and purchase/equip logic.
- `assets/dog-cat-demo.mp4`: the user's supplied presentation video, played locally with native controls.
- `assets/dog-cat-poster.png`: storybook illustration generated with the built-in image tool; its prompt is saved alongside it.
- `app.js`: hash navigation, preference persistence, scenario editing, demo controls.
- `mobile.css`: phone layout, safe areas, touch targets, accessibility adjustments.
- `assets/reference.css`: original published stylesheet retained for fidelity.
- `assets/armenia-quest-world.png`: original quest artwork.
- `server.mjs`: loopback-only static development server.

## Current scope

The customizable 3D character IS the AI Studio speaking partner: Ani, a teenage girl, with matching layered artwork in Studio, the wardrobe and lesson preview. Open the wardrobe from Profile, Studio, the map coin counter, or `#companion`. Two hairstyle choices, three clothing choices and five independent accessories can be combined. One hairstyle and outfit are selected at a time; accessories stack and toggle off independently. The presentation uses one teenage girl character; no gender or age picker is shown. Older saved gender and age settings migrate to this character. Gentle idle motion respects reduced-motion and the app's gentle-motion preference.

Every wardrobe item can be tried freely for the presentation, even with zero coins. Hair and clothing previews persist across reloads. Accessories start unequipped on each app load and only appear after an explicit choice. Coins collect favorites, with duplicate-purchase and insufficient-balance guards. Earn 30 coins once for each different demo lesson, 20 once per Yerevan calendar day for the daily practice, and 50 from one simulated friend join. No actual invitations, payments, or live AI conversation are connected. Armenian playback depends on a browser Armenian voice. The partner gently moves while available speech plays; this is layered animated illustration, not a rigged 3D model or lip-sync engine.

Artwork assets are `assets/partner-*.png` and are generated using the built-in imagegen tool with transparency preserved. `partner.css` composes the head, clothing and SVG accessories. Final prompts are recorded in `assets/partner-generation-prompts.md`. The original Anoush artwork remains as a style reference asset. Welcome, assessment, Studio and speaking practice all show Ani in your chosen outfit.

The root URL now opens the welcome screen. Sign Up leads through role/name selection → a ten-second speaking activity (with a skip option) → a voice or video verification preview → Profile. The speaking countdown uses a ten-second deadline; leaving the screen cancels it. No account is created, no microphone or camera is accessed, and nothing is recorded or uploaded. Beginner is a fixed sample result, not an assessment. Native-speaker status is self-declared and not verified; mentor applications display a demo review notice on Profile. Existing app routes remain directly accessible. Replay the flow from Profile’s “Replay the welcome demo” link or `http://127.0.0.1:4173/#welcome`.

All five main screens are included. Quests is now a scrollable illustrated Armenia journey with Yerevan, Garni, Geghard, Lake Sevan, Dilijan, and Gyumri. Tap any marker to open a compact place sheet, expand it, and explore Speak, Stories, Discover, and Taste. Recipes expand independently. The selected marker remains visible above the sheet, and the bottom navigation remains accessible.

“Start this quest” opens a speaking preview with that place’s phrase and mini mission. Place lessons survive a refresh through their URL. Explore an expanded Garni sheet directly at `http://127.0.0.1:4173/#quests?place=garni&expanded=1`.

The illustrated map preserves relative city placement but is not a navigation map. Yerevan is marked explored and Garni current as sample progress. Future locks are visual journey states; all destinations can be explored in this prototype. Browser Back restores routes. Conversation style, dialect, scenario text, and the interceptor preference persist locally. Scenario quick picks, room mute/hand state, and profile toggle work locally.

Create offers Listening, Short video, and Fairytale formats with four prompt templates. The default example is Tumanyan’s “Շունն ու կատուն.” “Create my story” opens the supplied 20-second video with playback and seeking controls. Every format and prompt opens this same prepared demonstration; AI generation is not connected. Player autoplay is attempted only after the Create button is pressed, with native play controls as a fallback. The video result can also be opened at `http://127.0.0.1:4173/#story`.

Barev opens a directory of four sample rooms. Only the top room is interactive. It opens a six-person room with Ani clearly labeled as a volunteer peer from Gyumri in Shirak, Armenia. The room has a visible private AI phrase helper, an expandable sample word hint, local chat, demo microphone and raise-hand controls, and Leave returning to the directory. Chat messages are escaped and stay in memory; microphone controls change the UI without capturing audio. Room and mentor identities are illustrative. Open the demo directly at `http://127.0.0.1:4173/#room`.

The profile numbers and room participants remain reference/demo data. AI generation, real rooms, authentication, microphone recording, scoring, and OS-level scrolling interception are not connected. Controls disclose these limits. Speech playback works only if the browser supplies an Armenian voice; otherwise it explains the unavailable audio.

Profile is a personal adventure passport with six city stamps, matching the sample journey (Yerevan collected, Garni next). Each stamp opens a small explanatory preview. The name and apricot/sun/blossom mascot can be edited. Daily goals of 5, 10, or 15 minutes, phrase bookmarks, and the gentle-motion preference persist locally. Gentle motion disables decorative CSS animation and transitions throughout the app; system reduced-motion preferences remain respected. Dialect preferences link back to AI Studio. Level, streak, passport progress, weekly activity, and four minutes of daily practice are sample data. Google Fonts is loaded by the reference CSS; offline use falls back to installed sans-serif fonts.

## Cultural content

Place facts are paraphrased from [Armenia Travel’s itinerary](https://armenia.travel/articles/the-perfect-7-day-itinerary-for-first-time-visitors/), its [Gyumri destination page](https://armenia.travel/destination/gyumri/), and [UNESCO’s Geghard entry](https://whc.unesco.org/en/list/960/). Source links are provided inside Stories and Discover.

Phrases are authored samples in standard Eastern Armenian, not region-specific dialect claims. Local dialect recordings remain a future content task. Recipes are clearly labeled home-style samples, not exclusive local specialties; the Garni recipe distinguishes its skillet adaptation from traditional tonir baking.

## Validation

Run `npm run check` for syntax checks. Mobile layout and navigation were reviewed in the browser at narrow phone sizes; this does not replace testing on physical iOS/Android devices.

Profile includes a Screen-time help switch near the bottom, using the saved interceptor preference. It starts on by default and is a presentation preference; device screen-time integration is not connected.


Yerevan now opens a separate illustrated city route: Vernissage → Republic Square → Opera → Cascade (`#yerevan`). Cascade is the only playable city stop and opens `#cafe`, a two-step coffee listening/speaking presentation with multiple-choice feedback, self-marked speaking practice and the existing once-only Cascade Café coin reward. Other destinations retain their place sheets. Geography is simplified for the illustration, not turn-by-turn directions. Landmark references: [Visit Yerevan – Vernissage](https://visityerevan.am/places/details/325/en/), [Visit Yerevan – Cascade](https://www.visityerevan.am/places/details/51/en/), and [Yerevan Municipality – city guide](https://www.yerevan.am/uploads/media/default/0001/91/e1e3ea9edff4a2191e1a8a756820559782c42326.pdf). Cafe dialogue is authored practice content. `city.js` and `city.css` provide the map, landmarks and café activity.
