import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconCopy, IconEdit, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import AnimateButton from "ui-component/extended/AnimateButton";
import {useBrand} from "../../hooks/apiHooks";

const BrandsList = () => {
    const {brand} = useBrand();
    let navigate = useNavigate();
    const theme = useTheme();

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
                    rows={brand || []}
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
