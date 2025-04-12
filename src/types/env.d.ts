// For SVG imports
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// For JSON imports
declare module '*.json' {
  const value: any;
  export default value;
}

// For CSS/SCSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// For image imports
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webm';
declare module '*.webp';

// For react-lottie
declare module 'react-lottie' {
  export interface LottieProps {
    options: {
      loop: boolean;
      animationData: any;
      rendererSettings?: {
        preserveAspectRatio?: string;
      };
    };
    height?: number;
    width?: number;
    isStopped?: boolean;
    isPaused?: boolean;
    isClickToPauseDisabled?: boolean;
    eventListeners?: Array<{ eventName: string; callback: () => void }>;
    style?: React.CSSProperties;
  }

  const Lottie: React.FC<LottieProps>;
  export default Lottie;
}
