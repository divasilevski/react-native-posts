import React, { useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Canvas from 'react-native-canvas';
import { useEffect } from 'react/cjs/react.development';
import { THEME } from '../theme';

const MARGIN = 10;
const PADDING = 30;
const RATIO = 9 / 16;
const WIDTH = Dimensions.get('window').width - MARGIN * 2;
const HEIGHT = WIDTH * RATIO;
const DPI = 2;
const DPI_WIDTH = WIDTH * DPI;
const DPI_HEIGHT = HEIGHT * DPI;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const VIEW_WIDTH = DPI_WIDTH;
const ROW_COUNT = 5;

export const CanvasChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = DPI_WIDTH;
    canvas.height = DPI_HEIGHT;
    const context = canvas.getContext('2d');
    context.scale(1 / DPI, 1 / DPI);

    createAxis(context, data);
    createLine(context, data);
  }, [data]);

  return <Canvas style={styles.canvas} ref={canvasRef} />;
};

const styles = StyleSheet.create({
  center: {
    padding: 10,
  },
  canvas: {
    width: WIDTH,
    height: HEIGHT,
  },
});

function createLine(ctx, data) {
  const [yMin, yMax] = boundaries(data);
  const xRatio = VIEW_WIDTH / (data.length - 1);
  const yRatio = VIEW_HEIGHT / (yMax - yMin);

  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.strokeStyle = THEME.MAIN_COLOR;
  data.forEach(([_, y], i) => {
    ctx.lineTo(i * xRatio, DPI_HEIGHT - PADDING - (y - yMin) * yRatio);
  });
  ctx.stroke();
  ctx.closePath();
}

function createAxis(ctx, data) {
  const [yMin, yMax] = boundaries(data);
  const step = DPI_HEIGHT / ROW_COUNT;
  const textStep = (yMax - yMin) / ROW_COUNT;

  ctx.beginPath();
  ctx.strokeStyle = '#bbb';
  ctx.font = 'normal 24px OpenSans';
  ctx.fillStyle = '#96a2aa';
  for (let i = 1; i <= ROW_COUNT; i++) {
    const y = step * i;
    const text = Math.round(yMax - textStep * i);
    ctx.fillText(text.toString(), 5, y + PADDING - 10);
    ctx.moveTo(0, y + PADDING);
    ctx.lineTo(DPI_WIDTH, y + PADDING);
  }
  ctx.stroke();
  ctx.closePath();
}

function boundaries(data) {
  let min;
  let max;

  for (const [, y] of data) {
    if (typeof min !== 'number') min = y;
    if (typeof max !== 'number') max = y;

    if (min > y) min = y;
    if (max < y) max = y;
  }

  return [min, max];
}
