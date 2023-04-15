import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { DuoHeader } from '@features/un-authentication/duo-header';
import { HeaderAnimated } from '@features/un-authentication/header';
import { HomeLineChart } from '@features/un-authentication/home';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group
        screenOptions={{
          freezeOnBlur: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
        }}>
        <RootStack.Screen
          name={APP_SCREEN.MOMO_HEADER}
          component={HeaderAnimated}
        />
        <RootStack.Screen
          name={APP_SCREEN.LINE_CHART}
          component={HomeLineChart}
        />
        <RootStack.Screen
          name={APP_SCREEN.DUOLINGO_HEADER}
          component={DuoHeader}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
