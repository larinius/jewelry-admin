// material-ui
import { styled } from "@mui/material/styles";

// project imports
import Header from "./Header";
import Footer from "./Footer";
import AppBar from "ui-component/extended/AppBar";

const HeaderWrapper = styled("div")(({ theme }) => ({
    paddingTop: 30,
    overflowX: "hidden",
    overflowY: "clip",
    [theme.breakpoints.down("md")]: {
        paddingTop: 42,
    },
}));

const SecondWrapper = styled("div")(({ theme }) => ({
    paddingTop: 160,
    [theme.breakpoints.down("md")]: {
        paddingTop: 60,
    },
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
    <>
        <HeaderWrapper id="home">
            <AppBar />
            <Header />
        </HeaderWrapper>
    </>
);

export default Landing;
