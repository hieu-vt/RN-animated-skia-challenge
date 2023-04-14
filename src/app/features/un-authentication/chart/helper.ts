import { Skia } from '@shopify/react-native-skia';
import { extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';
import moment from 'moment';

import {
  CHART_HEIGHT,
  CHART_WIDTH,
  MAX_POINT_LINE,
  X_Y_SPACER,
} from './contain';
import { HoldingsPnLDataType } from './type';

const getNewData = (data: Array<HoldingsPnLDataType>) => {
  const numPointsToDisplay = 6;

  // Group data by month
  const dataByMonth: Record<string, any> = {};

  data.forEach(d => {
    const month = new Date(d.date).getMonth() + 1;

    const year = new Date(d.date).getFullYear();

    const key = `${year}-${month}`;

    if (!dataByMonth[key]) {
      dataByMonth[key] = {
        date: new Date(`${year}-${month}-01`),
        pnlSum: 0,
        count: 0,
      };
    }

    dataByMonth[key].pnlSum += d.pnl;

    dataByMonth[key].count += 1;
  });

  // Calculate average PnL for each month
  const monthlyAverages = Object.values(dataByMonth).map(d => ({
    date: d.date,
    pnl: d.pnlSum / d.count,
  }));

  // Sort monthly averages by date
  monthlyAverages.sort((a, b) => a.date - b.date);

  // Select 6 points to display
  let displayedPoints: Array<HoldingsPnLDataType> = [];
  if (monthlyAverages.length <= numPointsToDisplay) {
    displayedPoints = monthlyAverages;
  } else {
    const intervalSize = monthlyAverages.length / numPointsToDisplay;

    displayedPoints.push(monthlyAverages[0]);

    for (
      let i = 1;
      i < monthlyAverages.length - 2 * intervalSize;
      i += intervalSize
    ) {
      displayedPoints.push(monthlyAverages[Math.floor(i)]);
    }

    displayedPoints.push(monthlyAverages[monthlyAverages.length - 1]);
  }

  return displayedPoints.map(item => ({
    ...item,
    date: moment(item.date, 'YYYY-MM-DD').toString(),
  }));
};

export const makeGraph = (data: Array<HoldingsPnLDataType>) => {
  let curData: Array<HoldingsPnLDataType> = [];
  if (data.length < MAX_POINT_LINE) {
    curData = Array(MAX_POINT_LINE)
      .fill(0)
      .map((_, index) => (data[index] ? data[index] : data[data.length - 1]));
  } else if (data.length === MAX_POINT_LINE) {
    curData = data;
  } else {
    curData = getNewData(data);
  }

  const lastData = curData[curData.length - 1];

  const [minPnL, maxPnL] = extent(curData, (d: HoldingsPnLDataType) => d.pnl);

  const xScale = scaleTime()
    .domain(
      extent(
        curData,
        (d: HoldingsPnLDataType) => new Date(d.date),
      ) as Iterable<Date>,
    )
    .range([X_Y_SPACER, CHART_WIDTH - X_Y_SPACER]);

  const yScale = scaleLinear()
    .domain([minPnL, maxPnL] as Iterable<number>)
    .range([CHART_HEIGHT - X_Y_SPACER, X_Y_SPACER]);

  const lineChart = line<HoldingsPnLDataType>()
    .x((d: HoldingsPnLDataType) => xScale(new Date(new Date(d.date))))
    .y((d: HoldingsPnLDataType) => yScale(d.pnl))
    .curve(curveBasis);

  const path = lineChart(curData);

  const skPath = Skia.Path.MakeFromSVGString(path!);

  return {
    curve: skPath!,
    lastPoint: {
      x: xScale(new Date(lastData.date)),
      y: yScale(lastData.pnl),
    },
  };
};
