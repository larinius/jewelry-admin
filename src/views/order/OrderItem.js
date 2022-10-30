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
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Image from "mui-image";
import React, { useState, useEffect, useCallback } from "react";

import useCustomer from "../../hooks/useCustomer";
import useOrder from "../../hooks/useOrder";
import useProduct from "../../hooks/useProduct";
import useSearch from "../../hooks/useSearch";

const OrderItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    let order = useOrder(id);
    let products = useSearch();
    let customers = useCustomer();
    const [product, setProduct] = useState([]);
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [customer, setCustomer] = useState();

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const handleSelectCustomer = (customer) => {
        console.log(customer);
        setCustomer(customer);
    };

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results);
    };

    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result);
    };

    const handleOnAdd = () => {
        const ordered = product;
        ordered.quantity = 1;
        setOrderedProducts([...orderedProducts, ordered]);
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

    useEffect(() => {}, [orderedProducts]);

    const handleOnSelect = (item) => {
        const ordered = item;
        ordered.quantity = 1;
        setOrderedProducts([...orderedProducts, ordered]);
        // console.log(item);
    };

    const handleOnFocus = () => {
        // console.log("Focused");
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

    const SearchProducts = () => {
        return (
            <>
                <Box>
                    <ReactSearchAutocomplete
                        items={products}
                        resultStringKeyName={"title"}
                        fuseOptions={{ keys: ["code", "sku", "title"] }}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
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

    function generate(element) {
        return orderedProducts.map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

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
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.success.main }}>
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
                                    <Alert severity="success">Order created</Alert>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Typography variant="h3">Order: 220101</Typography>
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
