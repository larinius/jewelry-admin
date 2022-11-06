import { useQuery, useMutation } from "@tanstack/react-query";
import fetchClient from "./../utils/axios"

function useCreateOrder(order) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/order`;

    const query = `${apiUrl}`;




    const createOrder = useMutation((payload) => fetchClient.post(apiUrl, payload), {
        onSuccess: () => {
            queryClient.invalidateQueries([apiUrl]);
        },
    });

    const { isLoading, error, data } = createOrder.mutate({ url: apiUrl, order: order });

    // const { isLoading, error, data } = useQuery([query], () => fetch(query).then((res) => res.json()));

    // return !isLoading && !error ? data : null;
}

export default useCreateOrder;
