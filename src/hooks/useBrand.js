import { useQuery } from "@tanstack/react-query";
import fetchClient from "./../utils/axios"

function useBrand(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetchClient(query));

    return !isLoading && !error ? data : null;
}

export default useBrand;
