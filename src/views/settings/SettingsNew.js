/* eslint-disable jsx-a11y/no-autofocus */
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Grid,
    Grow,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconTrash } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import qs from "qs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useUser, useProduct, useOrderCode, useOrder } from "../../hooks/apiHooks";
import { axiosProvider } from "utils/axios";

const OrderItem = () => {
    const { axiosInstance: axios } = axiosProvider();
    const theme = useTheme();

    const { id } = useParams();
    const { product: products } = useProduct();
    const { user: users } = useUser();
    const { order: orders, refetch: refetchOrders, isLoading: isOrdersLoading } = useOrder({ id: id });
    const { ordercode: newCode } = useOrderCode();

    const [product, setProduct] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [user, setUser] = useState();
    const [order, setOrder] = useState([]);
    const [orderCode, setOrderCode] = useState();
    const [orderWeight, setOrderWeigt] = useState();

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;

    // const generateOrderCode = () => {
    //     let date = new Date();
    //     let month = date.getMonth() + 1 < 10 ? `0` : "" + `${date.getMonth() + 1}`;
    //     let year = date.getFullYear().toString().substr(-2);

    //     const rnd = Math.floor(Math.random() * (1000 - 1) + 1);

    //     const code = `${year}${month}${rnd}`;

    //     return code;
    // };

    useEffect(() => {
        if (!orderCode) {
            setOrderCode(newCode);
        }
    }, []);

    const handleSelectUser = (user) => {
        setUser(user);
    };

    const handleDelete = (item) => {
        const index = orderedProducts.indexOf(item);
        const newProducts = [...orderedProducts];
        newProducts.splice(index, 1);
        setOrderedProducts(newProducts);
    };

    const handleQuantity = (e, row) => {
        if (e.target.value >= 0) {
            const index = orderedProducts.indexOf(row);
            const newProducts = [...orderedProducts];
            newProducts[index].quantity = e.target.value;
            setOrderedProducts(newProducts);
        }
    };

    const handleOnSelect = (item) => {
        const ordered = item;
        ordered.quantity = 1;
        if (!orderedProducts.find((product) => product.id === ordered.id)) {
            setOrderedProducts([...orderedProducts, ordered]);
        } else {
            showNotification("Product already in list", severity.info);
        }
    };

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: "block", textAlign: "left" }}>
                    {item.sku} - {item.code}
                </span>
                <span style={{ display: "block", textAlign: "left" }}>
                    {item.title} {item.price}
                </span>
            </>
        );
    };

    useEffect(() => {
        let newOrder = [...order];

        newOrder.code = orderCode;
        newOrder.user = user;
        newOrder.products = orderedProducts;
        newOrder.total = invoiceSubtotal;
        newOrder.weight = weightSubtotal;
        newOrder.discount = 0;
        newOrder.deliveryPrice = 0;
        setOrder(newOrder);

        console.log(newOrder);
    }, [orderedProducts, user, orderCode, orderWeight]);

    const severity = { error: "error", warning: "warning", info: "info", success: "success" };
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState();

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);

    const showNotification = (message, severity) => {
        setAlert(true);
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const addOrder = useMutation((payload) => {
        axios
            .post(apiUrl, qs.stringify(payload))
            .then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    showNotification("Order created", severity.success);
                } else {
                    showNotification("Order not created. Error", severity.error);
                }
                return response; // this response will be passed as the first parameter of onSuccess
            })
            .then((data) => {
                refetchOrders();
            });
    });

    const handlePostOrder = () => {
        addOrder.mutate(order);
    };

    const SearchProducts = () => {
        return (
            <>
                <Box>
                    <ReactSearchAutocomplete
                        items={products.products || []}
                        resultStringKeyName={"title"}
                        fuseOptions={{ keys: ["code", "sku", "title"] }}
                        onSelect={handleOnSelect}
                        formatResult={formatResult}
                        styling={{
                            height: "48px",
                            border: "1px solid #dfe1e5",
                            borderRadius: "2px",
                            backgroundColor: "#fafafa",
                            boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 1px 0px",
                            hoverBackgroundColor: "#eee",
                            color: "#616161",
                            fontSize: "14px",
                            fontFamily: "Roboto",
                            iconColor: "grey",
                            lineColor: "rgb(232, 234, 237)",
                            placeholderColor: "grey",
                            clearIconMargin: "3px 14px 0 0",
                            searchIconMargin: "0 0 0 16px",
                            zIndex: "9999",
                        }}
                    />
                </Box>
            </>
        );
    };

    const SelectCustomer = () => {
        return (
            <>
                <Box>
                    <Autocomplete
                        id="customer-select"
                        options={users || []}
                        autoHighlight
                        defaultValue={user}
                        getOptionLabel={(option) => `${option.name} ${option.phone} ${option.email}`}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{}} {...props}>
                                {option.name} | {option.phone} | {option.email}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select customer"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                            />
                        )}
                        onChange={(e, newValue) => {
                            handleSelectUser(newValue);
                        }}
                    />
                </Box>
            </>
        );
    };

    function price(item) {
        return Number(item.price) * item.quantity;
    }

    function weight(item) {
        return Number(item.weight) * item.quantity;
    }

    function sum(prev, next) {
        return prev + next;
    }

    function subtotal(items) {
        // let result = orderedProducts.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        let result = orderedProducts.map(price).reduce(sum).toFixed(2) || 0;
        return result;
    }

    function weightSum(items) {
        // let result = orderedProducts.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        let result = orderedProducts.map(weight).reduce(sum).toFixed(2) || 0;
        return result;
    }

    const invoiceSubtotal = orderedProducts.length !== 0 ? subtotal(orderedProducts) : 0;
    //   const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    //   const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    const weightSubtotal = orderedProducts.length !== 0 ? weightSum(orderedProducts) : 0;

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
                        {orderedProducts.map((row) => (
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
                                    {row.title}
                                </TableCell>
                                <TableCell align="left" style={{ width: 100 }}>
                                    {row.code}
                                </TableCell>
                                <TableCell align="left" style={{ width: 150 }}>
                                    {row.sku}
                                </TableCell>
                                <TableCell align="right" style={{ width: 100 }}>
                                    {row.weight}
                                </TableCell>
                                <TableCell align="right" style={{ width: 100 }}>
                                    {row.price}
                                </TableCell>

                                <TableCell align="justify" style={{ width: 80 }}>
                                    <TextField
                                        variant="standard"
                                        onChange={(e) => {
                                            handleQuantity(e, row);
                                        }}
                                        id="quantity"
                                        type="number"
                                        value={row.quantity}
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
                            Save and create new
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                            disableElevation
                            size="small"
                            variant="contained"
                            sx={{ background: theme.palette.success.main }}
                            onClick={handlePostOrder}
                        >
                            Save
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    const MainForm = () => {
        return (
            <>
                <Box sx={{ flexGrow: 1 }} pt={5}>
                    <Paper>
                        <Box m={2}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" justifyContent="flex-start">
                                        <Grow in={alert}>
                                            <Alert variant="filled" severity={alertSeverity}>
                                                {alertMessage}
                                            </Alert>
                                        </Grow>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography variant="h3">Order: {orderCode}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SearchProducts />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectCustomer />
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper m={1} variant="outlined" square>
                                        <ProductTable />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box pt={3} pb={5} m={5} display="flex" justifyContent="flex-end">
                                        <ButtonsArea />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </>
        );
    };

    return (
        <>
            <MainForm />
        </>
    );
};

export default OrderItem;
