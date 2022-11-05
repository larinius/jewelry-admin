import React, { useState, useEffect } from "react";
import { IconEdit, IconTrash, IconCopy } from "@tabler/icons";
import { Box, Paper, Button, Stack, Grid, Container, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef, GridValue, GetterParams } from "@mui/x-data-grid";
// import useBrand from "../../hooks/useBrand";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const BrandsList = () => {
    let navigate = useNavigate();
    const theme = useTheme();

    // ==== API and Auth0 =============
    // const [token, setToken] = useState();

    const { getAccessTokenSilently } = useAuth0();
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;
    const query = `${apiUrl}`;

    // var options = {
    //     method: "GET",
    //     url: query,
    //     headers: { Authorization: `${token}` },
    // };

    const { isLoading, error, data } = useQuery([query], () => callSecureApi(query));

    // useEffect(async () => {
    //     const t = await getAccessTokenSilently();
    //     setToken(t);
    //     console.log(t);
    // }, []);

    const callSecureApi = async (query) => {
        try {
            const token = await getAccessTokenSilently();
            console.log(token);
            const response = await fetch(query, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.json();

        } catch (error) {
            return null;
        }
    };

    // =============================

    const handleOpen = (brand) => {
        const url = `/brand/item/${brand.id}`;
        navigate(url, { replace: false });
    };

    const ToolsButtons = ({ brand }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton onClick={() => handleOpen(brand)}>
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
                    <ToolsButtons brand={params.row} />
                    {/* {params.value.id} */}
                </>
            ),
        },
    ];

    const Grid = () => {
        return (
            <>
                <DataGrid
                    rows={data?.data || []}
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
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.success.main }}>
                            Create new
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    return (
        <>
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 500, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default BrandsList;
