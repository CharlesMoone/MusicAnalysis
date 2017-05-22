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

    // source.loop = true;
    source.onended = () => {
      _isRecord = false;
      _drawLineRecord(lineRecord);
    };

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

function _drawLineRecord(lineRecord) {
  const canvas = document.querySelector('#lineRecord');
  const chart = echarts.init(canvas);

  // 神技！静态资源贮存
  const timesCalc = (() => {
    let i = 0;
    return () => {
      return i ++;
    };
  })();

  const lineRecordLength = new Array(lineRecord.length);
  lineRecordLength.fill(0);

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '4%',
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 10,
    }, {
      start: 0,
      end: 10,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
    }],
    xAxis: [{
      type: 'category',
      boundaryGap : false,
      data: lineRecordLength.map(i => timesCalc()),
    }],
    yAxis: [{
      type: 'value',
    }],
    series: [{
      name: '频谱记录',
      type: 'line',
      smooth: true,
      sampling: 'average',
      areaStyle: { normal: {} },
      data: lineRecord,
    }],
  });
}