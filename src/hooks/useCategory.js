import { useQuery } from "@tanstack/react-query";
import fetchClient from "./../utils/axios"

function useCategory(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/category`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetchClient(query));

    return !isLoading && !error ? data : null;
}

export default useCategory;
