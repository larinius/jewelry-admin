import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconEdit } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";

import {useOrder} from "../../hooks/apiHooks";

const OrdersList = () => {
    const {order} = useOrder();
    let navigate = useNavigate();
    const theme = useTheme();
    const handleOpenOrder = (order) => {
        const url = `/order/item/${order.id}`;
        navigate(url, { replace: false });
    };

    const handleNewOrder = (order) => {
        const url = `/order/new`;
        navigate(url, { replace: false });
    };

    const ToolsButtons = ({ order }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    {/* <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton> */}

                    <IconButton onClick={() => handleOpenOrder(order)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "code", headerName: "Code", width: 120 },
        {
            field: "params.value.user.name",
            headerName: "Client",
            width: 150,
            editable: false,
            renderCell: (params) => <>{params.row.user.name}</>,
        },
        {
            field: "status",
            headerName: "Status",
            type: "number",
            width: 110,
            editable: false,
            renderCell: (params) => <>{params.row.status.title}</>,
        },
        {
            field: "created",
            headerName: "Date",
            width: 150,
            editable: false,
            renderCell: (params) => {
                var date = new Date(params.row.created).toLocaleDateString("en-GB", {
                    localeMatcher: "lookup",
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                });

                return <>{date}</>;
            },
        },
        {
            field: "weight",
            headerName: "Weight",
            type: "number",
            width: 110,
            editable: false,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            width: 110,
            editable: false,
        },
        {
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: false,
            renderCell: (params) => (
                <>
                    <ToolsButtons order={params.row} />
                </>
            ),
        },
    ];

    const ButtonsArea = () => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.error.main }}>
                            Delete
                        </Button>
                    </AnimateButton>
                    <AnimateButton></AnimateButton>
                    <AnimateButton>
                        <Button disableElevation size="small" variant="contained" sx={{ background: theme.palette.primary.main }}>
                            Save
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button onClick={handleNewOrder} disableElevation size="small" variant="contained" sx={{ background: theme.palette.success.main }}>
                            Create new
                        </Button>
                    </AnimateButton>
                </Stack>
            </>
        );
    };

    const Grid = () => {

        return (
            <>
                <DataGrid
                    getRowHeight={() => 'auto'}
                    rows={order || []}
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

    return (
        <>
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 700, flexGrow: 1 }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default OrdersList;
