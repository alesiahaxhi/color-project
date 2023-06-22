import { useState } from "react";
import copy from "copy-to-clipboard";

import "./ColorBox.css";
import { Link } from "react-router-dom";

const ColorBox = (props) => {
  const [copied, setCopied] = useState(false);
  const { name, background, paletteId, id } = props;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    copy(background);
  };

  return (
    <div style={{ background }} className="ColorBox" onClick={handleCopy}>
      <div
        style={{ background }}
        className={`copy-overlay ${copied && "show"}`}
      />
      <div className={`copy-msg ${copied && "show"}`}>
        <h1>Copied!</h1>
        <p>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button" onClick={handleCopy}>
          COPY
        </button>
      </div>
      <Link
        to={`/palette/${paletteId}/${id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="see-more">MORE</span>
      </Link>
    </div>
  );
};

export default ColorBox;
