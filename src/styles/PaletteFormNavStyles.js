import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const Root = styled("div")(
  ({ theme }) => `
      display: flex;
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
  ...(open && {
    marginLeft: 240, // Adjust this value based on your drawer width
    width: `calc(100% - 450px)`, // Adjust this value based on your drawer width
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export { Root, StyledAppBar };
