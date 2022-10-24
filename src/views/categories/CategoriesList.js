import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Box, Paper } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";

const CategoriesList = () => {
    const apiUrl = "http://192.168.0.104:3000/api/category";

    const { isLoading, error, data } = useQuery([apiUrl], () => fetch(apiUrl).then((res) => res.json()));

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
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
            field: "order",
            headerName: "Order",
            type: "number",
            width: 110,
            editable: true,
        },
    ];

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

    return (
        <>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 500, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default CategoriesList;
