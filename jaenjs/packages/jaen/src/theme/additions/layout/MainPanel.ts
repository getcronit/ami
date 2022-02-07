const MainPanel = {
  baseStyle: {
    ml: {
      base: 'none',
      xl: '275px'
    },
    position: 'relative',
    maxWidth: '100%',
    maxHeight: '100%',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    transitionDuration: '.2s, .2s, .35s',
    transitionProperty: 'top, bottom, width',
    transitionTimingFunction: 'linear, linear, ease'
  }
}

export const MainPanelComponent = {
  components: {
    MainPanel
  }
}
