import './mobileViewError.scss';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export default function MobileViewError() {
  return (
    <div className="mobileViewError">
      <h1>Mobile View Error</h1>
    </div>
  );
}
