import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  blueDark: '#101820FF',

  black: '#0B0B0B',
  white: '#F0F2F3',
  red: '#FF0000',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,

    cardPrimaryBackground: palette.purplePrimary,
    cardSecondaryBackground: palette.greenLight,

    text: palette.white,
    secondaryText: palette.black,
    delete: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    default: {},
    header: {
      fontFamily: 'Roboto-Bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'mainForeground',
    },
    subheader: {
      fontFamily: 'Roboto-SemiBold',
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 30,
      color: 'mainForeground',
    },
    body: {
      fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 24,
      color: 'mainForeground',
    },
  },
  dark: false,
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.blueDark,
    mainForeground: palette.white,

    cardSecondaryBackground: palette.greenDark,
    secondaryText: palette.white,
    text: palette.black,
    delete: palette.red,
  },
  dark: true,
};

export default theme;
