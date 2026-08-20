/* Tiny WebAudio synth — no external assets. Unlock on first user gesture. */
class AudioKit {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  muted = false;

  private ensure(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      try {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.5;
        this.master.connect(this.ctx.destination);
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => undefined);
    }
    return this.ctx;
  }

  unlock() {
    this.ensure();
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType = 'sine',
    vol = 0.2,
    delay = 0,
    slideTo = 0,
  ) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo > 0) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  private noise(dur: number, vol = 0.1, delay = 0) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + delay;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = vol;
    src.connect(g);
    g.connect(this.master);
    src.start(t0);
  }

  /** drum "tun" hit, alternates pitch for tun-tun feel */
  tap(alt: boolean) {
    this.tone(alt ? 165 : 130, 0.1, 'sine', 0.3, 0, 55);
    this.noise(0.035, 0.06);
  }

  crit() {
    this.tone(95, 0.26, 'sawtooth', 0.26, 0, 40);
    this.noise(0.16, 0.22);
    this.tone(48, 0.3, 'sine', 0.3, 0.02, 30);
  }

  buy() {
    this.tone(620, 0.07, 'square', 0.1);
    this.tone(930, 0.11, 'square', 0.1, 0.07);
  }

  deny() {
    this.tone(150, 0.12, 'sawtooth', 0.12, 0, 90);
  }

  levelUp() {
    const seq = [523, 659, 784, 1047];
    seq.forEach((f, i) => this.tone(f, 0.16, 'triangle', 0.16, i * 0.09));
    this.noise(0.25, 0.08, 0.3);
  }

  golden() {
    [1240, 1560, 2080].forEach((f, i) => this.tone(f, 0.12, 'sine', 0.14, i * 0.06));
  }

  achievement() {
    this.tone(700, 0.1, 'triangle', 0.14);
    this.tone(1050, 0.16, 'triangle', 0.14, 0.09);
  }
}

export const audio = new AudioKit();
