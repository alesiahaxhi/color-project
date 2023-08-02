import { useState } from "react";
import { Link } from "react-router-dom";

import chroma from "chroma-js";
import copy from "copy-to-clipboard";

import "./styles/ColorBox.css";

const ColorBox = (props) => {
  const [copied, setCopied] = useState(false);
  const { name, background, paletteId, id, showLink } = props;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    copy(background);
  };
  const isDark = chroma(background).luminance() <= 0.1;
  const isLight = chroma(background).luminance() >= 0.6;
  return (
    <div style={{ background }} className="ColorBox" onClick={handleCopy}>
      <div
        style={{ background }}
        className={`copy-overlay ${copied && "show"}`}
      />
      <div className={`copy-msg ${copied && "show"}`}>
        <h1>Copied!</h1>
        <p className={isLight && "dark-text"}>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span className={isDark ? "light-text" : "dark-text"}>{name}</span>
        </div>
        <button
          className={`copy-button ${isLight && "dark-text"}`}
          onClick={handleCopy}
        >
          COPY
        </button>
      </div>
      {showLink && (
        <Link
          to={`/palette/${paletteId}/${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={`see-more ${isLight && "dark-text"}`}>MORE</span>
        </Link>
      )}
    </div>
  );
};

export default ColorBox;
