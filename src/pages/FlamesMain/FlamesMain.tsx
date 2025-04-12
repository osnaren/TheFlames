import './FlamesMain.scss';

import { loadAll } from '@tsparticles/all';
import { Engine } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '@components';
import FlamesText from '../../assets/theFlamesText.svg';
import FlamesLogo from '../../reusables/flamesLogo/flamesLogo';
import GamePlay from '../gamePlay/gamePlay';

export default function FlamesMain(): JSX.Element {
  const navigate = useNavigate();
  const [viewParticles, setViewParticles] = useState<boolean>(true);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setViewParticles(true);
    }, 1000);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      <div className="flamesMain__container animate__animated animate__fadeIn">
        {viewParticles && (
          <>
            {init && (
              <Particles
                id="tsparticles"
                options={{
                  fpsLimit: 120,
                  interactivity: {
                    events: {
                      onClick: {
                        enable: false,
                        mode: 'push',
                      },
                      onHover: {
                        enable: true,
                        mode: 'repulse',
                      },
                      resize: true,
                    },
                    modes: {
                      push: {
                        quantity: 4,
                      },
                      repulse: {
                        distance: 200,
                        duration: 1,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: '#ffffff',
                    },
                    links: {
                      color: '#ffffff',
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                    },
                    collisions: {
                      enable: false,
                    },
                    move: {
                      directions: 'none',
                      enable: true,
                      outModes: {
                        default: 'bounce',
                      },
                      random: false,
                      speed: 1,
                      straight: false,
                    },
                    number: {
                      density: {
                        enable: true,
                        area: 800,
                      },
                      value: 30,
                    },
                    opacity: {
                      value: 0.5,
                    },
                    shape: {
                      type: 'circle',
                    },
                    size: {
                      value: { min: 1, max: 5 },
                    },
                  },
                  detectRetina: true,
                }}
              />
            )}
            <div className="header__border" />
            <div className="flamesMain__container__header">
              <div
                className="flamesMain__container__header__icon"
                role="button"
                tabIndex={0}
                onClick={() => navigate('/')}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate('/');
                  }
                }}
              >
                <FlamesLogo />
              </div>
              <div className="flamesMain__container__header__title">
                <img src={FlamesText} alt="Flames" />
              </div>
            </div>
            <div className="flamesMain__container__content">
              <GamePlay />
              <div>OutPut Steps</div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
