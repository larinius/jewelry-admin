/* eslint-disable jsx-a11y/no-autofocus */
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
import { IconEdit, IconTrash } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";

import { useUser, useOrder, useOrderStatus } from "../../hooks/apiHooks";

const OrderItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    let navigate = useNavigate();
    const {orderStatus } = useOrderStatus() || [];
    let {order} = useOrder(id);
    let {user} = useUser(order?.user.id);
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("");

    const date = new Date(order?.created).toLocaleDateString("en-GB", {
        localeMatcher: "lookup",
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleSelectStatus = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        if (order !== null) {
            setProducts(order?.products);
            setStatus(order?.status.id);
        }
    }, [order]);

    function price(item) {
        return Number(item.product.price) * item.quantity;
    }

    function weight(item) {
        return Number(item.product.weight) * item.quantity;
    }

    function sum(prev, next) {
        return prev + next;
    }

    function subtotal(items) {
        // let result = products.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        let result = products?.map(price).reduce(sum).toFixed(2) || 0;
        return result;
    }

    function weightSum(items) {
        // let result = products.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        let result = products?.map(weight).reduce(sum).toFixed(2) || 0;
        return result;
    }

    const invoiceSubtotal = products?.length !== 0 ? subtotal(products) : 0;
    //   const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    //   const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    const weightSubtotal = products?.length !== 0 ? weightSum(products) : 0;

    const ProductTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Remove</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="left">Code</TableCell>
                            <TableCell align="left">SKU</TableCell>
                            <TableCell align="right">Weight (g)</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Qnt.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row) => (
                            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell align="right" style={{ width: 50 }}>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(row);
                                        }}
                                    >
                                        <IconTrash />
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.product.title}
                                </TableCell>
                                <TableCell align="left" style={{ width: 100 }}>
                                    {row.product.code}
                                </TableCell>
                                <TableCell align="left" style={{ width: 150 }}>
                                    {row.product.sku}
                                </TableCell>
                                <TableCell align="right" style={{ width: 100 }}>
                                    {row.product.weight}
                                </TableCell>
                                <TableCell align="right" style={{ width: 100 }}>
                                    {row?.product.price}
                                </TableCell>

                                <TableCell align="justify" style={{ width: 80 }}>
                                    <TextField
                                        variant="standard"
                                        onChange={(e) => {
                                            handleQuantity(e, row);
                                        }}
                                        id="quantity"
                                        type="number"
                                        value={row?.quantity}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        contentEditable={false}
                                        suppressContentEditableWarning={true}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow sx={{ background: theme.palette.grey[100] }}>
                            <TableCell rowSpan={2} />
                            <TableCell colSpan={3}>Subtotal</TableCell>
                            <TableCell align="right">{weightSubtotal}</TableCell>
                            <TableCell align="right">{invoiceSubtotal}</TableCell>
                            <TableCell colSpan={1} />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const ButtonsArea = () => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.error.main }}>
                            Cancel
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.primary.main }}>
                            Delete
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                            disableElevation
                            size="small"
                            variant="contained"
                            sx={{ background: theme.palette.success.main }}
                            // onClick={handlePostOrder}
                        >
                            Save
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    const StatusSelect = () => {
        return (
            <>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="select-status">Status</InputLabel>
                    <Select
                        labelId="select-status-label"
                        id="select-status-helper"
                        value={status || ""}
                        label="Order status"
                        onChange={handleSelectStatus}
                    >
                        {orderStatus?.map((item) => {
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

    const MainForm = () => {

        const handleOpenUser = (user) => {
            const url = `/user/item/${user.id}`;
            navigate(url, { replace: false });
        };

        return (
            <>
                <Box m={2}>
                <Typography variant="h2" gutterBottom m={3}>
                        Order info
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <Stack direction={"row"}>
                                    <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue={order?.user.name} />
                                    <IconButton onClick={() => handleOpenUser(user)}>
                                        <IconEdit />
                                    </IconButton>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField id="outlined-basic" label="Order code" variant="outlined" defaultValue={order?.code} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <StatusSelect />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField id="outlined-basic" label="Phone" variant="outlined" defaultValue={order?.user.phone} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box display="flex" justifyContent="flex-start">
                                <TextField id="outlined-basic" label="Date" variant="outlined" defaultValue={date} />
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box mt={5}>
                                <Paper m={1} variant="outlined" square>
                                    <ProductTable />
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

export default OrderItem;
