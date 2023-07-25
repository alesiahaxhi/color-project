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
    &:hover  {
        cursor: pointer;
    }
    &:hover svg {
        opacity: 1;
    }
  `
);

const Colors = styled("div")(
  ({ theme }) => `
    background-color: #8ea8b8;
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
  margin-bottom: -4px;
  `
);

export { Root, Colors, Title, Emoji, MiniColor };
