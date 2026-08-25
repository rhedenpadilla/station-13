/**
 * SoundEngine - Web Audio API procedural soundscape & FX generator
 * Zero-dependency, low-latency, fully procedural audio for horror atmosphere.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  // Ambience nodes
  private rainNode: AudioNode | null = null;
  private oceanNode: AudioNode | null = null;
  private humNode: AudioNode | null = null;
  private generatorNode: AudioNode | null = null;
  private tapeHumNode: AudioNode | null = null;

  // Radio static node
  private radioNoiseNode: AudioNode | null = null;
  private radioGain: GainNode | null = null;
  private radioFilter: BiquadFilterNode | null = null;

  // State
  private isInitialized = false;
  private masterVol = 0.8;
  private sfxVol = 0.9;
  private ambienceVol = 0.7;
  private musicVol = 0.75;

  constructor() {
    // Initialized on user interaction
  }

  public init() {
    if (this.isInitialized && this.ctx && this.ctx.state !== 'closed') {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master bus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVol, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVol, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Ambience bus
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(this.ambienceVol, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);

      // Music / Tone bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.musicVol, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.isInitialized = true;

      // Start continuous ambient layers
      this.startRainAmbience();
      this.startOceanAmbience();
      this.startElectricalHum();
    } catch (e) {
      console.warn("Web Audio Context could not initialize yet (needs user gesture)", e);
    }
  }

  public setVolumes(master: number, sfx: number, ambience: number, music = 0.75) {
    this.masterVol = master;
    this.sfxVol = sfx;
    this.ambienceVol = ambience;
    this.musicVol = music;

    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.masterGain) this.masterGain.gain.setTargetAtTime(master, now, 0.05);
      if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(sfx, now, 0.05);
      if (this.ambienceGain) this.ambienceGain.gain.setTargetAtTime(ambience, now, 0.05);
      if (this.musicGain) this.musicGain.gain.setTargetAtTime(music, now, 0.05);
    }
  }

  // --- AMBIENCE GENERATORS ---

  private startRainAmbience() {
    if (!this.ctx || !this.ambienceGain) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.6, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.ambienceGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  private startOceanAmbience() {
    if (!this.ctx || !this.ambienceGain) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const brownNoise = this.ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(waveGain.gain);

    brownNoise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.ambienceGain);

    brownNoise.start();
    lfo.start();
    this.oceanNode = brownNoise;
  }

  private startElectricalHum() {
    if (!this.ctx || !this.ambienceGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, this.ctx.currentTime);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(humGain);
    humGain.connect(this.ambienceGain);

    osc.start();
    this.humNode = osc;
  }

  // --- SOUND EFFECTS ---

  public playFootstep(isOutside = false) {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (isOutside) {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 40, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.07);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    }

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playThunder() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 2.5);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.01, now);
    subGain.gain.exponentialRampToValueAtTime(0.7, now + 0.15);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const crackNoise = this.ctx.createBufferSource();
    crackNoise.buffer = noiseBuffer;

    const crackFilter = this.ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.setValueAtTime(450, now);
    crackFilter.Q.setValueAtTime(1.5, now);

    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime(0.5, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    crackNoise.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(this.sfxGain);

    subOsc.start(now);
    crackNoise.start(now);
    subOsc.stop(now + 3.5);
    crackNoise.stop(now + 2.0);
  }

  public playLightFlicker() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  public playUIClick() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  public playObjectiveUpdate() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880.00, now + 0.09); // A5
    osc.frequency.setValueAtTime(1174.66, now + 0.18); // D6

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  public playTapeInsert() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playKeyUnlock() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(900, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc1.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc1.stop(now + 0.16);
  }

  public playCalibrationTone(resonancePercent: number) {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    const baseFreq = 440 + (resonancePercent / 100) * 880;
    osc.frequency.setValueAtTime(baseFreq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playCalibrationComplete() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.65);
    });
  }

  public playFuseInsert() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);

    setTimeout(() => {
      this.startGeneratorHum();
    }, 200);
  }

  public startGeneratorHum() {
    if (!this.ctx || !this.ambienceGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(25, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 3.0);

    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(55, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, now);

    const genGain = this.ctx.createGain();
    genGain.gain.setValueAtTime(0.001, now);
    genGain.gain.exponentialRampToValueAtTime(0.25, now + 3.5);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(genGain);
    genGain.connect(this.ambienceGain);

    osc.start(now);
    sub.start(now);
    this.generatorNode = osc;
  }

  // --- RADIO TUNING SOUND ENGINE ---

  public updateRadioStatic(frequency: number, targetFreq = 13.13, isTunerActive = false) {
    if (!this.ctx || !this.sfxGain) return;

    if (!isTunerActive) {
      if (this.radioGain) {
        this.radioGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      }
      return;
    }

    if (!this.radioNoiseNode) {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      this.radioFilter = this.ctx.createBiquadFilter();
      this.radioFilter.type = 'bandpass';
      this.radioFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      this.radioFilter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      this.radioGain = this.ctx.createGain();
      this.radioGain.gain.setValueAtTime(0, this.ctx.currentTime);

      noise.connect(this.radioFilter);
      this.radioFilter.connect(this.radioGain);
      this.radioGain.connect(this.sfxGain);

      noise.start();
      this.radioNoiseNode = noise;
    }

    const diff = Math.abs(frequency - targetFreq);
    const now = this.ctx.currentTime;

    const centerFreq = 600 + (frequency - 12.0) * 800;
    if (this.radioFilter) {
      this.radioFilter.frequency.setTargetAtTime(Math.max(200, Math.min(4000, centerFreq)), now, 0.05);
    }

    let staticVol = 0.4;
    if (diff < 0.15) {
      staticVol = 0.05 + (diff / 0.15) * 0.35;
    }

    if (this.radioGain) {
      this.radioGain.gain.setTargetAtTime(staticVol, now, 0.05);
    }
  }

  public playSignalLockTone() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1313, now + 0.1);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  public playBeaconSound() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(146.83, now); // D3

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(73.41, now); // D2

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.4);
    gain.gain.setValueAtTime(0.5, now + 1.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 3.2);
    osc2.stop(now + 3.2);
  }

  public stopAllAudio() {
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        if (this.masterGain) {
          this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
        }
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {
        console.warn("Error stopping audio", e);
      }
    }
  }

  public playGameOverGlitch() {
    if (!this.ctx || !this.sfxGain) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 1.2);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 1.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  // --- SYNTHESIZED DISTORTED RADIO VOICE ---

  public speakRadioTransmission(text: string, onComplete?: () => void) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.6;
      utterance.rate = 0.85;
      utterance.volume = this.sfxVol;

      this.playSignalLockTone();

      utterance.onend = () => {
        if (onComplete) onComplete();
      };

      utterance.onerror = () => {
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      this.playSignalLockTone();
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3000);
    }
  }
}

export const soundEngine = new SoundEngine();
