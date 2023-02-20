import { useQuery } from "@tanstack/react-query";
import { fetchClient, postClient } from "utils/axios";

// import axios from "axios";

// export const fetchClient = () => {
//     const baseURL = process.env.REACT_APP_API_BASE_URL;

//     const fetchClient = axios.create({
//         baseURL,
//     });

//     console.log(baseURL, fetchClient);

//     return { fetchClient };
// };

export function useBrand(id) {
    const { fetchClient: axios } = fetchClient();
    
    const apiUrl = `/brand`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["brand", id], () => axios.get(query));

    const brand = data?.data || null;

    return { isLoading, error, refetch, brand };
}

export function useProduct(id) {
    const { fetchClient: axios } = fetchClient();
    
    const apiUrl = `/product`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const key = id ? id : "all";

    const { isLoading, error, data, refetch } = useQuery(["product", key], () => axios.get(query));

    const product = data?.data || null;

    return { isLoading, error, refetch, product };
}

export function useCategory(id) {
    const { fetchClient: axios } = fetchClient();
    
    const apiUrl = `/category`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    console.log(query);

    const { isLoading, error, data, refetch } = useQuery(["category", id], () => axios.get(query));

    const category = data?.data || null;

    return { isLoading, error, refetch, category };
}

export function useCustomer(id) {
    const { fetchClient: axios } = fetchClient();
    
    const apiUrl = `/user`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["user", id], () => axios.get(query));

    customer = data?.data || null;

    return { isLoading, error, refetch, customer };
}

export function useCustomerGroup(id) {
    const { fetchClient: axios } = fetchClient();

    const apiUrl = `/usergroup`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["customer group", id], () => axios.get(query));

    customerGroup = data?.data || null;

    return { isLoading, error, refetch, customerGroup };
}

export function useOrder(id) {
    const { fetchClient: axios } = fetchClient();

    const apiUrl = `/order`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["order", id], () => axios.get(query));

    order = data?.data || null;

    return { isLoading, error, refetch, order };
}

export function useOrderStatus(id) {
    const { fetchClient: axios } = fetchClient();

    const apiUrl = `/orderstatus`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["orderStatus", id], () => axios.get(query));

    orderStatus = data?.data || null;

    return { isLoading, error, refetch, orderStatus };
}

export function useCreateOrder(order) {
    const { postClient: axios } = postClient();

    const apiUrl = `/order`;

    const query = `${apiUrl}`;

    const createOrder = useMutation((payload) => axios.post(apiUrl, payload), {
        onSuccess: () => {
            queryClient.invalidateQueries(["order"]);
        },
    });

    const { isLoading, error, data } = createOrder.mutate({ url: apiUrl, order: order });

    const newOrder = data?.data || null;

    return { isLoading, error, newOrder };
}

export function useSearch(term) {
    const { fetchClient: axios } = fetchClient();

    const apiUrl = `/search-product`;

    const query = `${apiUrl}/?q=${term}`;

    const { isLoading, error, data, refetch } = useQuery(["search product", term], () => axios.get(query));

    search = data?.data || null;

    return { isLoading, error, refetch, search };
}
