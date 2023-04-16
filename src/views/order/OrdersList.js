import { Alert, Box, Button, IconButton, Paper, Stack, Grow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { IconEdit } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrder } from "../../hooks/apiHooks";
import { axiosProvider } from "utils/axios";

const OrdersList = () => {
    const { axiosInstance: axios } = axiosProvider();
    const { order } = useOrder();
    const [selectionModel, setSelectionModel] = useState([]);

    let navigate = useNavigate();
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;
    const queryClient = useQueryClient();

    const severity = { error: "error", warning: "warning", info: "info", success: "success" };
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState();

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);

    const showNotification = (message, severity) => {
        setAlert(true);
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const handleSelection = (newSelection) => {
        setSelectionModel(newSelection);
        const selectedIDs = new Set(newSelection);
        const newSelectedRows = order.filter((r) => selectedIDs.has(r.id));
        setSelectedRows(newSelectedRows);
    };

    const handleOpenOrder = (order) => {
        const url = `/order/item/${order.id}`;
        navigate(url, { replace: false });
    };

    const handleNewOrder = (order) => {
        const url = `/order/new`;
        navigate(url, { replace: false });
    };

    const handleDelete = (order) => {
        selectedRows.map((item) => {
            removeOrder.mutate(item.id);
        });
    };

    const removeOrder = useMutation((payload) => {
        axios
            .delete(`${apiUrl}/${payload}`)
            .then((response) => {
                if (response.status === 204) {
                    showNotification(`Order ${payload} deleted`, severity.success);
                } else {
                    showNotification(`Order ${payload} not deleted. Error`, severity.error);
                }
                return response; // this response will be passed as the first parameter of onSuccess
            })
            .then((data) => {
                console.log(data.status);
                queryClient.invalidateQueries(["order"]);
            });
    });

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
                    <Box display="flex" flexGrow={2} justifyContent="flex-start">
                        <Grow in={alert}>
                            <Alert variant="filled" severity={alertSeverity}>
                                {alertMessage}
                            </Alert>
                        </Grow>
                    </Box>

                    <AnimateButton>
                        <Button
                            onClick={handleDelete}
                            disableElevation
                            size="small"
                            variant="contained"
                            sx={{ background: theme.palette.error.main }}
                        >
                            Delete
                        </Button>
                    </AnimateButton>
                    <AnimateButton></AnimateButton>
                    <AnimateButton>
                        <Button
                            onClick={handleNewOrder}
                            disableElevation
                            size="small"
                            variant="contained"
                            sx={{ background: theme.palette.success.main }}
                        >
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
                    getRowHeight={() => "auto"}
                    rows={order || []}
                    columns={columns}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    selectionModel={selectionModel}
                    onSelectionModelChange={handleSelection}
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
                <Box sx={{ minHeight: 700, flexGrow: 1, height: "90vh" }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default OrdersList;
