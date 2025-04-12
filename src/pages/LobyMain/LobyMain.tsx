import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import flamesText from '../../assets/flamesText.png';
import machineData from '../../assets/machine.json';
import arrowData from '../../assets/nav.json';
import theText from '../../assets/theText.png';
import writingData from '../../assets/writing.json';
import FlamesLogo from '../../reusables/flamesLogo/flamesLogo';
import './lobyMain.scss';

const defaultOptions = {
  loop: true,
  animationData: arrowData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function LobyMain(): JSX.Element {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [showBody, setShowBody] = useState<boolean>(false);

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setShowBody(true);
      const bodyTimer = setTimeout(() => {
        setShowHeader(true);
      }, 500);

      return () => clearTimeout(bodyTimer);
    }, 1000);

    return () => clearTimeout(headerTimer);
  }, []);

  const handleContentClick = (mode: string): void => {
    const lobyElement = document.getElementById('loby');
    if (lobyElement) {
      lobyElement.classList.add('animate__loby');
    }
    setTimeout(() => {
      navigate(mode);
    }, 2100);
  };

  return (
    <div className="lobyMain__container animate__animated" id="loby">
      {showHeader && (
        <div className="lobyMain__header animate__animated animate__zoomIn">
          <div className="header__text1">
            <img src={theText} alt="the text" className="the_icon" />
          </div>
          <div
            className="header__icon"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/');
              }
            }}
          >
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
            <div
              className="content__container left__content"
              onClick={() => handleContentClick('/flames')}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleContentClick('/flames');
                }
              }}
            >
              <div className="content__text">AUTO MODE</div>
              <div className="left__auto">
                <Lottie
                  options={{
                    loop: true,
                    animationData: machineData,
                  }}
                  width={100}
                />
              </div>
            </div>
            <div className="content__arrow left__arrow">
              <Lottie options={defaultOptions} width={50} />
            </div>
          </div>
          <div className="animate__animated animate__fadeInRight animate__delay-1s lobyMain__content__container lobyMain__right__container">
            <div
              className="content__container right__content"
              onClick={() => handleContentClick('/manual')}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleContentClick('/manual');
                }
              }}
            >
              <div className="content__text">MANUAL MODE</div>
              <div className="right__auto">
                <Lottie
                  options={{
                    loop: true,
                    animationData: writingData,
                  }}
                  width={100}
                />
              </div>
            </div>
            <div className="content__arrow right__arrow">
              <Lottie options={defaultOptions} width={50} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LobyMain;
