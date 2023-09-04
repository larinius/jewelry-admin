import {
    Box,
    Button, FormControl, Grid, IconButton,
    InputLabel, MenuItem,
    Paper, Select,
    Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconEdit } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";

import { useUser, useUserGroup } from "../../hooks/apiHooks";


const CustomerItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    const {user} = useUser({id:id});
    const {group: groups} = useUserGroup();
    const [groupSelected, setGroupSelected] = useState("");
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
        if (user !== null) {
            setOrders(user?.order);
        }
    }, [user]);

    useEffect(() => {
        if (groups !== null && user !== null) {
            setGroupSelected(user?.userGroupId);
        }
    }, [groups, user]);

    const handleSelectGroup = (e) => {
        setGroupSelected(e.target.value);
    };

    const GroupSelect = () => {
        return (
            <>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="select-group">Group</InputLabel>
                    <Select
                        labelId="select-group-label"
                        id="select-group-helper"
                        value={groupSelected || ""}
                        label="Customer group"
                        onChange={handleSelectGroup}
                    >
                        {groups?.map((item) => {
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
                                    <TextField id="outlined-basic" readOnly={true} disabled={true} label="Name" variant="outlined" defaultValue={user?.name} />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField
                                    id="outlined-basic"
                                    label="Registered date"
                                    variant="outlined"
                                    readOnly={true}
                                    disabled={true}
                                    defaultValue={toDate(user?.created)}
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
                                <TextField id="outlined-basic" readOnly={true} disabled={true} label="Phone" variant="outlined" defaultValue={user?.phone} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Box display="flex" justifyContent="flex-start">
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    readOnly={true}
                                    disabled={true}
                                    defaultValue={user?.email}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box mt={5}>
                                <Paper m={1} variant="outlined" square>
                                    {orders?.length ? (
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
