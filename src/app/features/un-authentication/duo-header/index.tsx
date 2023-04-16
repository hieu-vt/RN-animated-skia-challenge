import React from 'react';
import { Dimensions } from 'react-native';

import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useInterpolateColor } from '@animated';
import { Block, Spacer, Text } from '@components';
import { FlashList } from '@shopify/flash-list';

const { height: HeightScreen } = Dimensions.get('window');

const FlashListAnimated = Animated.createAnimatedComponent(FlashList);

function onRandomColor() {
  const letters = '0123456789ABCDEF';

  let color = '';

  while (color === '' || color === '#000000' || color === '#FFFFFF') {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    color = '#' + color;
  }

  return color;
}

const data = Array(10)
  .fill(0)
  .map((_, i) => ({
    content: i,
    bg: onRandomColor(),
  }));

export const DuoHeader = () => {
  // state
  const translateY = useSharedValue(0);

  const colorBgValue = useInterpolateColor(
    translateY,
    data.map((_, i) => i * HeightScreen),
    data.map(item => item.bg),
    'RGB',
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = withTiming(event.contentOffset.y, {
      duration: 100,
      easing: Easing.linear,
    });
  }, []);

  const reStyle = useAnimatedStyle(() => ({
    backgroundColor: colorBgValue.value,
  }));

  // render
  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            backgroundColor: data[0].bg,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1080,
          },
          reStyle,
        ]}>
        <Block height={100} paddingTop={50}>
          <Text text="Main header" />
        </Block>
      </Animated.View>
      <Spacer height={90} />
      <FlashListAnimated
        onScroll={scrollHandler}
        data={data}
        style={{ backgroundColor: 'white' }}
        renderItem={({ item }: any) => (
          <Block color="white">
            <Block height={50} color={item?.bg}>
              <Text text={`Header: ${item?.content}`} />
            </Block>
            <Block height={HeightScreen - 50}>
              <Text text={item?.content + 1} center />
            </Block>
          </Block>
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={HeightScreen}
      />
    </>
  );
};
