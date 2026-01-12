/**
 * Sound Manager using Web Audio API
 * Provides low-latency typing sounds
 */

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.initialized = false;
  }

  /**
   * Initialize the Audio Context
   * Must be called after user interaction due to browser autoplay policies
   */
  init() {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.generateSounds();
      this.initialized = true;
    } catch (error) {
      console.error("Web Audio API not supported:", error);
    }
  }

  /**
   * Generate typing sounds programmatically
   */
  generateSounds() {
    // Mechanical sound: higher pitched, shorter duration
    this.sounds.mechanical = {
      frequency: 800,
      duration: 0.05,
      type: "sine",
      gain: 0.3,
    };

    // Soft sound: lower pitched, very short
    this.sounds.soft = {
      frequency: 400,
      duration: 0.03,
      type: "sine",
      gain: 0.2,
    };

    // Silent - no sound
    this.sounds.silent = {
      frequency: 0,
      duration: 0,
      type: "sine",
      gain: 0,
    };
  }

  /**
   * Play a typing sound
   * @param {string} soundSet - 'mechanical', 'soft', or 'silent'
   * @param {number} volume - Volume from 0 to 100
   */
  play(soundSet = "mechanical", volume = 50) {
    if (!this.initialized) {
      this.init();
    }

    if (!this.audioContext || soundSet === "silent" || volume === 0) {
      return;
    }

    const sound = this.sounds[soundSet] || this.sounds.mechanical;
    const normalizedVolume = (volume / 100) * sound.gain;

    try {
      // Create oscillator for the tone
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.type = sound.type;
      oscillator.frequency.value = sound.frequency;

      // Set volume with a smooth envelope
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(normalizedVolume, now + 0.005);
      gainNode.gain.linearRampToValueAtTime(0, now + sound.duration);

      oscillator.start(now);
      oscillator.stop(now + sound.duration);

      // Clean up after the sound finishes
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  /**
   * Resume audio context if suspended (for autoplay policy)
   */
  resume() {
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;
