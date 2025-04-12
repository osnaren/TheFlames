import AnimatedFlames from '@reusables/AnimatedFlames/AnimatedFlames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

function PreLoader(): JSX.Element {
  const [hidden, setHidden] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setHidden(true), 3500); // Hide content after 3.5s
    const timer2 = setTimeout(() => navigate('/loby'), 4500); // Navigate after 4.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className={`preloader ${hidden ? 'preloader-hidden' : ''}`} id="preloader">
      <div id="container" className="animate__animated">
        <AnimatedFlames />
      </div>
      <div className="cp-text animate__animated" id="copyright">
        © Copyright 2022 OS Labs.
      </div>
      <div className="ve-text animate__animated" id="version">
        Version 1.10
      </div>
    </div>
  );
}

export default PreLoader;
