import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import Uploady from "@rpldy/uploady";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// ==============================|| APP ||============================== //

const queryClient = new QueryClient();

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <Uploady destination={{ url: "http://localhost:3000/api/priceupload" }}>
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
};

export default App;
