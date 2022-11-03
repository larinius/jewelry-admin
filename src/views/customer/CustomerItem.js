import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    DataGrid,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    GetterParams,
    Grid,
    Grow,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { arrayMoveImmutable as arrayMove } from "array-move";
import { Container as ContainerDnd, Draggable } from "react-smooth-dnd";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { styled } from "@mui/material/styles";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Dropzone, { useDropzone } from "react-dropzone";
import Image from "mui-image";
import React, { useState, useEffect, useCallback } from "react";
import TinyMCE from "ui-component/TinyMCE";
import { useNavigate, Link } from "react-router-dom";

import useCustomer from "../../hooks/useCustomer";
import useCustomerGroup from "../../hooks/useCustomerGroup";
import useProduct from "../../hooks/useProduct";

import Dummy from "../../assets/images/dummy.jpg";

const CustomerItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    const customer = useCustomer(id);
    const customerGroups = useCustomerGroup();
    const [group, setGroup] = useState("");
    const [orders, setOrders] = useState([]);
    let navigate = useNavigate();
    const toDate = (date) => {
        const newDate = new Date(date).toLocaleDateString("en-GB", {
            localeMatcher: "lookup",
            year: "2-digit",
            month: "short",
            day: "numeric",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        });

        return newDate;
    };

    useEffect(() => {
        if (customer !== null) {
            setOrders(customer.order);
        }
    }, [customer]);

    useEffect(() => {
        if (customerGroups !== null && customer !== null) {
            setGroup(customer.userGroupId);
        }
    }, [customerGroups, customer]);

    const handleSelectGroup = (e) => {
        setGroup(e.target.value);
    };

    const GroupSelect = () => {
        return (
            <>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="select-group">Group</InputLabel>
                    <Select
                        labelId="select-group-label"
                        id="select-group-helper"
                        value={group || ""}
                        label="Customer group"
                        onChange={handleSelectGroup}
                    >
                        {customerGroups?.map((item) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.title}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </>
        );
    };

    const ButtonsArea = () => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.primary.main }}>
                            Delete
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.error.main }}>
                            Cansel
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

    const OrdersTable = () => {
        const handleOpenOrder = (order) => {
            const url = `/order/item/${order.id}`;
            navigate(url, { replace: false });
        };

        return (
            <>
                <Typography variant="h3" gutterBottom m={3}>
                    Orders
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Code</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="right">Weight (g)</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Tools</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => (
                                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="left" style={{ width: 100 }}>
                                        {row?.code}
                                    </TableCell>
                                    <TableCell align="left" style={{ width: 100 }}>
                                        {toDate(row?.created)}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: 100 }}>
                                        {row?.weight}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: 100 }}>
                                        {row?.total}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: 100 }}>
                                        {row?.status.title}
                                    </TableCell>
                                    <TableCell align="right" style={{ width: 100 }}>
                                        <IconButton onClick={() => handleOpenOrder(row)}>
                                            <IconEdit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

    const MainForm = () => {
        return (
            <>
                <Box m={2}>
                    <Typography variant="h2" gutterBottom m={3}>
                        Customer profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <Stack direction={"row"}>
                                    <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={customer?.name} />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField
                                    id="outlined-basic"
                                    label="Registered date"
                                    variant="outlined"
                                    defaultValue={toDate(customer?.created)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <GroupSelect />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField id="outlined-basic" label="Phone" variant="outlined" defaultValue={customer?.phone} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}></Grid>

                        <Grid item xs={12}>
                            <Box mt={5}>
                                <Paper m={1} variant="outlined" square>
                                    {orders.length ? (
                                        <OrdersTable />
                                    ) : (
                                        <Typography variant="subtitle1" m={3}>
                                            No orders
                                        </Typography>
                                    )}
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    return (
        <>
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <MainForm />
                </Box>
            </Paper>
        </>
    );
};

export default CustomerItem;
