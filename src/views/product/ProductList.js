/* eslint-disable react/prop-types */
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

// import Img from 'react-optimized-image';
import Image from "mui-image";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, Button, Stack, Grid, Container, IconButton } from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";
import products from "menu-items/products";
import useProduct from "../../hooks/useProduct";
import UploadButton from "@rpldy/upload-button";
import Dummy from "../../assets/images/dummy.jpg";

const ProductList = () => {
    const data = useProduct();
    let navigate = useNavigate();

    useEffect(() => {}, [data]);

    const handleOpenProduct = (product) => {
        console.log(product);
        const url = `/product/item/${product.id}`;
        navigate(url, { replace: false });
    };

    const theme = useTheme();

    const Thumb = ({ src, size }) => {
        const p = src !== null ? src : Dummy;

        return (
            <>
                <Paper elevation={3}>
                    <Box sx={{ height: size, width: size }}>
                        <Image src={p} height={size - 3} width={size - 3} />
                    </Box>
                </Paper>
            </>
        );
    };

    const ProductsGrid = () => {
        return (
            <>
                <DataGrid
                    rowHeight={80}
                    rows={data || []}
                    columns={columns}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                />
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
                        <UploadButton />
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.primary.main }}>
                            Import from CSV
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.success.main }}>
                            Create new
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    const ToolsButtons = ({ product }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton onClick={() => handleOpenProduct(product)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "image",
            headerName: "Photo",
            width: 90,
            editable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/item/${params.row.id}`}>
                            <Thumb src={params.row.image.length !== 0 ? params.row.image[0]?.path.replace('/product/', "/thumb/") : Dummy  } size={75} />
                        </Link>
                    </>
                );
            },
        },
        {
            field: "sku",
            headerName: "SKU",
            width: 100,
            editable: false,
        },
        {
            field: "code",
            headerName: "Code",
            width: 100,
            editable: false,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            editable: true,
        },
        {
            field: "weight",
            headerName: "Weight",
            width: 100,
            type: "number",
            editable: false,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 75,
            editable: true,
        },
        {
            field: "caratage",
            headerName: "Cr.",
            width: 75,
            editable: false,
        },

        {
            field: "isActive",
            headerName: "Active",
            width: 70,
            type: "boolean",
            editable: true,
        },

        {
            field: "category",
            headerName: "Category",
            width: 90,
            editable: true,
            renderCell: (params) => <>{params.value.title}</>,
        },
        {
            field: "imageCount",
            headerName: "Photos",
            width: 90,
            editable: false,
            type: "number",
        },
        {
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: false,
            renderCell: (params) => (
                <>
                    <ToolsButtons product={params.row} />
                </>
            ),
        },
    ];

    return (
        <>
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>

            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 1500, width: "100%" }}>
                    <ProductsGrid />
                </Box>
            </Paper>
        </>
    );
};

export default ProductList;
