import { styled } from "@mui/material/styles";
import svgBg from "./confetti-doodles.svg";

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  width: "100%",

  h1: {
    fontSize: "2rem",
  },
  // Apply background color and image to html and body elements
  [`@media (max-width: 6000px)`]: {
    "&::before": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#0E105F",
      backgroundImage: `url(${svgBg})`,
      backgroundPosition: "center",
      zIndex: -1,
    },
  },
}));

const BoxContent = styled("div")(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    background-color: rgba(255, 255, 255, 1);
    width: 500px;
    height: 250px;
    border-radius: 20px;
    padding-bottom: 20px;
    & p {
      padding-bottom: 10px;
    }
  `
);

const animationStyles = `
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
`;

export { Root, BoxContent, animationStyles };
