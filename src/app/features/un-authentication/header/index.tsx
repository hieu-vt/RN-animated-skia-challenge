import React from 'react';

import Animated, {
  Extrapolation,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInterpolate } from '@animated';
import { Block, Icon, Spacer, Text } from '@components';
import { FlashList } from '@shopify/flash-list';

const arr = Array(50)
  .fill(0)
  .map((_, i) => i);

export const HeaderAnimated = () => {
  // state
  const insets = useSafeAreaInsets();

  const translationY = useSharedValue(0);

  const scaleHeader = useInterpolate(
    translationY,
    [30, 55],
    [1, 0.8],
    Extrapolation.CLAMP,
  );

  const translateYHeader = useInterpolate(
    translationY,
    [30, 55],
    [0, -55],
    Extrapolation.CLAMP,
  );

  const translateXHeader = useInterpolate(
    translationY,
    [30, 55],
    [0, -30],
    Extrapolation.CLAMP,
  );

  const opacityHeader = useInterpolate(
    translationY,
    [0, 55],
    [1, 0],
    Extrapolation.CLAMP,
  );

  const opacityPinHeader = useInterpolate(
    translationY,
    [50, 70],
    [0, 1],
    Extrapolation.CLAMP,
  );

  const translateYPinHeader = useInterpolate(
    translationY,
    [50, 70],
    [80, 50],
    Extrapolation.CLAMP,
  );

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  }, []);

  const restyleHeader = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleHeader.value },
      { translateY: translateYHeader.value },
      { translateX: translateXHeader.value },
    ],
    opacity: opacityHeader.value,
  }));

  const restylePinHeader = useAnimatedStyle(() => ({
    opacity: opacityPinHeader.value,
  }));

  const restyleIconPinHeader = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYPinHeader.value }],
  }));

  // render
  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 100,
            backgroundColor: 'green',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1080,
          },
          restylePinHeader,
        ]}>
        <Animated.View
          style={[
            {
              transform: [{ translateY: 80 }],
            },
            restyleIconPinHeader,
          ]}>
          <Block
            direction="row"
            justifyContent="space-between"
            paddingHorizontal={20}>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
            <Block>
              <Icon icon="heart" size={22} />
            </Block>
          </Block>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        style={{ marginHorizontal: 8, paddingTop: insets.top }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Spacer height={80} />

        <Block
          borderRadius={16}
          paddingBottom={32}
          color="white"
          paddingHorizontal={8}
          paddingVertical={16}>
          <Animated.View style={[restyleHeader]}>
            <Block
              direction="row"
              justifyContent="space-between"
              color="transparent">
              <Block middle>
                <Icon icon="heart" />
                <Text text="Nap Tien" />
              </Block>
              <Block middle>
                <Icon icon="heart" />
                <Text text="Nap Tien" />
              </Block>
              <Block middle>
                <Icon icon="heart" />
                <Text text="Nap Tien" />
              </Block>
              <Block middle>
                <Icon icon="heart" />
                <Text text="Nap Tien" />
              </Block>
              <Block middle>
                <Icon icon="heart" />
                <Text text="Nap Tien" />
              </Block>
            </Block>
          </Animated.View>
        </Block>

        <Spacer height={16} />
        <FlashList
          data={arr}
          estimatedItemSize={50}
          contentContainerStyle={{
            paddingVertical: 10,
            backgroundColor: 'white',
          }}
          renderItem={({ item }) => (
            <Block height={30} width={'100%'} middle>
              <Text text={'Header of momo: ' + item.toString()} />
            </Block>
          )}
        />
      </Animated.ScrollView>
    </>
  );
};
