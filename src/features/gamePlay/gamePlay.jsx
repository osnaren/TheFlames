import './gamePlay.scss';
import { useState, useCallback } from 'react';
import Lottie from 'react-lottie';

import TextField from '@mui/material/TextField';
import animationData from '../../assets/searching.json';
import reactNotify from '../../utils/notifyFunctions';

import maleIcon from '../../assets/man-light.png';
import femaleIcon from '../../assets/woman-light.png';

export default function GamePlay() {
  const [person1Icon, setPerson1Icon] = useState('M');
  const [person2Icon, setPerson2Icon] = useState('F');
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person1NameError, setPerson1NameError] = useState(false);
  const [person2NameError, setPerson2NameError] = useState(false);

  const defaultOptions = {
    loop: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const notifyNameError = (caseNo) => {
    let message = '';
    if (caseNo === 1) {
      message = 'Name must be atleast 3 characters';
    } else if (caseNo === 2) {
      message = 'Name must be alphanumeric';
    }
    reactNotify({
      type: 'error',
      message,
      options: {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    });
  };

  const notifyNameSuccess = () => {
    reactNotify({
      type: 'success',
      message: 'Name is Vaild',
      options: {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    });
  };

  const handleIconToggle = useCallback(
    (e) => {
      const icon = e.target.closest('.gamePlay__input__icon');
      e.stopPropagation();
      if (icon.id === 'person1_icon') {
        if (person1Icon === 'M') {
          setPerson1Icon('F');
        } else {
          setPerson1Icon('M');
        }
      } else if (icon.id === 'person2_icon') {
        if (person2Icon === 'M') {
          setPerson2Icon('F');
        } else {
          setPerson2Icon('M');
        }
      }
    },
    [person1Icon, person2Icon]
  );

  const handleNameChange = useCallback((e) => {
    const input = e.target.closest('.gamePlay__input');
    if (input.id === 'person1Input') {
      setPerson1Name(e.target.value);
    } else if (input.id === 'person2Input') {
      setPerson2Name(e.target.value);
    }
  }, []);

  const handleNameBlur = useCallback(
    (e) => {
      const input = e.target.closest('.gamePlay__input');
      if (input.id === 'person1Input') {
        if (person1Name.length < 3) {
          notifyNameError(1);
          setPerson1NameError(true);
        } else if (person1Name.match(/^[A-Za-z0-9]*$/) === null) {
          notifyNameError(2);
          setPerson1NameError(true);
        } else {
          notifyNameSuccess();
          setPerson1NameError(false);
        }
      } else if (input.id === 'person2Input') {
        if (person2Name.length < 3) {
          notifyNameError(1);
          setPerson2NameError(true);
        } else if (person2Name.match(/^[A-Za-z0-9]*$/) === null) {
          notifyNameError(2);
          setPerson2NameError(true);
        } else {
          notifyNameSuccess();
          setPerson2NameError(false);
        }
      }
    },
    [person1Name, person2Name]
  );

  const handleNameFocus = useCallback((e) => {
    const input = e.target.closest('.gamePlay__input');
    if (input.id === 'person1Input') {
      setPerson1NameError(false);
    } else if (input.id === 'person2Input') {
      setPerson2NameError(false);
    }
  }, []);

  return (
    <>
      {/* <div className="gamePlay__background">
        <img src={TornNote} className="gamePlay__background__image" />
      </div> */}
      <div className="gamePlay__container">
        <div className="gamePlay__input__container">
          <div className="gamePlay__input person1__input" id="person1Input">
            <div
              className="gamePlay__input__icon"
              key={1}
              id="person1_icon"
              role="button"
              tabIndex={0}
              onClick={handleIconToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleIconToggle(e);
                }
              }}
            >
              <img src={person1Icon === 'M' ? maleIcon : femaleIcon} className="imageIcon" alt="Person 1 Icon" />;
            </div>
            <TextField
              id="person1_input"
              className={`input__textField  ${person1NameError ? 'input_error' : ''}`}
              value={person1Name || ''}
              label="Name 1"
              variant="standard"
              error={person1NameError}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onFocus={handleNameFocus}
            />
          </div>
          {!person1NameError && !person2NameError && person1Name.length > 0 && person2Name.length > 0 && (
            <>
              <div id="match-arrows" className="arrows-animation">
                <Lottie options={defaultOptions} height={250} width={250} isClickToPauseDisabled />
              </div>
              <div className="gamePlay__input__vs" />
            </>
          )}
          {(person1NameError || person2NameError || person1Name.length === 0 || person2Name.length === 0) && (
            <div className="gamePlay__input__vs_error">!</div>
          )}
          <div className="gamePlay__input person2__input" id="person2Input">
            <div
              className="gamePlay__input__icon"
              key={2}
              id="person2_icon"
              role="button"
              tabIndex={0}
              onClick={handleIconToggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleIconToggle(e);
                }
              }}
            >
              <img src={person2Icon === 'M' ? maleIcon : femaleIcon} className="imageIcon" alt="Person 2 Icon" />
            </div>
            <TextField
              id="person2_input"
              className={`input__textField ${person2NameError ? 'input_error' : ''}`}
              value={person2Name || ''}
              label="Name 2"
              variant="standard"
              error={person2NameError}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onFocus={handleNameFocus}
            />
          </div>
        </div>
      </div>
    </>
  );
}
