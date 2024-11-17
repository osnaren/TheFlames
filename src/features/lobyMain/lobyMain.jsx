import './lobyMain.scss';
import FlamesLogo from '../../reusables/flamesLogo/flamesLogo.jsx';
import Footer from '../../reusables/footer/footer';
import theText from '../../assets/theText.png';
import flamesText from '../../assets/flamesText.png';
import Lottie from 'react-lottie';
import arrowData from '../../assets/nav.json';
import machineData from '../../assets/machine.json';
import writingData from '../../assets/writing.json';
import $ from 'jquery';

const defaultOptions = {
  loop: true,
  animationData: arrowData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';

function LobyMain() {
  const history = useHistory();
  const [showHeader, setShowHeader] = useState(false);
  const [showBody, setShowBody] = useState(false);
  setTimeout(() => {
    setShowBody(true);
    setTimeout(() => {
      setShowHeader(true);
    }, 500);
  }, 1000);

  const handleContentClick = (mode) => {
    document.getElementById('loby').classList.add('animate__loby');
    setTimeout(() => {
      history.push(mode);
    }, 2100);
  };
  return (
    <div className="lobyMain__container animate__animated" id="loby">
      {showHeader && (
        <div className="lobyMain__header animate__animated animate__zoomIn">
          <div className="header__text1">
            <img src={theText} alt="the text" className="the_icon" />
          </div>
          <div className="header__icon" onClick={() => history.push('/')}>
            <FlamesLogo />
          </div>
          <div className="header__text2">
            <img src={flamesText} alt="Flames" className="flames_icon" />
          </div>
        </div>
      )}
      {showBody && (
        <div className="lobyMain__content">
          <div className="animate__animated animate__fadeInLeft animate__delay-1s lobyMain__content__container lobyMain__left__container">
            <div className="content__container left__content" onClick={() => handleContentClick('/flames')}>
              <div className="content__text">AUTO MODE</div>
              <div className="left__auto">
                <Lottie
                  options={{
                    loop: true,
                    animationData: machineData,
                  }}
                  width={100}
                ></Lottie>
              </div>
            </div>
            <div className="content__arrow left__arrow">
              <Lottie options={defaultOptions} width={50}></Lottie>
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight animate__delay-1s lobyMain__content__container lobyMain__right__container">
            <div className="content__container right__content" onClick={() => handleContentClick('/manual')}>
              <div className="content__text">MANUAL MODE</div>
              <div className="right__auto">
                <Lottie
                  options={{
                    loop: true,
                    animationData: writingData,
                  }}
                  width={100}
                ></Lottie>
              </div>
            </div>
            <div className="content__arrow right__arrow">
              <Lottie options={defaultOptions} width={50}></Lottie>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LobyMain;
