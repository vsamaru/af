import { CssBaseline } from '@mui/material';
import {
  alpha,
  createTheme as createMuiTheme,
  css,
  keyframes,
  styled,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import type { AffineTheme } from './types';

export { alpha, css, keyframes, styled };

export const ThemeProvider = ({
  theme,
  children,
}: PropsWithChildren<{
  theme: AffineTheme;
}>) => {
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
