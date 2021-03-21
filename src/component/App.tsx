/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import store, { RootState } from '../utils/store';
import theme from '../utils/theme';
import Contents from './Contents';
import Header from './Header';
import Footer from './Footer';

export const SizeContext = React.createContext({
  isMobile: false,
  isDesktop: false,
});

const StyledApp: React.FC = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  const isDesktop = useMediaQuery(useTheme().breakpoints.up('lg'));

  const mode = useSelector<RootState, boolean>(
    (state) => state.theme.isDarkTheme
  )
    ? 'dark'
    : 'light';

  return (
    <ThemeProvider theme={theme(mode)}>
      <SizeContext.Provider value={{ isMobile, isDesktop }}>
        <SnackbarProvider>
          <CssBaseline />
          <Header />
          <Contents />
          <Footer />
        </SnackbarProvider>
      </SizeContext.Provider>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StyledApp />
    </Provider>
  );
};

export default App;
