import React, { useCallback, useRef, useState } from 'react';
import { Easing } from 'react-native';

import { Block, Button, Screen, Spacer, Text, Wallpaper } from '@components';
import {
  Canvas,
  Circle,
  Extrapolate,
  Group,
  interpolate,
  Path,
  runTiming,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import {
  CHART_HEIGHT,
  CHART_WIDTH,
  DATE,
  HoldingsPnLData,
  POINT_R,
  POINT_R1,
} from './contain';
import { makeGraph } from './helper';

export const ChartLine = () => {
  // state
  const transition = useValue(1);

  const state = useValue({
    current: 2,
    next: 3,
  });

  const [dateSelected, setDateSelected] = useState('3M');

  // func
  const getHoldingsData = useCallback((type: string) => {
    switch (type) {
      case '1D':
        return HoldingsPnLData.slice(0, 2);

      case '1W':
        return HoldingsPnLData.slice(0, 3);

      case '1M':
        return HoldingsPnLData.slice(0, 6);

      case '3M':
        return HoldingsPnLData.slice(0, 9);
      case '1Y':
        return HoldingsPnLData.slice(0, 12);

      default:
        return HoldingsPnLData;
    }
  }, []);

  const graphData = useRef(DATE.map(item => makeGraph(getHoldingsData(item))));

  const transitionStart = (end: number, item: string) => () => {
    setDateSelected(item);

    state.current = {
      current: state.current.next,
      next: end,
    };

    transition.current = 0;

    runTiming(transition, 1, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  // effect
  const path = useComputedValue(() => {
    const start = graphData.current[state.current.current].curve;

    const end = graphData.current[state.current.next].curve;

    const result = end.interpolate(start, transition.current);

    return result?.toSVGString() ?? end.toSVGString();
  }, [transition, state]);

  const lastPoint = useComputedValue(() => {
    const currLastPoint = graphData.current[state.current.current].lastPoint;

    const nextLastPoint = graphData.current[state.current.next].lastPoint;

    const x = interpolate(
      transition.current,
      [0, 1],
      [currLastPoint.x, nextLastPoint.x],
      Extrapolate.CLAMP,
    );

    const y = interpolate(
      transition.current,
      [0, 1],
      [currLastPoint.y, nextLastPoint.y],
      Extrapolate.CLAMP,
    );

    return { x, y };
  }, [state, transition]);

  // render
  return (
    <Screen scroll unsafe>
      <Block block>
        <Block height={448} overflow="hidden" borderRadius={20}>
          <Block height={167} />
          <Wallpaper backgroundImage="bg_blue" />
          {/* <Block position="absolute" bottom={0} left={0} right={0} top={137}>
            <LocalImage source="bg_line" resizeMode="center" />
          </Block> */}
          <Canvas
            style={{
              height: CHART_HEIGHT,
              width: CHART_WIDTH,
            }}>
            <Group>
              <Circle
                r={POINT_R1}
                color={'white'}
                opacity={0.5}
                c={lastPoint}
              />
              <Path
                path={path}
                style="stroke"
                strokeJoin="round"
                strokeWidth={2}
                color={'white'}
              />
              <Circle r={POINT_R} c={lastPoint} color={'white'} />
            </Group>
          </Canvas>
          <Spacer height={20} />
          <Block
            direction="row"
            justifyContent="space-between"
            paddingHorizontal={8}>
            {DATE.map((item: string, i: number) => (
              <Button onPress={transitionStart(i, item)}>
                <Block
                  width={40}
                  height={23}
                  color={item === dateSelected ? 'white' : 'transparent'}
                  borderRadius={5}
                  justifyContent="center"
                  alignItems="center">
                  <Text
                    text={item}
                    color={item === dateSelected ? '#3C5AA5' : 'white'}
                    fontWeight={item === dateSelected ? '700' : '400'}
                    fontSize={12}
                  />
                </Block>
              </Button>
            ))}
          </Block>
        </Block>
      </Block>
    </Screen>
  );
};
