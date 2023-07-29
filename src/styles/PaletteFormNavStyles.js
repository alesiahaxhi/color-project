import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const Root = styled("div")(
  ({ theme }) => `
      display: flex;
      /* Media query for 'xs' screen size */
      @media (max-width: 576px) {
        height: 55px;
      }
    `
);

const StyledAppBar = styled(MuiAppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  "@media (max-width: 576px)": {
    height: "55px", // Adjust the height for small screens (xs screen size)
  },
  ...(open && {
    marginLeft: 291, // Adjust this value based on your drawer width
    width: `calc(100% - 501px)`, // Adjust this value based on your drawer width
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export { Root, StyledAppBar };
