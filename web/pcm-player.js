class PCMPlayer {
  constructor({ audioCtx }) {
    this.ctx = audioCtx;
    this.queue = [];
    this.playing = false;
  }
  feed(int16, srcRate) {
    const tgt = this.ctx.sampleRate;
    const ratio = srcRate / tgt;
    const outLen = Math.floor(int16.length / ratio);
    const f32 = new Float32Array(outLen);
    for (let i=0; i<outLen; i++){
      const pos = i * ratio;
      const i0 = Math.floor(pos), i1 = Math.min(i0+1, int16.length-1);
      const s = int16[i0] + (int16[i1]-int16[i0])*(pos - i0);
      f32[i] = s / 32768;
    }
    this.queue.push(f32);
    if (!this.playing) this._drain();
  }
  _drain() {
    if (this.queue.length === 0) { this.playing = false; return; }
    this.playing = true;
    const chunk = this.queue.shift();
    const buf = this.ctx.createBuffer(1, chunk.length, this.ctx.sampleRate);
    buf.copyToChannel(chunk, 0);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.ctx.destination);
    src.onended = () => this._drain();
    src.start();
  }
  flush() { this.queue = []; }
}