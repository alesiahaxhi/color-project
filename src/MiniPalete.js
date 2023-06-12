import { styled } from "@mui/system";

const Root = styled("div")(
  ({ theme }) => `
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    overflow: hidden;
    &:hover: {
        curosr: pointer;
    }
  `
);

const Colors = styled("div")(
  ({ theme }) => `
    background-color: gray;
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

const MiniPalette = (props) => {
  const { paletteName, emoji } = props;
  return (
    <Root>
      <Colors />
      <Title>
        {paletteName} <Emoji>{emoji}</Emoji>
      </Title>
    </Root>
  );
};
export default MiniPalette;
