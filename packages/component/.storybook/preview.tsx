import React from 'react';
import '@blocksuite/editor/themes/affine.css';
import '../src/theme/global.css';

import { getDarkTheme, getLightTheme, ThemeProvider } from '@affine/component';
import { useDarkMode } from 'storybook-dark-mode';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const lightTheme = getLightTheme('page');
const darkTheme = getDarkTheme('page');

export const decorators = [
  (Story: React.ComponentType) => {
    const isDark = useDarkMode();
    return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Story />
      </ThemeProvider>
    );
  },
];
