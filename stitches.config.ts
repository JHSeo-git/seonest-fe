import { createStitches } from '@stitches/react';
import * as colors from '@/constants/colorTokens';
import type * as Stitches from '@stitches/react';

export const {
  //
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches({
  media: {
    '3xl': '(min-width: 2200px)', // 137.5rem
    '2xl': '(min-width: 1920px)', // 120rem
    xl: '(min-width: 1440px)', // 90rem
    lg: '(min-width: 1280px)', // 80rem
    md: '(min-width: 1024px)', // 64rem
    sm: '(min-width: 788px)', // 49.25rem
    xs: '(min-width: 576px)', // 36rem
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  theme: {
    colors: colors.lightColors,
    fonts: {
      // base: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
      base: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
      ubuntu: `'Ubuntu', Ubuntu, Roboto, 'Open Sans', 'Helvetica Neue', sans-serif`,
      code: `Fira Code, Consolas, Monaco, Andale Mono, Ubuntu mono, monospace`,
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
      maxWidth: '770px', // 48.125rem
      headerHeight: '70px', // 4.375rem
      footerHeight: '120px', // 4.375rem
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '10',
      2: '20',
      3: '30',
      4: '40',
      5: '50',
      fixed: '500',
      modal: '998',
      max: '999',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    shadows: {
      muiShadow1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      muiShadow2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      muiShadow3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      muiShadow4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      muiShadow5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      interactiveShadow1:
        '0px 5px 16px -5px rgba(22, 23, 24, 0.35), 0px 5px 10px -7px rgba(22, 23, 24, 0.2)',
      interactiveShadow2:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    },

    letterSpacings: {},
    transitions: {},
    fontWeights: {},
    lineHeights: {},
    borderStyles: {},
    borderWidths: {},
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
      flexDirection: value,
    }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),
    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
      alignItems: value,
    }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
      alignContent: value,
    }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
      justifyContent: value,
    }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),
    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value,
    }),
    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value,
    }),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),
    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
    ellipsisLine: (value: number) => ({
      display: '-webkit-box',
      WebkitLineClamp: value,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
    /**
     * @see https://tailwindcss.com/docs/transition-property
     */
    tst: (
      value:
        | 'base'
        | 'all'
        | 'colors'
        | 'opacity'
        | 'shadow'
        | 'transform' = 'base'
    ) => {
      switch (value) {
        case 'base':
          return {
            'transition-property':
              'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        case 'all':
          return {
            'transition-property': 'all',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        case 'colors':
          return {
            'transition-property':
              'color, background-color, border-color, text-decoration-color, fill, stroke',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        case 'opacity':
          return {
            'transition-property': 'opacity',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        case 'shadow':
          return {
            'transition-property': 'box-shadow',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        case 'transform':
          return {
            'transition-property': 'transform',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
        default:
          return {
            'transition-property':
              'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '0.2s',
          };
      }
    },
  },
});

export type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme('dark', {
  colors: colors.darkColors,
});
