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
    colors: {
      backgroundColor: string;
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
    colors: {
      backgroundColor: dark ? colors.black : colors.white,
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
