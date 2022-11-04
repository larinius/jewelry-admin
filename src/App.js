import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// auth
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./ui-component/Loading";

import LoginPage from "auth/LoginPage";
// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";

import Uploady from "@rpldy/uploady";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
    const { isLoading } = useAuth0();
    const { isAuthenticated } = useAuth0();

    const customization = useSelector((state) => state.customization);

    // if (isLoading) {
    //     return <Loading />;
    //   }

    if (isAuthenticated) {
        return (
            <Uploady destination={{ url: process.env.REACT_APP_UPLOAD_ENDPOINT }}>
                <QueryClientProvider client={queryClient}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={themes(customization)}>
                            <CssBaseline />
                            <NavigationScroll>
                                <Routes />
                            </NavigationScroll>
                        </ThemeProvider>
                    </StyledEngineProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Uploady>
        );
    } else {
        return (
            <>
                <LoginPage />
            </>
        );
    }
};

export default App;
