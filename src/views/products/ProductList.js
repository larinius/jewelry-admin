/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
// import Img from 'react-optimized-image';
import Image from "mui-image";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, Button, Stack, Grid, Container } from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";

import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";

const ProductList = () => {
    const apiUrl = "http://192.168.0.104:3000/api/product";

    const { isLoading, error, data } = useQuery([apiUrl], () => fetch(apiUrl).then((res) => res.json()));
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
                    rows={!isLoading && !error ? data : []}
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

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "sku",
            headerName: "SKU",
            width: 150,
            editable: false,
        },
        {
            field: "Image",
            headerName: "Photo",
            width: 150,
            editable: false,
            renderCell: (params) => (
                <>
                    <Thumb src={params.value[0].path} size={75} />
                </>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            width: 150,
            editable: true,
        },
        {
            field: "isActive",
            headerName: "Is active",
            width: 100,
            type: "boolean",
            editable: true,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "category",
            headerName: "Category",
            width: 150,
            editable: true,
            renderCell: (params) => <>{params.value.title}</>,
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
