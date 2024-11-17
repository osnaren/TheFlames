import './flamesLogo.scss';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FlameGif from '../../assets/flame.gif';

export default function FlamesLogo() {
  return (
    <div className="flamesLogo__container">
      <div className="flamesLogo__circleBase"></div>
      <div className="flamesLogo__circleOuter"></div>
      <div className="flamesLogo__flameGif">
        <img src={FlameGif} alt="flame" />
      </div>
    </div>
  );
}
