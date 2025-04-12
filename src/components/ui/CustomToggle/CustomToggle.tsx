import { useState } from 'react';
import './CustomToggle.scss';

interface CustomToggleProps {
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

export function CustomToggle({ onChange, defaultChecked = false }: CustomToggleProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <div className="toggle-button-cover">
      <div className="button-cover">
        <div className="button r" id="button-1">
          <input type="checkbox" className="checkbox" checked={checked} onChange={handleChange} />
          <div className="knobs" />
          <div className="layer" />
        </div>
      </div>
    </div>
  );
}
