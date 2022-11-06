/* eslint-disable react/prop-types */
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
import { useQuery } from "@tanstack/react-query";
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
    let product = useProduct(id)?.data;

    const categories = [
        { id: 1, title: "Rings" },
        { id: 2, title: "Earrings" },
        { id: 3, title: "Pendants" },
    ];

    useEffect(() => {
        console.log("URL:", id);
        console.log(product);
        setCategory(product?.category.title);
    }, [id, product]);

    const [items, setItems] = useState([
        { id: "1", text: "Item 1" },
        { id: "2", text: "Item 2" },
        { id: "3", text: "Item 3" },
        { id: "4", text: "Item 4" },
    ]);

    const onDrop = ({ removedIndex, addedIndex }) => {
        console.log({ removedIndex, addedIndex });
        setItems((items) => arrayMove(items, removedIndex, addedIndex));
    };

    const onDropFile = useCallback((acceptedFiles) => {
        // Do something with the files
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDropFile });

    const SortableThumbs = () => {
        return (
            <ContainerDnd orientation="horizontal" dragHandleSelector=".drag-handle" onDrop={onDrop}>
                {items.map(({ id, text }) => (
                    <Draggable key={id}>
                        <Item>
                            <Paper elevation={3} justifyContent="center" sx={{ width: 100 }}>
                                <Stack>
                                    <Paper variant="outlined" m={5}>
                                        <Image src={Dummy} />
                                        {text}
                                    </Paper>
                                    <IconButton sx={{ height: 50, width: 50 }} className="drag-handle">
                                        <IconGripHorizontal />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </Item>
                    </Draggable>
                ))}
            </ContainerDnd>
        );
    };

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

    const DropArea = () => {
        return (
            <>
                <Box p={1}>
                    <Paper variant="outlined" sx={{ width: 120, height: 170 }}>
                        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <Box {...getRootProps()} m={2} display="flex" alignItems="center" justifyContent="center">
                                        <input {...getInputProps()} />
                                        <IconPlus size={100} />
                                    </Box>
                                </section>
                            )}
                        </Dropzone>
                    </Paper>
                </Box>
            </>
        );
    };

    const MainParamsForm = ({product}) => {
        console.log(product);
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
                        <TextField required id="sku" label="SKU" defaultValue={product?.sku} />
                        <TextField id="title" label="Title" defaultValue={product?.title} />
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

    const SEOParamsForm = ({product}) => {
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
                        <TextField id="seo_h1" fullWidth label="H1" defaultValue={product?.seoH1} />
                        <TextField id="seo_title" multiline rows={2} fullWidth label="Title" defaultValue={product?.seoTitle} />
                        <TextField id="seo_descr" multiline rows={3} fullWidth label="Descr." defaultValue={product?.seoDescription} />
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

    const Characteristics = ({product}) => {
        console.log(product);
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                            <Item>
                                <Paper variant="outlined" elevation={0}>
                                    <MainParamsForm product={product} />
                                </Paper>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={6} xl={6}>
                            <Item>
                                    <Container>
                                <Box display="flex" justifyContent="flex-end">
                                    <Paper elevation={3}>
                                        <Image
                                            src={product?.image ? product?.image[0]?.path : Dummy}
                                            sx={{ maxHeight: 300, maxWidth: 300, display: { xs: "none", md: "inline" }, fit: "contain" }}
                                        />
                                    </Paper>
                                </Box>
                                    </Container>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    const PhotosArea = () => {
        return (
            <>
                <Box>
                    <SortableThumbs />
                </Box>
            </>
        );
    };

    const PropertyTabs = ({product}) => {
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
                                <Characteristics product={product} />
                            </TabPanel>
                            <TabPanel value="2">
                                <SEOParamsForm product={product} />
                            </TabPanel>
                            <TabPanel value="3">
                                <Box>
                                    <Box m={2}>
                                        <Stack direction="row">
                                            <DropArea />
                                            <PhotosArea product={product} />
                                        </Stack>
                                    </Box>
                                    <Box m={2}>
                                        <Paper variant="outlined">
                                            {/* <Image src={product.image[0].path? product.image[0].path: Dummy} sx={{ fit: "contain" }} /> */}
                                            <Image src={ Dummy} sx={{ fit: "contain" }} />
                                        </Paper>
                                    </Box>
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
            <PropertyTabs product={product} />
        </>
    );
};

export default ProductItem;
