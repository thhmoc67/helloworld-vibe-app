/** HelloWorld revamp brand palette — from HW Brand Pitch + color swatches. */
const brand = {
  helloLime: '#69A30E',
  yellowWorld: '#FFC644',
  lightBlue: '#33B4F1',
  purple: '#6341D6',
  grey: '#1C1E23',
  error: '#D92D20',
} as const;

const lime = {
  50: '#F7FEE7',
  100: '#D9F99E',
  200: '#BEF264',
  300: '#A3E635',
  400: '#84CC16',
  500: '#65A30C',
  600: '#4D7B0C',
  700: '#3E6111',
  800: '#365312',
  900: '#1A2E05',
} as const;

const yellow = {
  50: '#FEFCD0',
  100: '#FEE9B9',
  200: '#FDE2A1',
  300: '#FDDB8A',
  400: '#FDD373',
  500: '#FCCC5B',
  600: '#FCC544',
  700: '#FBB02C',
  800: '#FBB615',
  900: '#F3AA00',
} as const;

const gray = {
  25: '#FDFDFD',
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E9EAEB',
  300: '#D5D7DA',
  400: '#A4A7AE',
  500: '#717880',
  600: '#535B62',
  700: '#414851',
  800: '#252B37',
  900: '#101828',
} as const;

const red = {
  50: '#FEF3F2',
  100: '#FEE4E2',
  200: '#FECDCA',
  300: '#FDA29B',
  400: '#F97066',
  500: '#F04438',
  600: '#D92D20',
  700: '#B42318',
  800: '#912018',
  900: '#7A271A',
} as const;

const blue = {
  50: '#F0F9FF',
  100: '#E0F2FE',
  200: '#B9E6FE',
  300: '#7CD4FD',
  400: '#38BFFA',
  500: '#0BA5EC',
  600: '#0086C9',
  700: '#026AA2',
  800: '#065986',
  900: '#0B4A6F',
} as const;

const purpleScale = {
  50: '#F9F5FF',
  100: '#F4EBFF',
  200: '#E9D7FE',
  300: '#D6BBFB',
  400: '#B692F6',
  500: '#9E77ED',
  600: '#7F56D9',
  700: '#6941C6',
  800: '#53389E',
  900: '#42307D',
} as const;

export default {
  ...brand,
  white: '#FFFFFF',
  black: '#000000',
  lime,
  yellow,
  gray,
  red,
  blue,
  purpleScale,
  // Semantic aliases (used across screens)
  green: brand.helloLime,
  lightGreen: lime[50],
  grey600: gray[600],
  grey800: gray[800],
  grey900: gray[900],
  lightBlue: brand.lightBlue,
  primeBlue: blue[900],
  offWhite300: gray[50],
  // Input / form tokens
  textPrimary: gray[900],
  textSecondary: gray[600],
  textPlaceholder: gray[500],
  textLabel: gray[700],
  borderDefault: gray[300],
  borderError: red[600],
  focusRing: lime[100],
  surfaceDisabled: gray[100],
} as const;
