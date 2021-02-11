import getRandomInt from '../utils/getRandomInt';

const nickColors = [
  '#FFB900',
  '#E74856',
  '#0078D7',
  '#0099BC',
  '#7A7574',
  '#767676',

  '#FF8C00',
  '#E81123',
  '#0063B1',
  '#2D7D9A',
  '#5D5A58',
  '#4C4A48',

  '#F7630C',
  '#EA005E',
  '#8E8CD8',
  '#00B7C3',
  '#68768A',
  '#69797E',

  '#CA5010',
  '#C30052',
  '#6B69D6',
  '#038387',
  '#515C6B',
  '#4A5459',

  '#DA3B01',
  '#E3008C',
  '#8764B8',
  '#00B294',
  '#567C73',
  '#647C64',

  '#EF6950',
  '#BF0077',
  '#744DA9',
  '#018574',
  '#486860',
  '#525E54',

  '#D13438',
  '#C239B3',
  '#B146C2',
  '#00CC6A',
  '#498205',
  '#847545',

  '#FF4343',
  '#9A0089',
  '#881798',
  '#10893E',
  '#107C10',
  '#7E735F',
];

export const getRandomColor = () => {
  return nickColors[getRandomInt(0, nickColors.length - 1)];
};
