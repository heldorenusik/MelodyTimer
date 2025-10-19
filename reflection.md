# Melody Timer App - Reflection

## How did timing change the feel of your melody?

The timing dramatically transformed the musical experience. In **fixed tempo mode**, the melody felt mechanical and predictable - like a metronome playing "Twinkle Twinkle Little Star" with perfect precision. Each note arrived exactly every 500ms, creating a steady, nursery-rhyme quality. However, in **generative tempo mode** (300-900ms random delays), the same melody suddenly felt organic and jazz-like. The irregular timing created anticipation and surprise, making each note feel more expressive and human-like. The random delays between 300-900ms gave the melody a "swing" feel that was much more engaging to listen to.

## What's one edge case you found and fixed?

I discovered that the Web Audio API requires user interaction to initialize the audio context in browsers. Initially, the audio would fail silently when running in Node.js (where `window` is undefined) or when the browser hadn't received user input yet. I fixed this by adding proper error handling with try-catch blocks and checking for the existence of the `window` object. The app now gracefully falls back to visual-only mode when audio isn't available, logging "Audio not available" instead of crashing.

## If this were a real product, what user control would you add?

For a real product, I would add several key controls: **BPM slider** (30-200 BPM) to adjust the base tempo, **mode toggle** with a visual switch between fixed/random modes, **volume control** and **mute button** for audio management, **melody selection** dropdown with multiple song options, **note count limit** slider to control playback duration, and **color theme picker** to customize the visual mood mapping. Additionally, I'd add **play/pause/resume** controls, **loop mode** toggle, and **export functionality** to save custom melodies as JSON files.

## Technical Implementation Highlights

- **Modular Design**: Separated concerns into distinct functions for fixed tempo, generative tempo, audio handling, and UI updates
- **Visual Feedback**: Real-time color and mood display with HEX color codes
- **Stop Conditions**: Implemented note counting, loops counting and random stop triggers to stop playback
- **Audio Synthesis**: Used Web Audio API with sine wave oscillators and proper gain envelope for clean beeps
