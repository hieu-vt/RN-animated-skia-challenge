import { RegisterNavigationParams } from '@model/navigation-params';
import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DUOLINGO_HEADER = 'DuoHeader',

  AUTHORIZE = 'AUTHORIZE',
  LINE_CHART = 'HOME',
  MOMO_HEADER = 'HOME1',
}

export type RootStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: RegisterNavigationParams;
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
  [APP_SCREEN.LINE_CHART]: undefined;
  [APP_SCREEN.MOMO_HEADER]: undefined;
  [APP_SCREEN.DUOLINGO_HEADER]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;
