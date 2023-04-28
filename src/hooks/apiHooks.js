import { useQuery } from "@tanstack/react-query";
import { axiosProvider } from "utils/axios";
const { axiosInstance: axios } = axiosProvider();

export function useBrand(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["brand", id], () => axios.get(query).then((res) => res.data));

    const brand = data || null;

    return { isLoading, error, refetch, brand };
}

export function useProduct(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/product`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const key = id ? id : "all";

    const { isLoading, error, data, refetch } = useQuery(["product", key], () => axios.get(query).then((res) => res.data));

    const product = !isLoading && !error ? data : [];

    return { isLoading, error, refetch, product };
}

export function useCategory(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/category`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["category", id], () => axios.get(query).then((res) => res.data));

    const category = data || null;

    return { isLoading, error, refetch, category };
}

export function useUser(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["user", id], () => axios.get(query).then((res) => res.data));

    const user = data || null;

    return { isLoading, error, refetch, user };
}

export function useUserGroup(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/usergroup`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["user group", id], () => axios.get(query).then((res) => res.data));

    const group = data || null;

    return { isLoading, error, refetch, group };
}

export function useOrder(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["order", id], () => axios.get(query).then((res) => res.data));

    const order = data || null;

    return { isLoading, error, refetch, order };
}

export function useOrderStatus(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/orderstatus`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data, refetch } = useQuery(["orderStatus", id], () => axios.get(query).then((res) => res.data));

    const orderStatus = data || null;

    return { isLoading, error, refetch, orderStatus };
}

export function useOrderCode() {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/ordercode`;

    const query = apiUrl;

    const { isLoading, error, data, refetch } = useQuery(["new ordercode"], () => axios.get(query).then((res) => res.data));

    const ordercode = data || null;

    return { isLoading, error, refetch, ordercode };
}

export function useCreateOrder(order) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;

    const query = `${apiUrl}`;

    const createOrder = useMutation((payload) => axios.post(apiUrl, payload), {
        onSuccess: () => {
            queryClient.invalidateQueries(["order"]);
        },
    });

    const { isLoading, error, data } = createOrder.mutate({ url: apiUrl, order: order });

    const newOrder = data || null;

    return { isLoading, error, newOrder };
}

export function useSearch(term) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/search-product`;

    const query = `${apiUrl}/?q=${term}`;

    const { isLoading, error, data, refetch } = useQuery(["search product", term], () => axios.get(query).then((res) => res.data));

    const search = data || null;

    return { isLoading, error, refetch, search };
}

export function useSettings() {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/settings`;

    const { isLoading, error, data, refetch } = useQuery(["settings"], () => axios.get(apiUrl).then((res) => res.data));

    const settings = data || [];

    return { isLoading, error, refetch, settings };
}
