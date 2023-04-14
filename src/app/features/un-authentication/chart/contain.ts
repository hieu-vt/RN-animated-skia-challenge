import { Dimensions } from 'react-native';

import { HoldingsPnLDataType } from './type';

const { width: WIDTH_SCREEN } = Dimensions.get('screen');

export const HoldingsPnLData: Array<HoldingsPnLDataType> = [
  { date: '2022-01-01', pnl: 1000 },
  { date: '2022-02-01', pnl: 1200 },
  { date: '2022-03-01', pnl: 800 },
  { date: '2022-04-01', pnl: 1500 },
  { date: '2022-05-01', pnl: 1300 },
  { date: '2022-06-01', pnl: 5800 },
  { date: '2022-07-01', pnl: 2000 },
  { date: '2022-08-01', pnl: 2500 },
  { date: '2022-09-01', pnl: 2200 },
  { date: '2022-10-01', pnl: 2700 },
  { date: '2022-11-01', pnl: 4000 },
  { date: '2022-12-01', pnl: 3200 },
  { date: '2023-01-01', pnl: 8400 },
  { date: '2023-03-01', pnl: 800 },
  { date: '2023-04-01', pnl: 600 },
];

export const CHART_WIDTH = WIDTH_SCREEN;

export const CHART_HEIGHT = 220;

export const X_Y_SPACER = 16;

export const POINT_R = 6;

export const POINT_R1 = POINT_R + 2.5;

export const DATE = ['1D', '1W', '1M', '3M', '1Y', 'MAX'];

export const MAX_POINT_LINE = 6;
