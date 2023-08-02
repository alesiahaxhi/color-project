import { styled } from "@mui/system";
import chroma from "chroma-js";

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
  /* Media query for 'xl' screen size */
  @media (max-width: 1400px) {
    width: 25%;
    height: 20%;
  }
  /* Media query for 'md' screen size */
  @media (max-width: 992px) {
    width: 50%;
    height: 30%;
  }
  /* Media query for 'sm' screen size */
  @media (max-width: 768px) {
    width: 50%;
    height: 10%;
  }
  /* Media query for 'xs' screen size */
  @media (max-width: 576px) {
    width: 100%;
    height: 5%;
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
  color: ${(props) =>
    chroma(props.color).luminance() <= 0.1
      ? "rgba(255,255,255, 0.8)"
      : "rgba(0,0,0, 0.7)"};
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  & svg {
    padding-right: 20px;
    padding-bottom: 10px;
  }
  `
);

export { Root, BoxContent };
