import { useState } from "react";
import { Navbar } from "./Navbar";
import ColorBox from "./ColorBox";

import "./Palette.css";

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const changeFormat = (format) => {
    setFormat(format);
  };

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const { colors, paletteName, emoji } = props.palette;

  const colorBoxes = colors[level].map((color) => (
    <ColorBox key={color.name} background={color[format]} name={color.name} />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        format={format}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <div className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </div>
    </div>
  );
};
export default Palette;
