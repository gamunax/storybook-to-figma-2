export interface PreloaderProperties {
  /** Text for displaying as the loading screen title. */
  loadingTitle?: string;
  
  /** Text for displaying as the loading screen message. */
  loadingMessage?: string;
  
  /** Loading progress message. */
  loadingProgress?: string;
  
  /** Positions the loading message. Values: 'top', 'bottom', 'left', 'right'. */
  loadingMessagePosition?: string;
  
  /** Set the color of preloader background. */
  preloaderOverlayBg?: string;
  
  /** Sets if the preloader should take up the whole page. */
  fullPageLoader?: boolean;
  
  /** Input to control when the preloader should be displayed. */
  loading?: boolean;
}
