import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/home.json';
import './notFound.scss';

const defaultOptions = {
  loop: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isStopped, setIsStopped] = useState<boolean>(true);

  useEffect(() => {
    setIsPaused(true);
    setIsStopped(true);
  }, []);

  return (
    <>
      <div className="container-star container">
        {/* Star elements - repeating divs with class star-1 and star-2 */}
        {[...Array(30)].map((_, i) => (
          <div key={`star-1-${i}`} className="star-1" />
        ))}
        {[...Array(30)].map((_, i) => (
          <div key={`star-2-${i}`} className="star-2" />
        ))}
      </div>
      <div className="container-bird container">
        {/* Bird elements - repeating bird structures */}
        {[...Array(6)].map((_, i) => (
          <div key={`bird-${i}`} className="bird bird-anim">
            <div className="bird-container">
              <div className="wing wing-left">
                <div className="wing-left-top" />
              </div>
              <div className="wing wing-right">
                <div className="wing-right-top" />
              </div>
            </div>
          </div>
        ))}
        <div className="container-title">
          <div className="title">
            <div className="number">4</div>
            <div className="moon">
              <div className="face">
                <div className="mouth" />
                <div className="eyes">
                  <div className="eye-left" />
                  <div className="eye-right" />
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>
          <div className="subtitle">Oops. Looks like you took a wrong turn.</div>
          <div
            className="back__button"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/');
              }
            }}
          >
            <div className="back__button__text">Go back</div>
            <div className="home__animation">
              <Lottie
                options={defaultOptions}
                height={250}
                width={250}
                isClickToPauseDisabled
                isPaused={isPaused}
                isStopped={isStopped}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
