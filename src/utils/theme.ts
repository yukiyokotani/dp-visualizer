import {
  createMuiTheme,
  Theme,
  colors,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';
import { Shadows } from '@material-ui/core/styles/shadows';
import { lightGreen, red } from '@material-ui/core/colors';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';

const baseConfig: ThemeOptions = {
  direction: 'ltr',
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  props: {
    MuiTextField: {
      margin: 'dense',
    },
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
  },
};

const themeConfigs: {
  mode: 'light' | 'dark';
  palette: PaletteOptions;
  shadows: Shadows;
  overrides?: Overrides;
}[] = [
  {
    mode: 'light',
    palette: {
      type: 'light',
      action: {
        active: colors.grey[600],
      },
      background: {
        default: '#f5f5f5',
        paper: '#fafafa',
      },
      primary: {
        main: '#2196f3',
        light: '#6ec6ff',
        dark: '#0069c0',
      },
      secondary: {
        main: '#e91e63',
        light: '#ff6090',
        dark: '#b0003a',
      },
      error: red,
      success: lightGreen,
      text: {
        primary: colors.grey[900],
        secondary: colors.grey[600],
      },
    },
    shadows: softShadows,
  },
  {
    mode: 'dark',
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
      },
      background: {
        default: '#1d1c21',
        paper: '#262529',
      },
      primary: {
        main: '#0288d1',
        light: '#5eb8ff',
        dark: '#005b9f',
      },
      secondary: {
        main: '#c2185b',
        light: '#fa5788',
        dark: '#8c0032',
      },
      error: red,
      success: lightGreen,
      text: {
        primary: colors.grey[300],
        secondary: colors.grey[500],
      },
    },
    shadows: strongShadows,
  },
];

const theme = (mode: 'light' | 'dark'): Theme => {
  const themeConfig = themeConfigs.find((c) => c.mode === mode);

  return responsiveFontSizes(createMuiTheme({ ...baseConfig, ...themeConfig }));
};

export default theme;
