import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { saveSearchString } from "store/actions";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, IconButton } from "@mui/material";

// third-party
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

// project imports
import Transitions from "ui-component/extended/Transitions";

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from "@tabler/icons";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { shouldForwardProp } from "@mui/system";
import { set } from "date-fns";

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: "99%",
    top: "-55px !important",
    padding: "0 12px",
    [theme.breakpoints.down("sm")]: {
        padding: "0 10px",
    },
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
        background: "transparent !important",
        paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
        width: 250,
    },
    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginLeft: 4,
        background: "#fff",
    },
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    "&:hover": {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light,
    },
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <ButtonBase sx={{ borderRadius: "12px" }}>
                        <HeaderAvatarStyle variant="rounded">
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </HeaderAvatarStyle>
                    </ButtonBase>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: "12px" }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    "&:hover": {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light,
                                    },
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ "aria-label": "weight" }}
        />
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState,
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const location = useLocation().pathname;
    const { pathname } = location;
    const theme = useTheme();
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);

    const [value, setValue] = useState("");

    useEffect(() => {
        const searchString = search.pages[location];
        if (searchString !== undefined) {
            setValue(searchString);
        } else {
            setValue("");
        }
    }, [search.pages, location]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(saveSearchString(location, value));
    };

    const handleClearClick = (e) => {
        e.preventDefault();
        setValue("");
        dispatch(saveSearchString(location, ""));
    };

    return (
        <>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <ButtonBase sx={{ borderRadius: "12px" }}>
                                    <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </HeaderAvatarStyle>
                                </ButtonBase>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: "center left" }}>
                                            <Card
                                                sx={{
                                                    background: "#fff",
                                                    [theme.breakpoints.down("sm")]: {
                                                        border: 0,
                                                        boxShadow: "none",
                                                    },
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <OutlineInputStyle
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSubmit(event);
                        }
                    }}
                    id="input-search-header"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            {value && (
                                <IconButton onClick={handleClearClick} edge="end" style={{ marginRight: "5px" }}>
                                    <ClearIcon />
                                </IconButton>
                            )}

                            <ButtonBase sx={{ borderRadius: "12px" }} onClick={handleSubmit}>
                                <HeaderAvatarStyle variant="rounded">
                                    <SearchIcon stroke={1.5} size="1.3rem" />
                                </HeaderAvatarStyle>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ "aria-label": "weight" }}
                />
            </Box>
        </>
    );
};

export default SearchSection;
