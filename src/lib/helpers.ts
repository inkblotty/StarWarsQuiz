/* STYLE HELPERS */
export const colors = {
  black: '#000',
  green: '#40c1ac',
  lightBlue: '#7edbc5',
  lightRed: '#c8102e',
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
      textColor: dark ? colors.white : colors.black,
    },
    spacingUnit: 4,
    fontSize: {
      heading: 24,
      main: 18,
      small: 14,
      subheading: 22,
    },
  }
});
