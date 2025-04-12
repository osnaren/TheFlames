import animationData from '@assets/flames.json';
import Lottie from 'react-lottie';
import './AnimatedFlames.scss';

import { useState } from 'react';

export default function AnimatedFlames(): JSX.Element {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  setTimeout(() => {
    setIsPaused(true);
  }, 2000);

  const defaultOptions = {
    loop: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div id="loading-bubble" className="flame-animation">
      <Lottie options={defaultOptions} height={250} width={250} isClickToPauseDisabled isPaused={isPaused} />
    </div>
  );
}
