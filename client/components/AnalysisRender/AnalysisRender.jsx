import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './style.css';
import { loadWebAssembly } from 'utils/webAssembly';

const URL_MUSIC_HARDER_BETTER_FASTER_STRONGER = '/resources/music/Harder-Better-Faster-Stronger.mp3';


class AnalysisRender extends Component {
  static propTypes = {
    classNames: PropTypes.string,
  };

  static defaultProps = {
    classNames: '',
  };

  constructor(props) {
    super(props);

    this.state = {};

    this._drawFrequency = this._drawFrequency.bind(this);
    this._audioAnalysis = this._audioAnalysis.bind(this);
  }

  componentDidMount() {
    this._audioAnalysis();

    this._getWebAssembly();
  }

  async _getWebAssembly() {
    const instance = await loadWebAssembly('/resources/wasm/hello.wasm');

    console.log(instance.exports);
  }

  async _getMusicBuffer(url) {
    const response = await fetch(url);
    return response.arrayBuffer();
  }

  async _audioAnalysis() {
    let _isRecord = true;
    const lineRecord = [];

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const [source, analyser] = [context.createBufferSource(), context.createAnalyser()];

    const response = await this._getMusicBuffer(URL_MUSIC_HARDER_BETTER_FASTER_STRONGER);

    context.decodeAudioData(response, buffer => {
      source.buffer = buffer;
      source.connect(analyser);
      analyser.connect(context.destination);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      const _this = this;

      function _renderFrame() {
        const musicPlay = requestAnimationFrame(_renderFrame);
        analyser.getByteFrequencyData(frequencyData);

        _isRecord && lineRecord.push(frequencyData[0]);

        _this._drawFrequency(frequencyData);
      }

      source.loop = true;

      window.source = source;

      source.start(0);
      _renderFrame();
    });
  }

  _drawFrequency(frequencyData) {
    const canvas = this.refs.frequency;

    const { innerWidth:width, innerHeight:height } = window;

    canvas.width = width;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#00D0FF';
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 取值间隔
    const step = Math.round(frequencyData.length / 60);

    for (let i = 0; i < 48; i++) {
      const energy = (frequencyData[step * i] / 256.0) * 61.8 / 2;
      for (let j = 0; j < energy; j ++) {
        // 绘制上半部分
        ctx.beginPath();
        ctx.moveTo(16 * i + 2, 200 + 4 * j);
        ctx.lineTo(16 * (i + 1) - 2, 200 + 4 * j);
        ctx.stroke();
        // 绘制下半部分
        ctx.beginPath();
        ctx.moveTo(16 * i + 2, 200 - 4 * j);
        ctx.lineTo(16 * (i + 1) - 2, 200 - 4 * j);
        ctx.stroke();
      }
      // 绘制水平线
      ctx.beginPath();
      ctx.moveTo(16 * i + 2, 200);
      ctx.lineTo(16 * (i + 1) - 2, 200);
      ctx.stroke();
    }
  }

  render() {
    return (
      <div className={classnames(this.props.className, style.analysisRender)}>
        <canvas ref="frequency" />
      </div>
    );
  }
}

export default AnalysisRender;