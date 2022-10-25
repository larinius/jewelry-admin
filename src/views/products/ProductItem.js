/* eslint-disable react/prop-types */
import { Box, Paper, Button, Stack, Grid, Container, TextField, Tabs, Tab, Typography, MenuItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Image from "mui-image";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dummy from "../../assets/images/dummy.jpg";
import TinyMCE from "ui-component/TinyMCE";

import useProduct from "./../../lib/useProduct";

const ProductItem = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [category, setCategory] = useState();

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const theme = useTheme();
    let { id } = useParams();
    let product = useProduct(id);

    const categories = [
        { id: 1, title: "Rings" },
        { id: 2, title: "Earrings" },
        { id: 3, title: "Pendants" },
    ];

    useEffect(() => {
        console.log("URL:", id);
        console.log(product);
        setCategory(product?.category.title)
    }, [id, product]);

    const Thumb = ({ src, size }) => {
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

    const MainParamsForm = () => {
        return (
            <>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2} direction="column" justifyContent="start">
                        <TextField required id="sku" label="SKU" defaultValue={product?.sku} />
                        <TextField id="title"  label="Title" defaultValue={product?.title} />
                        <TextField
                            id="pricer"
                            label="Price"
                            type="number"
                            defaultValue={product?.price}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="select-category"
                            select
                            label="Category"
                            value={category}
                            onChange={handleCategory}
                            helperText="Select category"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.id} value={option.title}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </TextField>
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
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2} direction="column" justifyContent="start">

                        <TextField id="seo_h1" fullWidth label="H1" defaultValue={product?.seoH1} />
                        <TextField id="seo_title" fullWidth label="Title" defaultValue={product?.seoTitle} />
                        <TextField id="seo_descr" fullWidth label="Descr." defaultValue={product?.seoDescription} />
                        <FormControlLabel control={<Checkbox />} label="Noindex" />
                    </Stack>
                    <TinyMCE/>

                </Box>
            </>
        );
    };

    const Characteristics = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid xs={8}>
                        <Item>
                            <MainParamsForm />
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Thumb src={product ? product.Image[0].path : Dummy} size={300} />
                        </Item>
                    </Grid>
                </Grid>
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
                                    <Tab label="Photo" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Characteristics />
                            </TabPanel>
                            <TabPanel value="2">
                                <SEOParamsForm/>
                            </TabPanel>
                            <TabPanel value="3">
                                <Box sx={{ height: 500, width: "100%" }}>
                                    <Thumb src={product?.Image[0].path} size={300} />
                                </Box>
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

export default ProductItem;
