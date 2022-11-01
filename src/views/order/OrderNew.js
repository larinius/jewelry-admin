/* eslint-disable jsx-a11y/no-autofocus */
import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Grow,
    IconButton,
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
import { IconShoppingCartPlus, IconEdit, IconTrash, IconCopy, IconFolder } from "@tabler/icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Image from "mui-image";
import React, { useState, useEffect, useCallback } from "react";
import qs from "qs";
import useCustomer from "../../hooks/useCustomer";
import useOrder from "../../hooks/useOrder";
import useCreateOrder from "../../hooks/useOrder";
import useProduct from "../../hooks/useProduct";
import useSearch from "../../hooks/useSearch";
import axios from "axios";

const OrderItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    let products = useSearch();
    let customers = useCustomer();
    const queryClient = useQueryClient();
    const [product, setProduct] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [customer, setCustomer] = useState();
    const [order, setOrder] = useState([]);
    const [orderCode, setOrderCode] = useState();
    const [orderWeight, setOrderWeigt] = useState();

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;

    const generateOrderCode = () => {
        let date = new Date();
        let month = date.getMonth() + 1 < 10 ? `0` : "" + `${date.getMonth() + 1}`;
        let year = date.getFullYear().toString().substr(-2);

        const rnd = Math.floor(Math.random() * (1000 - 1) + 1);

        const code = `${year}${month}${rnd}`;

        return code;
    };

    useEffect(() => {
        if (!orderCode) {
            setOrderCode(generateOrderCode());
        }
        console.log(orderCode);
    }, []);

    const handleSelectCustomer = (customer) => {
        console.log(customer);
        setCustomer(customer);
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
        newOrder.customer = customer;
        newOrder.products = orderedProducts;
        newOrder.total = invoiceSubtotal;
        newOrder.weight = weightSubtotal;
        newOrder.discount = 0;
        newOrder.deliveryPrice = 0;
        setOrder(newOrder);
    }, [orderedProducts, customer, orderCode, orderWeight]);

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
        let config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        axios.post(apiUrl, qs.stringify(payload), config).then((response) => {
            console.log(response.status);
            if (response.status === 201) {
                showNotification("Order created", severity.success);
            } else {
                showNotification("Order not created. Error", severity.error);
            }
            return response; // this response will be passed as the first parameter of onSuccess
        }),
            {
                onSuccess: (data) => {
                    console.log(data.status);
                    queryClient.invalidateQueries([apiUrl]);
                },
            };

        console.log(payload);
    });

    const handlePostOrder = () => {
        addOrder.mutate(order);
    };

    const SearchProducts = () => {
        return (
            <>
                <Box>
                    <ReactSearchAutocomplete
                        items={products}
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
                        options={customers || []}
                        autoHighlight
                        defaultValue={customer}
                        getOptionLabel={(option) => `${option.name} ${option.phone}`}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{}} {...props}>
                                {option.name} {option.phone}
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
                            handleSelectCustomer(newValue);
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
