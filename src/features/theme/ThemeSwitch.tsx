import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControllLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import themeSlice from './themeSlice';
import { AppDispatch, RootState } from '../../utils/store';

const ThemeSwitch: React.FC = () => {
  const { toggleTheme } = themeSlice.actions;
  const isDarkTheme = useSelector<RootState, boolean>(
    (state) => state.theme.isDarkTheme
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <FormControllLabel
      control={
        <Switch
          checked={isDarkTheme}
          color="default"
          inputProps={{ 'aria-label': 'theme-switch' }}
          onClick={() => dispatch(toggleTheme())}
        />
      }
      label={isDarkTheme ? '🌝' : '🌞'}
    />
  );
};

export default ThemeSwitch;
