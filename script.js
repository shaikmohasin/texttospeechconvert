const synth = window.speechSynthesis;
const voiceSelect = document.getElementById('voiceSelect');
let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function convertTextToSpeech() {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    const inputText = document.getElementById('text').value;
    if (inputText !== '') {
        const utterance = new SpeechSynthesisUtterance(inputText);
        const selectedVoice = voices[voiceSelect.selectedIndex];
        utterance.voice = selectedVoice;
        synth.speak(utterance);
    }
}

function pauseSpeech() {
    if (synth.speaking && !synth.paused) {
        synth.pause();
    }
}

function resumeSpeech() {
    if (synth.paused) {
        synth.resume();
    }
}
