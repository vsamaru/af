import '@emotion/react';

import type { EditorContainer } from '@blocksuite/editor';

import { nextDarkColorScheme, nextLightColorScheme } from './color-scheme';
import type { AffineTheme, AffineThemeCSSVariables } from './types';

const basicFontFamily =
  'apple-system, BlinkMacSystemFont,Helvetica Neue, Tahoma, PingFang SC, Microsoft Yahei, Arial,Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji,Segoe UI Symbol, Noto Color Emoji';

export const getLightTheme = (
  editorMode: EditorContainer['mode']
): AffineTheme => {
  return {
    palette: {
      mode: 'light',
    },
    editorMode,
    colors: {
      pageBackground: '#fff',
      hoverBackground: 'rgba(0,0,0,.04)',
      innerHoverBackground: '#E9E9EC',
      popoverBackground: '#fff',
      tooltipBackground: '#261499',
      codeBackground: '#f2f5f9',
      codeBlockBackground: '#FAFBFD',
      hubBackground: '#fbfbfc',
      cardHoverBackground: '#f8f9ff',
      warningBackground: '#FFF9C7',
      errorBackground: '#FFDED8',
      modalBackground: 'rgba(0, 0, 0, 0.6)',

      textColor: '#424149',
      secondaryTextColor: '#8E8D91',
      edgelessTextColor: '#3A4C5C',
      handleColor: '#c7c3d9',
      linkColor2: '#5438FF',
      linkVisitedColor: '#5438FF',
      tooltipColor: '#fff',
      codeColor: '#77757D',
      placeHolderColor: '#C0BFC1',
      selectedColor: 'rgba(84, 56, 255, 0.04)',
      disableColor: '#A9A9AD',
      lineNumberColor: '#77757D',
      ...nextLightColorScheme,
    },
    font: {
      title: '36px',
      h1: '28px',
      h2: '26px',
      h3: '24px',
      h4: '22px',
      h5: '20px',
      h6: '18px',
      base: '16px',
      sm: '14px',
      xs: '12px',

      family: `Avenir Next, Poppins, ${basicFontFamily}`,
      numberFamily: `Roboto Mono, ${basicFontFamily}`,
      codeFamily: `Space Mono, Consolas, Menlo, Monaco, Courier, monospace, ${basicFontFamily}`,
      lineHeight: 'calc(1em + 8px)',
    },
    zIndex: {
      modal: 1000,
      popover: 100,
    },
    shadow: {
      popover: '0px 0px 12px rgba(66, 65, 73, 0.14)',
      modal:
        '0px 0px 20px 4px rgba(65, 64, 72, 0.24), 0px 0px 12px rgba(66, 65, 73, 0.14)',
      tooltip: '0px 0px 4px rgba(0, 0, 0, 0.14)',
    },
    space: {
      paragraph: '8px',
    },
    radius: {
      popover: '10px',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  };
};

export const getDarkTheme = (
  editorMode: EditorContainer['mode']
): AffineTheme => {
  const lightTheme = getLightTheme(editorMode);

  return {
    ...lightTheme,
    palette: {
      mode: 'dark',
    },
    colors: {
      pageBackground: '#2c2c2c',
      hoverBackground: 'rgba(0,0,0,.04)',
      innerHoverBackground: '#5A5A5A',
      popoverBackground: '#1F2021',
      tooltipBackground: '#0C0A15',
      codeBackground:
        editorMode === 'edgeless'
          ? lightTheme.colors.codeBackground
          : '#505662',
      codeBlockBackground: '#292C33',
      hubBackground: '#272727',
      cardHoverBackground: '#363636',
      warningBackground: '#FFF9C7',
      errorBackground: '#FFDED8',
      modalBackground: 'rgba(0, 0, 0, 0.8)',

      textColor: '#fff',
      secondaryTextColor: '#8E8D91',
      edgelessTextColor: '#3A4C5C',
      handleColor: '#c7c3d9',
      linkColor2: '#0C0A15',
      linkVisitedColor: '#505FAB',
      tooltipColor: '#fff',
      codeColor:
        editorMode === 'edgeless' ? lightTheme.colors.codeColor : '#BDDBFD',
      placeHolderColor: '#C7C7C7',
      selectedColor: 'rgba(104, 128, 255, 0.1)',
      disableColor: '#4b4b4b',
      lineNumberColor: '#888A9E',
      ...nextDarkColorScheme,
    },
    shadow: {
      popover:
        '0px 1px 10px -6px rgba(24, 39, 75, 0.08), 0px 3px 16px -6px rgba(24, 39, 75, 0.04)',
      modal: '0px 4px 24px #161616',

      tooltip: '1px 1px 4px rgba(0, 0, 0, 0.14)',
    },
  };
};

/**
 * @deprecated these theme will be removed in the future
 */
export const globalThemeVariables: (
  theme: AffineTheme
) => AffineThemeCSSVariables = theme => {
  return {
    '--affine-theme-mode': theme.palette.mode,
    '--affine-editor-mode': theme.editorMode,

    '--affine-primary-color': theme.colors.primaryColor,

    '--affine-page-background': theme.colors.pageBackground,
    '--affine-popover-background': theme.colors.popoverBackground,
    '--affine-hover-background': theme.colors.hoverBackground,
    '--affine-code-background': theme.colors.codeBackground,
    '--affine-tooltip-background': theme.colors.tooltipBackground,

    '--affine-hub-background': theme.colors.hubBackground,
    '--affine-card-hover-background': theme.colors.cardHoverBackground,

    '--affine-text-color': theme.colors.textColor,
    '--affine-secondary-text-color': theme.colors.secondaryTextColor,
    '--affine-edgeless-text-color': theme.colors.edgelessTextColor,
    '--affine-link-color': theme.colors.linkColor,
    // In dark mode, normal text`s (not bold) color
    '--affine-link-color2': theme.colors.linkColor2,
    '--affine-link-visited-color': theme.colors.linkVisitedColor,
    '--affine-icon-color': theme.colors.iconColor,
    '--affine-block-handle-color': theme.colors.handleColor,
    '--affine-code-color': theme.colors.codeColor,
    '--affine-code-block-background': theme.colors.codeBlockBackground,
    '--affine-quote-color': theme.colors.quoteColor,
    '--affine-selected-color': theme.colors.selectedColor,
    '--affine-placeholder-color': theme.colors.placeHolderColor,
    '--affine-border-color': theme.colors.borderColor,
    '--affine-disable-color': theme.colors.disableColor,
    '--affine-tooltip-color': theme.colors.tooltipColor,
    '--affine-line-number-color': theme.colors.lineNumberColor,

    '--affine-modal-shadow': theme.shadow.modal,
    '--affine-popover-shadow': theme.shadow.popover,

    '--affine-font-h1': theme.font.h1,
    '--affine-font-h2': theme.font.h2,
    '--affine-font-h3': theme.font.h3,
    '--affine-font-h4': theme.font.h4,
    '--affine-font-h5': theme.font.h5,
    '--affine-font-h6': theme.font.h6,
    '--affine-font-base': theme.font.base,
    '--affine-font-sm': theme.font.sm, // small
    '--affine-font-xs': theme.font.xs, // tiny

    '--affine-line-height': theme.font.lineHeight,

    '--affine-z-index-modal': theme.zIndex.modal,
    '--affine-z-index-popover': theme.zIndex.popover,

    '--affine-font-family': theme.font.family,
    '--affine-font-number-family': theme.font.numberFamily,
    '--affine-font-code-family': theme.font.codeFamily,

    '--affine-paragraph-space': theme.space.paragraph,
    '--affine-popover-radius': theme.radius.popover,

    '--affine-zoom': '1',
    '--affine-scale': 'calc(1 / var(--affine-zoom))',
  };
};
