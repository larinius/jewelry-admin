/* eslint-disable jsx-a11y/no-autofocus */
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
    Autocomplete,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { IconShoppingCartPlus, IconEdit, IconTrash, IconCopy, IconFolder } from "@tabler/icons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Image from "mui-image";
import React, { useState, useEffect, useCallback } from "react";
import useOrder from "../../hooks/useOrder";
import useProduct from "../../hooks/useProduct";
import useSearch from "../../hooks/useSearch";
import { useTheme } from "@mui/material/styles";

const OrderItem = () => {
    const theme = useTheme();
    let { id } = useParams();
    let order = useOrder(id);
    let products = useSearch();
    const [product, setProduct] = useState();
    const [orderedProducts, setOrderedProducts] = useState([]);

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

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
        if (e.target.value > 0) {
            const index = orderedProducts.indexOf(row);
            const newProducts = [...orderedProducts];
            newProducts[index].quantity = e.target.value;
            setOrderedProducts(newProducts);
        }
    };

    useEffect(() => {
    }, [orderedProducts]);

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

    const AutocompleteInput = () => {
        return (
            <>
                <Box p={1} display="flex" justifyContent="flex-end" alignItems="center">
                    <Box flexGrow={4}>
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
                    <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
                        <Button onClick={handleOnAdd} variant="contained" startIcon={<IconShoppingCartPlus />}>
                            Add
                        </Button>
                    </Box>
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

    const ProductList = () => {
        return (
            <>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
                    Avatar with text and icon
                </Typography>
                <Paper>
                    <List dense={dense}>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <IconTrash />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <IconFolder />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Single-line item" secondary={secondary ? "Secondary text" : null} />
                            </ListItem>,
                        )}
                    </List>
                </Paper>
            </>
        );
    };

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
                            <TableCell colSpan={1}/>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const MainForm = () => {
        return (
            <>
                <Box m={3}>
                    <AutocompleteInput />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Paper>
                        <ProductTable />
                    </Paper>
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
            <MainForm />
        </>
    );
};

export default OrderItem;
