import { displayFlex, styled, textEllipsis } from '@affine/component';

export const StyledSplitLine = styled('div')(({ theme }) => {
  return {
    width: '1px',
    height: '20px',
    background: theme.colors.borderColor,
    marginRight: '12px',
  };
});

export const StyleWorkspaceInfo = styled('div')(({ theme }) => {
  return {
    marginLeft: '15px',
    width: '202px',
    p: {
      height: '20px',
      fontSize: theme.font.sm,
      ...displayFlex('flex-start', 'center'),
    },
    svg: {
      marginRight: '10px',
      fontSize: '16px',
      flexShrink: 0,
    },
    span: {
      flexGrow: 1,
      ...textEllipsis(1),
    },
  };
});

export const StyleWorkspaceTitle = styled('div')(({ theme }) => {
  return {
    fontSize: theme.font.base,
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: '10px',
    maxWidth: '200px',
    ...textEllipsis(1),
  };
});

export const StyledCard = styled('div')<{
  active?: boolean;
}>(({ theme, active }) => {
  const borderColor = active ? theme.colors.primaryColor : 'transparent';
  return {
    width: '310px',
    height: '124px',
    cursor: 'pointer',
    padding: '16px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    border: `1px solid ${borderColor}`,
    ...displayFlex('flex-start', 'flex-start'),
    marginBottom: '24px',
    transition: 'background .2s',
    background: theme.palette.mode === 'light' ? '#FFF' : '#2C2C2C',
    ':hover': {
      background: theme.colors.cardHoverBackground,
    },
  };
});

export const StyledCreateWorkspaceCard = styled('div')(({ theme }) => {
  return {
    width: '310px',
    height: '124px',
    cursor: 'pointer',
    padding: '16px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    transition: 'all .1s',
    ...displayFlex('flex-start', 'flex-start'),
    color: theme.colors.secondaryTextColor,

    ':hover': {
      background: theme.colors.cardHoverBackground,
      color: theme.colors.textColor,
      '.add-icon': {
        borderColor: theme.colors.primaryColor,
        color: theme.colors.primaryColor,
      },
    },
  };
});

export const StyledModalHeaderLeft = styled('div')(() => {
  return { ...displayFlex('flex-start', 'center') };
});
export const StyledModalTitle = styled('div')(({ theme }) => {
  return {
    fontWeight: 600,
    fontSize: theme.font.h6,
  };
});

export const StyledHelperContainer = styled('div')(({ theme }) => {
  return {
    color: theme.colors.iconColor,
    marginLeft: '15px',
    fontWeight: 400,
    fontSize: theme.font.h6,
    ...displayFlex('center', 'center'),
  };
});

export const StyledModalContent = styled('div')({
  height: '534px',
  padding: '8px 40px',
  marginTop: '72px',
  overflow: 'auto',
  ...displayFlex('space-between', 'flex-start', 'flex-start'),
  flexWrap: 'wrap',
});
export const StyledOperationWrapper = styled('div')(() => {
  return {
    ...displayFlex('flex-end', 'center'),
  };
});

export const StyleWorkspaceAdd = styled('div')(() => {
  return {
    width: '58px',
    height: '58px',
    borderRadius: '100%',
    background: '#f4f5fa',
    border: '1.5px dashed #f4f5fa',
    transition: 'background .2s',
    fontSize: '24px',
    ...displayFlex('center', 'center'),
  };
});
export const StyledModalHeader = styled('div')(() => {
  return {
    width: '100%',
    height: '72px',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '24px 24px 0 0',
    padding: '0 40px',
    ...displayFlex('space-between', 'center'),
  };
});
