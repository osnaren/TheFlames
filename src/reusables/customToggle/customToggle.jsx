import { useState } from 'react';
import './customToggle.scss';

export function CustomToggle() {
  return (
    <div className="toggle-button-cover">
      <div className="button-cover">
        <div className="button r" id="button-1">
          <input type="checkbox" className="checkbox" />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </div>
    </div>
  );
}
