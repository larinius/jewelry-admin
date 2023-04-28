import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconCopy, IconEdit, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import {useOrder} from "../../hooks/apiHooks";

const OrdersList = () => {
    const {order} = useOrder();
    let navigate = useNavigate();
    const theme = useTheme();
    const handleOpenOrder = (category) => {
        const url = `/order/item/${category.id}`;
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

                    <IconButton onClick={() => handleOpenOrder(order)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "code",
            headerName: "Order",
            width: 150,
            editable: true,
        },
        {
            field: "status",
            headerName: "Status",
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

    const Grid = () => {
        return (
            <>
                <DataGrid
                    rows={order || []}
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
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ height: 1500, width: "100%" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default OrdersList;
