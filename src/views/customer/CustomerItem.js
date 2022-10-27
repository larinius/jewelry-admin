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
import useProduct from "../../lib/useProduct";
import Dropzone, { useDropzone } from "react-dropzone";
import { Container as ContainerDnd, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable as arrayMove } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { IconGripHorizontal, IconPlus } from "@tabler/icons";
import useCustomer from "../../lib/useCustomer";

const CustomerItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    const customer = useCustomer(id);

    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [group, setGroup] = useState();

    const handleGroup = (e) => {
        setGroup(e.target.value);
    };

    const groups = [
        { id: 1, title: "Client" },
        { id: 2, title: "Admin" },
        { id: 3, title: "Manager" },
    ];

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
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2} direction="column" justifycontent="start">
                        <TextField id="title" label="Title" defaultValue={customer?.name} />
                        <TextField id="select-group" select label="User group" value={group} onChange={handleGroup}>
                            {groups.map((option) => (
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
                                <Box display="flex" justifycontent="flex-end">
                                    <Paper elevation={3}></Paper>
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
                                <TabList onChange={handleChange}>
                                    <Tab label="Customer" value="1" />
                                    <Tab label="Orders" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Characteristics />
                            </TabPanel>
                            <TabPanel value="2"></TabPanel>
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
                <Stack spacing={2} direction="row" justifycontent="end">
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

export default CustomerItem;
