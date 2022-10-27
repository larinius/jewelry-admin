import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { Box, Paper, Button, Stack, Grid, Container, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";
import useCustomer from "../../lib/useCustomer";
import { useNavigate, Link } from "react-router-dom";

const CustomerList = () => {
    const data = useCustomer();
    let navigate = useNavigate();

    const handleOpenCategory = (customer) => {
        const url = `/user/item/${customer.id}`;
        navigate(url, { replace: false });
    };

    const ToolsButtons = ({ customer }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton onClick={() => handleOpenCategory(customer)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Name",
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
            headerName: "Orders",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "group",
            headerName: "Group",
            width: 110,
            editable: true,
            // {/* {params.value.id} */}
            renderCell: (params) => <>{params.row.userGroup.title}</>,
        },
        {
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: true,
            renderCell: (params) => (
                <>
                    <ToolsButtons customer={params.row} />
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
                    // pageSize={100}
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
                <Box sx={{ height: 1200, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default CustomerList;
