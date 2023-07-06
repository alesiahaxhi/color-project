import { styled } from "@mui/system";

import DeleteIcon from "@mui/icons-material/Delete";

const Root = styled("div")(
  ({ theme }) => `
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -4px;
  &:hover svg {
    color: white;
    transition: all 0.3s ease-in-out;
    transform: scale(1.5);
  }
  `
);

const BoxContent = styled("div")(
  ({ theme }) => `
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 10px;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  `
);

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
