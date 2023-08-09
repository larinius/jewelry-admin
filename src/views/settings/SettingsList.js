import { Alert, Box, Button, IconButton, Paper, Stack, Grow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { IconEdit } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSettings } from "../../hooks/apiHooks";
import { axiosProvider } from "utils/axios";

const SettingsList = () => {
    const { axiosInstance: axios } = axiosProvider();
    const { settings } = useSettings();
    const [selectionModel, setSelectionModel] = useState([]);

    const navigate = useNavigate();
    const theme = useTheme();

    const [selectedRows, setSelectedRows] = useState([]);

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/settings`;
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
        const newSelectedRows = settings.filter((r) => selectedIDs.has(r.id));
        setSelectedRows(newSelectedRows);
    };

    const handleOpen = (setting) => {
        const url = `/settings/item/${setting.id}`;
        navigate(url, { replace: false });
    };

    const handleNew = (setting) => {
        const url = `/settings/new`;
        navigate(url, { replace: false });
    };

    const handleDelete = (setting) => {
        selectedRows.map((item) => {
            removeSetting.mutate(item.id);
        });
    };

    const removeSetting = useMutation((payload) => {
        axios
            .delete(`${apiUrl}/${payload}`)
            .then((response) => {
                if (response.status === 204) {
                    showNotification(`Setting ${payload} deleted`, severity.success);
                } else {
                    showNotification(`Setting ${payload} not deleted. Error`, severity.error);
                }
                return response; 
            })
            .then((data) => {
                console.log(data.status);
                queryClient.invalidateQueries(["settings"]);
            });
    });

    const ToolsButtons = ({ setting }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    {/* <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton> */}

                    <IconButton onClick={() => handleOpen(setting)}>
                        <IconEdit />
                    </IconButton>
                </Stack>
            </>
        );
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "params.value",
            headerName: "Title",
            width: 150,
            editable: false,
            renderCell: (params) => <>{params.row.title}</>,
        },
        {
            field: "value",
            headerName: "Value",
            width: 200,
            editable: false,
            renderCell: (params) => <>{params.row.value}</>,
        },

        {
            field: "tools",
            headerName: "Tools",
            width: 200,
            editable: false,
            renderCell: (params) => (
                <>
                    <ToolsButtons setting={params.row} />
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
                            onClick={handleNew}
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
                    rows={settings || []}
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

export default SettingsList;
