console.log("Melody Timer App started");

// Step 1: Represent the melody
// Using "Twinkle Twinkle Little Star" as our melody
const melody = ["C", "C", "G", "G", "A", "A", "G", "F", "F", "E", "E", "D", "D", "C"];
console.log("Melody:", melody);

// Step 2: Mode switch
let mode = "fixed"; // Can be "fixed" or "random"
console.log("Mode:", mode);

// Step 6: notes color/mood mapping
const noteColors = {
    C: "#FF6B6B",
    D: "#4ECDC4",
    E: "#45B7D1",
    F: "#96CEB4",
    G: "#FFEAA7",
    A: "#DDA0DD",
    B: "#98D8C8"
};
const noteMoods = {
    C: "energetic",
    D: "calm",
    E: "peaceful",
    F: "cheerful",
    G: "bright",
    A: "dreamy",
    B: "serene"
};

// Helper function to get note info
function getNoteInfo(note) {
    return {
        color: noteColors[note],
        mood: noteMoods[note]
    };
}

// Helper function to log playing note
function logPlayingNote(note) {
    const noteInfo = getNoteInfo(note);
    console.log(`Now playing: ${note} | Color: ${noteInfo.color} | Mood: ${noteInfo.mood}`);
}

// Step 3: Fixed tempo player function
function playFixedTempo(interval, repeatCount, maxNotes, randomStopProbability) {
    console.log("\n=== FIXED TEMPO MODE ===");
    let noteIndex = 0; // current note index
    let noteCount = 0; // total played notes count
    let loopsCount = 0; // full melody played count
    const timer = setInterval(() => {
        // stop playing if maxNotes condition is enabled and reached
        if (maxNotes > 0 && noteCount >= maxNotes) {
            clearInterval(timer);
            console.log(`\n🎵 stopped after ${noteCount} notes`);
            return;
        }
        // stop playing if "goodness of random" decides so
        if (randomStopProbability > 0 && Math.random() < randomStopProbability) {
            clearInterval(timer);
            console.log(`\n🎵 stopped randomly`);
            return;
        }
        // Log loop start
        if (noteIndex === 0) {
            console.log(`🎶 start melody loop #${loopsCount + 1} 🎶.`);
        }
        // Play current note
        logPlayingNote(melody[noteIndex]);
        // Move to next note
        noteIndex = (noteIndex + 1) % melody.length;
        noteCount++;
        // Check if we completed a full loop
        if (noteIndex === 0) {
            loopsCount++;
            if (loopsCount >= repeatCount) {
                clearInterval(timer);
                console.log(`\n🎵 stopped after ${loopsCount} full loops`);
                return;
            }
        }
    }, interval);
}

// Step 4: Generative tempo player function
function playGenerativeTempo(minDelay, maxDelay, repeatCount, maxNotes, randomStopProbability) {
    console.log("\n=== GENERATIVE TEMPO MODE ===");
    let noteCount = 0; // total played notes count
    let loopsCount = 0; // full melody played count
    function playNextNote() {
        // stop playing if maxNotes condition is enabled and reached
        if (maxNotes > 0 && noteCount >= maxNotes) {
            console.log(`\n🎶 stopped after ${noteCount} notes`);
            return;
        }
        // stop playing if "goodness of random" decides so
        if (randomStopProbability > 0 && Math.random() < randomStopProbability) {
            console.log(`\n🎶 stopped randomly`);
            return;
        }
        const noteIndex = noteCount % melody.length;
        // Log loop start
        if (noteIndex === 0) {
            console.log(`🎶 start melody loop #${loopsCount + 1} 🎶.`);
        }
        // Play current note
        logPlayingNote(melody[noteIndex]);
        noteCount++;
        // Check if we completed a full loop
        if (noteIndex === melody.length - 1) {
            loopsCount++;
            if (loopsCount >= repeatCount) {
                console.log(`\n🎶 stopped after ${loopsCount} full loops`);
                return;
            }
        }
        // Calculate next delay
        const nextDelay = minDelay + Math.random() * (maxDelay - minDelay);
        // Schedule next note
        setTimeout(playNextNote, nextDelay);
    }
    // Start the generative sequence
    playNextNote();
}

// Main execution function
function runMelodyTimer() {
    if (mode === "fixed") {
        const interval = 500;
        const repeatCount = 3; 
        const maxNotesCount = 0; // set 0 for no notes limit
        const randomStopProbability = 0.0; // set 0 if no random stop desired
        playFixedTempo(interval, repeatCount, maxNotesCount, randomStopProbability);
    } else {
        const minDelay = 300;
        const maxDelay = 900;
        const repeatCount = 5;
        const maxNotesCount = 32;
        const randomStopProbability = 0;
        playGenerativeTempo(minDelay, maxDelay, repeatCount, maxNotesCount, randomStopProbability);
    }
}

// Start the app
runMelodyTimer();
