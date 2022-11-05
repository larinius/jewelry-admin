import {
    Box,
    Paper,
    Button,
    Stack,
    Grid,
    Container,
    TextField,
    Tabs,
    Tab,
    Typography,
    MenuItem,
    FormLabel,
    FormGroup,
    FormControl,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Image from "mui-image";
import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dummy from "../../assets/images/dummy.jpg";
import TinyMCE from "ui-component/TinyMCE";
import useProduct from "../../hooks/useProduct";
import Dropzone, { useDropzone } from "react-dropzone";
import { Container as ContainerDnd, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable as arrayMove } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { IconGripHorizontal, IconPlus } from "@tabler/icons";
// import useBrand from "../../hooks/useBrand";

import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const BrandItem = () => {
    const theme = useTheme();

    // ==== API and Auth0 =============

    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    const accessToken = getAccessTokenSilently({
        audience: audience,
    });

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;
    let { id } = useParams();
    const query = `${apiUrl}/${id}`;

    const { isLoading, error, data } = useQuery([query], () => axios.get(query));

    // =============================



    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Logo = ({ src, size }) => {
        return (
            <>
                <Paper elevation={3}>
                    <Box sx={{ height: size, width: size }}>
                        <Image src={src} height={size - 3} width={size - 3} />
                    </Box>
                </Paper>
            </>
        );
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const LanguageSelect = () => {
        return (
            <>
                <Box display="flex" justifyContent="flex-end">
                    <FormControl>
                        <FormLabel id="language-select">Language</FormLabel>
                        <RadioGroup row name="language-select">
                            <FormControlLabel value="en" control={<Radio />} label="En" />
                            <FormControlLabel value="he" control={<Radio />} label="He" />
                            <FormControlLabel value="ru" control={<Radio />} label="Ru" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </>
        );
    };

    const MainParamsForm = () => {
        return (
            <>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2} direction="column" justifyContent="start">
                        <TextField id="title" label="Title" defaultValue={data?.data.title} />
                    </Stack>
                </Box>
            </>
        );
    };

    const SEOParamsForm = () => {
        return (
            <>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <LanguageSelect />
                    <Stack spacing={2} direction="column" justifyContent="start">
                        <TextField id="seo_h1" fullWidth label="H1" defaultValue={data?.data.seoH1} />
                        <TextField id="seo_title" multiline rows={2} fullWidth label="Title" defaultValue={data?.data.seoTitle} />
                        <TextField id="seo_descr" multiline rows={3} fullWidth label="Descr." defaultValue={data?.data.seoDescription} />
                    </Stack>
                    <Box mt={5}>
                        <Typography m={1} variant="h3" component="h3">
                            Full description
                        </Typography>
                        <Typography m={1} variant="subtitle2" component="p">
                            shown on page bottom (seo text)
                        </Typography>
                        <TinyMCE />
                    </Box>
                    <Box m={2}>
                        <FormControlLabel control={<Checkbox />} label="Noindex" />
                    </Box>
                </Box>
            </>
        );
    };

    const Characteristics = () => {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                            <Item>
                                <Paper variant="outlined" elevation={0}>
                                    <MainParamsForm />
                                </Paper>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={6} xl={6}>
                            <Item>
                                <Box display="flex" justifyContent="flex-end">
                                    <Paper elevation={3}>
                                        <Image
                                            src={data?.data ? data?.data.logo : Dummy}
                                            sx={{ maxHeight: 300, maxWidth: 300, display: { xs: "none", md: "inline" }, fit: "contain" }}
                                        />
                                    </Paper>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    const PropertyTabs = () => {
        return (
            <>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <Paper sx={{ p: 1 }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Characteristics" value="1" />
                                    <Tab label="SEO" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Characteristics />
                            </TabPanel>
                            <TabPanel value="2">
                                <SEOParamsForm />
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </Box>
                <Box mt={5} sx={{ width: "100%", typography: "body1" }}>
                    <ButtonsArea />
                </Box>
            </>
        );
    };

    const ButtonsArea = () => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.error.main }}>
                            Delete
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.primary.main }}>
                            Save and create new
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.success.main }}>
                            Save
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    return (
        <>
            <PropertyTabs />
        </>
    );
};

export default BrandItem;
