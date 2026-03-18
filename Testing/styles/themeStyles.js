export const getThemeStyles = (theme, metadata) => {
  switch (theme) {
    case 'dark':
      return {
        backgroundGradient: {
          start: metadata?.backgroundGradientDark?.start,
          end: metadata?.backgroundGradientDark?.end,
        },
      };
    case 'light':
      return {
        backgroundGradient: {
          start: metadata?.backgroundGradient?.start,
          end: metadata?.backgroundGradient?.end,
        },
        login:{
    
        }

      };
    default:
      return {
        backgroundColor: metadata?.backgroundGradient?.start,
        color: metadata?.backgroundColor?.end,
      };
  }
};