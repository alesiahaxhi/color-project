import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const Root = styled("div")(
  ({ theme }) => `
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    overflow: hidden;
    height: 190px;
    &:hover {
        cursor: pointer;
    }
  `
);

const Colors = styled("div")(
  ({ theme }) => `
    background-color: #dae1e4;
    border-radius: 5px;
    overflow: hidden;
    height: 150px;
    width: 100%;
  `
);

const Title = styled("h5")(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding-top: 0.5rem;
  font-size: 1rem;
  position: relative;
  `
);

const Emoji = styled("span")(
  ({ theme }) => `
  margin-left: 0.5rem;
  font-size: 1.5rem;
  `
);

const MiniColor = styled("div")(
  ({ theme }) => `
  height: 25%;
  width: 20%;
  display: inline-block;
  margin: 0 auto;
  position: relative;
  margin-bottom: -3.5px;
  `
);

const MiniPalette = (props) => {
  const { colors, id, paletteName, emoji } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/palette/${id}`);
  };

  const miniColorBoxes = colors.map((color) => (
    <MiniColor style={{ backgroundColor: color.color }} key={color.name} />
  ));
  return (
    <Root onClick={handleClick}>
      <Colors>{miniColorBoxes}</Colors>
      <Title>
        {paletteName} <Emoji>{emoji}</Emoji>
      </Title>
    </Root>
  );
};
export default MiniPalette;
