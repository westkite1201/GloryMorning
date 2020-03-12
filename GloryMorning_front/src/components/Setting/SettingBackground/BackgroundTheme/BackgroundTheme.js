import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { observer } from 'mobx-react';
import UseStores from '../../UseStores.js';
import './BackgroundTheme.scss';
const BackgroundTheme = observer(() => {
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const { setting } = UseStores();
  const handleChange = (color, event) => {
    console.log('color event', event);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
    setting.setBackgroundColor(color.hex);
  };
  return (
    <div className="color-picker-pallete">
      <ChromePicker onChange={handleChange} color={setting.backgroundColor} />
    </div>
  );
});
export default BackgroundTheme;
