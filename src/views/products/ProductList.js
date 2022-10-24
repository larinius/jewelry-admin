import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Box, Paper } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";

const ProductList = () => {

    const apiUrl = "http://192.168.0.104:3000/api/product";

    const { isLoading, error, data } = useQuery([apiUrl], () => fetch(apiUrl).then((res) => res.json()));

    const Grid = () => {
        return (
            <>
                <DataGrid
                    rows={!isLoading && !error ? data : []}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[50]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                />
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "sku",
            headerName: "SKU",
            width: 150,
            editable: true,
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
            field: "category.title",
            headerName: "Category",
            width: 150,
            editable: true,
        },
    ];

    return (
        <>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 500, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
}

export default ProductList;
