import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Root,
  Colors,
  Title,
  Emoji,
  MiniColor,
} from "./styles/MiniPaletteStyles";

const MiniPalette = (props) => {
  const { colors, id, paletteName, emoji, handleDelete } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/palette/${id}`);
  };

  const miniColorBoxes = colors.map((color) => (
    <MiniColor style={{ backgroundColor: color.color }} key={color.name} />
  ));

  const deletePalette = (e) => {
    e.stopPropagation();
    handleDelete(id);
  };
  return (
    <Root onClick={handleClick}>
      <DeleteIcon
        onClick={deletePalette}
        sx={{
          color: "white",
          backgroundColor: "#eb3d30",
          width: "20px",
          height: "20px",
          position: "absolute",
          right: "0px",
          top: "0px",
          padding: "10px",
          zIndex: 10,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      <Colors>{miniColorBoxes}</Colors>
      <Title>
        {paletteName} <Emoji>{emoji}</Emoji>
      </Title>
    </Root>
  );
};
export default MiniPalette;
