import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    Box, Button, Checkbox, FormControl,
    FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio,
    RadioGroup, Stack, Tab, TextField, Typography
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "mui-image";
import React from "react";
import { useParams } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import TinyMCE from "ui-component/TinyMCE";
import Dummy from "../../assets/images/dummy.jpg";
import {useCategory} from "../../hooks/apiHooks";

const CategoryItem = () => {
    
    const theme = useTheme();
    let { id } = useParams();
    let {category} = useCategory(id);
    
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const categories = [
        { id: 1, title: "Rings" },
        { id: 2, title: "Earrings" },
        { id: 3, title: "Pendants" },
    ];

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
                        <TextField id="title" label="Title" defaultValue={category?.title} />
                        <TextField
                            id="select-category"
                            select
                            label="Parent category"
                            value={category}
                            onChange={handleCategory}
                            helperText="Can be empty or select existing category from list"
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
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <LanguageSelect />
                    <Stack spacing={2} direction="column" justifyContent="start">
                        <TextField id="seo_h1" fullWidth label="H1" defaultValue={category?.seoH1} />
                        <TextField id="seo_title" multiline rows={2} fullWidth label="Title" defaultValue={category?.seoTitle} />
                        <TextField id="seo_descr" multiline rows={3} fullWidth label="Descr." defaultValue={category?.seoDescription} />
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
                                            src={category ? category.thumb : Dummy}
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

export default CategoryItem;
