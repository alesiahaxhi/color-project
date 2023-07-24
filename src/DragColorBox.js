import { styled } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";

import { Root, BoxContent } from "./styles/DragColorBoxStyles";

export default function DragColorBox(props) {
  let { color, name, handleClick } = props;
  return (
    <Root style={{ backgroundColor: color }}>
      <BoxContent>
        <span> {name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>
    </Root>
  );
}
