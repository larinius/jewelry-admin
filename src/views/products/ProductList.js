/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import Img from 'react-optimized-image';
import Image from "mui-image";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, Button, Stack, Grid, Container, IconButton } from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";
import products from "menu-items/products";
import useProduct from "./../../lib/useProduct"

const ProductList = () => {

    const data = useProduct();

    useEffect(() => {
        console.log(data)
    }, [data]);

    const theme = useTheme();
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

    const ProductsGrid = () => {
        return (
            <>
                <DataGrid
                    rowHeight={80}
                    rows={data || []}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[50]}
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

    const ToolsButtons = () => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "sku",
            headerName: "SKU",
            width: 100,
            editable: false,
        },
        {
            field: "Image",
            headerName: "Photo",
            width: 90,
            editable: false,
            renderCell: (params) => (
                <>
                    <Link to={`/products/item/${params.value[0].productId}`}>
                        <Thumb src={params.value[0].path} size={75} />
                    </Link>
                </>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            editable: true,
        },
        {
            field: "isActive",
            headerName: "Active",
            width: 70,
            type: "boolean",
            editable: true,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 75,
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
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: true,
            renderCell: (params) => (
                <>
                    <ToolsButtons />
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
                <Box sx={{ height: 500, width: "100%" }}>
                    <ProductsGrid />
                </Box>
            </Paper>
        </>
    );
};

export default ProductList;
