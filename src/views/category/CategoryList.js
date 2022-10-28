import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { Box, Paper, Button, Stack, Grid, Container, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";
import useCategory from "../../lib/useCategory";
import { useNavigate, Link } from "react-router-dom";

const CategoriesList = () => {
    const data = useCategory();
    let navigate = useNavigate();

    const handleOpenCategory = (category) => {
        const url = `/category/item/${category.id}`;
        console.log("CLICK:", category.id);
        navigate(url, { replace: false });
    };



    const ToolsButtons = ({ category }) => {

        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton onClick={() => handleOpenCategory(category)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

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
        {
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: true,
            renderCell: (params) => (
                <>
                    <ToolsButtons category={params.row} />
                </>
            ),
        },
    ];

    const Grid = () => {
        return (
            <>
                <DataGrid
                    rows={data || []}
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
                <Box sx={{ height: 1500, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default CategoriesList;
