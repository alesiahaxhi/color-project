import { styled } from "@mui/system";

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

export { Root, BoxContent };
