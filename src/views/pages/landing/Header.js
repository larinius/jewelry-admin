import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";

// third party
import { motion } from "framer-motion";

// project imports
// project imports
import Avatar from "ui-component/extended/Avatar";
import AnimateButton from "ui-component/extended/AnimateButton";
import { gridSpacing } from "store/constant";

// assets
import dashboard from "assets/images/landing/dashboard.png";
import widget1 from "assets/images/landing/widget-1.png";
import widget2 from "assets/images/landing/widget-2.png";

// styles
const HeaderImage = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    borderRadius: "20px",
    transform: "scale(1.7)",
    transformOrigin: theme.direction === "rtl" ? "100% 50%" : "0 50%",
    [theme.breakpoints.down("lg")]: {
        transform: "scale(1.2)",
    },
}));

const HeaderAnimationImage = styled("img")({
    maxWidth: "100%",
    filter: "drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))",
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
    const theme = useTheme();

    return (
        <Container>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={gridSpacing}
                sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
            >
                <Grid item xs={12} md={5}>
                    <Grid container spacing={gridSpacing} sx={{ pr: 10, [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" } }}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sx={{ my: 3.25 }}></Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={7} sx={{ display: { xs: "none", md: "flex" } }}></Grid>
            </Grid>
        </Container>
    );
};

export default HeaderPage;
