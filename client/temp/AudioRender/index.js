import echarts from 'echarts';

import { URL_MUSIC_HARDER_BETTER_FASTER_STRONGER } from '../StaticVariable/StaticVariable';
import { getMusicBuffer } from '../Tool';


export default async function AudioInit() {
  let _isRecord = true;
  const lineRecord = [];

  const context = new (window.AudioContext || window.webkitAudioContext)();
  const [source, analyser] = [context.createBufferSource(), context.createAnalyser()];

  const response = await getMusicBuffer(URL_MUSIC_HARDER_BETTER_FASTER_STRONGER);

  context.decodeAudioData(response, buffer => {
    source.buffer = buffer;
    source.connect(analyser);
    analyser.connect(context.destination);

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    function _renderFrame() {
      const musicPlay = requestAnimationFrame(_renderFrame);
      analyser.getByteFrequencyData(frequencyData);

      _isRecord && lineRecord.push(frequencyData[0]);

      _drawFrequency(frequencyData);
    }

    source.loop = true;

    source.start(0);
    _renderFrame();
  });
}

function _drawFrequency(frequencyData) {
  const canvas = document.querySelector('#frequency');
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#00D0FF';
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 取值间隔
  const step = Math.round(frequencyData.length / 60);

  for (let i = 0; i < 60; i++) {
    const energy = (frequencyData[step * i] / 256.0) * 61.8;
    for (let j = 0; j < energy; j ++) {
      // 绘制上半部分
      ctx.beginPath();
      ctx.moveTo(20 * i + 2, 300 + 4 * j);
      ctx.lineTo(20 * (i + 1) - 2, 300 + 4 * j);
      ctx.stroke();
      // 绘制下半部分
      ctx.beginPath();
      ctx.moveTo(20 * i + 2, 300 - 4 * j);
      ctx.lineTo(20 * (i + 1) - 2, 300 - 4 * j);
      ctx.stroke();
    }
    // 绘制水平线
    ctx.beginPath();
    ctx.moveTo(20 * i + 2, 300);
    ctx.lineTo(20 * (i + 1) - 2, 300);
    ctx.stroke();
  }
}