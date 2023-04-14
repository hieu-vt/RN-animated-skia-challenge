import React, { useCallback, useState } from 'react';

import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

import { Block, Screen, Spacer, Text } from '@components';

import { Following } from './following';
import { MyHolding } from './my-holding';

import { ChartLine } from '../chart';

export const Home1 = () => {
  // state
  const [idSelected, setIdSelected] = useState(0);

  // func
  const handleSelectedItem = useCallback(
    (id: number) => () => {
      setIdSelected(id);
    },
    [],
  );

  // render
  return (
    <Screen scroll unsafe>
      <ChartLine />
      <Spacer height={10} />
      <Animated.View>
        <Block
          direction="row"
          height={40}
          color="#F1F1F1"
          marginLeft={16}
          marginRight={16}
          borderRadius={8}
          middle>
          <Block
            block
            middle
            height={32}
            marginLeft={4}
            marginRight={16}
            borderRadius={8}
            justifyContent="center"
            color={idSelected === 0 ? 'white' : 'transparent'}>
            <Text
              text="My holdings"
              fontWeight={idSelected === 0 ? '700' : '400'}
              onPress={handleSelectedItem(0)}
            />
          </Block>
          <Block
            block
            middle
            height={32}
            marginLeft={4}
            marginRight={16}
            borderRadius={8}
            justifyContent="center"
            color={idSelected === 1 ? 'white' : 'transparent'}>
            <Text
              text="Following"
              fontWeight={idSelected === 1 ? '700' : '400'}
              onPress={handleSelectedItem(1)}
            />
          </Block>
        </Block>
        {idSelected === 0 ? (
          <Animated.View
            key={1}
            style={{ backgroundColor: 'yellow' }}
            exiting={FadeOutLeft}
            entering={FadeInLeft}>
            <MyHolding />
          </Animated.View>
        ) : (
          <Animated.View
            key={2}
            style={{ backgroundColor: 'pink' }}
            exiting={FadeOutLeft}
            entering={FadeInLeft}>
            <Following />
          </Animated.View>
        )}
      </Animated.View>
    </Screen>
  );
};
