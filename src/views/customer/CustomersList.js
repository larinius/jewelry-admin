import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconCopy, IconEdit, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import {useUser} from "../../hooks/apiHooks";

const CustomerList = () => {
    const {user} = useUser();
    let navigate = useNavigate();
    const theme = useTheme();

    const handleOpenCategory = (user) => {
        const url = `/user/item/${user.id}`;
        navigate(url, { replace: false });
    };

    const ToolsButtons = ({ user }) => {
        return (
            <>
                <Stack spacing={2} direction="row" justifyContent="end">
                    <IconButton>
                        <IconTrash />
                    </IconButton>

                    <IconButton>
                        <IconCopy />
                    </IconButton>

                    <IconButton onClick={() => handleOpenCategory(user)}>
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
                    <ToolsButtons user={params.row} />
                </>
            ),
        },
    ];

    const Grid = () => {
        return (
            <>
                <DataGrid
                    autoHeight={true}
                    rows={user || []}
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
                    <AnimateButton></AnimateButton>
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

    return (
        <>
            <Box mb={1} display="flex" justifyContent="flex-end">
                <ButtonsArea />
            </Box>
            <Paper sx={{ p: 1 }}>
                <Box sx={{ minHeight: 700, flexGrow: 1 }}>
                    <Grid />
                </Box>
            </Paper>
        </>
    );
};

export default CustomerList;
