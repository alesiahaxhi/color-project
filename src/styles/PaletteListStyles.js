import { styled } from "@mui/system";
import svgBg from "./confetti-doodles.svg";

// Apply background color and image to html and body elements
document.documentElement.style.backgroundColor = "#0E105F";
document.documentElement.style.backgroundImage = `url(${svgBg})`;
document.documentElement.style.backgroundPosition = "center";

const Root = styled("div")(
  ({ theme }) => `
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;

    h1 { 
      font-size: 2rem;
    }

    /* Media query for 'xs' screen size */
    @media (max-width: 576px) {
     text-align: center;
    }
  `
);

const Container = styled("div")(
  ({ theme }) => `
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;

    /* Media query for 'xl' screen size */
    @media (max-width: 1400px) {
      width: 70%;
    }
    /* Media query for 'lg' screen size */
    @media (max-width: 1200px) {
      width: 80%;
    }
    /* Media query for 'md' screen size */
    @media (max-width: 992px) {
      width: 85%;
    }
    /* Media query for 'sm' screen size */
    @media (max-width: 768px) {
      width: 90%;
    }
    /* Media query for 'xs' screen size */
    @media (max-width: 576px) {
      width: 100%;
    }
  `
);

const Nav = styled("nav")(
  ({ theme }) => `
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: white;
    align-items: center;
    & a {
      color: white;
      text-decoration: none;
    }

    /* Media query for 'xs' screen size */
    @media (max-width: 576px) {
      flex-direction: row;
      align-items: center;
      margin-left: 80px;
      & a {
        margin-right: 160px;
      }
    }
  `
);

const Palettes = styled("div")(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-gap: 5%;

    /* Media query for 'md' screen size */
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 50%); // Display one palette per row
      justify-content: center; // Center the items horizontally
    }
    /* Media query for 'xs' screen size */
    @media (max-width: 576px) {
      grid-template-columns: repeat(1, 60%); // Display one palette per row
      justify-content: center; // Center the items horizontally
      grid-gap: 3rem;
    }
  `
);

export { Root, Container, Nav, Palettes };
