import './flamesLogo.scss';

import FlameGif from '@assets/flame.gif';

export default function FlamesLogo(): JSX.Element {
  return (
    <div className="flamesLogo__container">
      <div className="flamesLogo__circleBase" />
      <div className="flamesLogo__circleOuter" />
      <div className="flamesLogo__flameGif">
        <img src={FlameGif} alt="flame" />
      </div>
    </div>
  );
}
