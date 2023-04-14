export const images = {
  bg_wallpaper: require('./source/bg.png'),
  bg_blue: require('./source/bg_blue.png'),
  bg_line: require('./source/bg_line.png'),
  default: require('./source/default.png'),
};

export type ImageTypes = keyof typeof images;
