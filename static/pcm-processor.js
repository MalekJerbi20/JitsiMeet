let buffer = [];

class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0]; // Float32Array of samples

      // 👇 Simple silence detection (ignore frames with only near‑zero values)
      const hasSpeech = channelData.some(sample => Math.abs(sample) > 0.01);

      if (hasSpeech) {
        // Accumulate samples into buffer
        buffer.push(...channelData);

        // 👇 Send ~1 second of audio at 48kHz (48,000 samples)
        if (buffer.length >= 48000) {
          this.port.postMessage(new Float32Array(buffer));
          buffer = []; // reset buffer
        }

        // Optional: log only when speech detected
        //console.log("PCMProcessor sample:", channelData[0]);
      }
    }
    return true; // keep processor alive
  }
}

registerProcessor('pcm-processor', PCMProcessor);
