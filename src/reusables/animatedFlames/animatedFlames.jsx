import "./animatedFlames.scss";
import Lottie from "react-lottie";
import animationData from "../../assets/flames.json";

import { useState } from "react";

export default function AnimatedFlames() {
  const [isPaused, setIsPaused] = useState(false);

  setTimeout(() => {
    setIsPaused(true);
  }, 2000);

  const defaultOptions = {
    loop: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div id="loading-bubble" className="flame-animation">
      <Lottie
        options={defaultOptions}
        height={250}
        width={250}
        isClickToPauseDisabled
        isPaused={isPaused}
      ></Lottie>
    </div>
  );
}
