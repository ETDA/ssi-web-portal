export const initTheme = () => {
  // @ts-ignore
  try {
    if ((window as any).$ && (window as any).$.HSCore) {
      // initialization of unfold
      (window as any).$('.js-hs-unfold-invoker').each(function() {
        // @ts-ignore
        var unfold = new (window as any).HSUnfold((window as any).$(this)).init()
      })
    } else {
      setTimeout(initTheme, 100)
    }
  } catch (e) {

  }

}
