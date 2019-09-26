/* STYLE HELPERS */
export const colors : { [key: string]: string } = {
  black: '#000',
  darkGray: '#3f3f3f',
  green: '#40c1ac',
  lightBlue: '#7edbc5',
  lightGray: '#bdbdbd',
  lightRed: '#c8102e',
  medGray: '#808080',
  red: '#900',
  white: '#fff',
  yellow: '#fbe122',
};

export interface ThemeProps {
  theme: {
    backgroundImage: string;
    colors: {
      backgroundColor: string;
      disabledColor: string;
      focusColor: string;
      errorColor: string;
      successColor: string;
      textColor: string;
      [key: string]: string;
    },
    spacingUnit: number;
    fontSize: {
      heading: number;
      main: number;
      small: number;
      subheading: number;
    };
  };
};
export const makeTheme = (dark = false) => ({
  theme: {
    backgroundImage: dark
      ? 'http://www.sompaisoscatalans.cat/simage/182/1829981/star-wars-flat-wallpaper.png'
      : 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5bff4614711385.56287ebd2a58e.jpg',
    colors: {
      backgroundColor: dark ? colors.black : colors.white,
      disabledColor: dark ? colors.darkGray : colors.lightGray,
      errorColor: colors.lightRed,
      focusColor: dark ? colors.lightRed : colors.lightBlue,
      successColor: colors.green,
      textColor: dark ? colors.white : colors.darkGray,
      ...colors,
    },
    spacingUnit: 4,
    fontSize: {
      heading: 32,
      main: 20,
      small: 12,
      subheading: 24,
    },
  }
});
