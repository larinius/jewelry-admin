import { useQuery } from "@tanstack/react-query";
import {fetchClient} from "./../utils/axios"

function useSearch(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/product`;

    const query = `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetchClient(query));

    return !isLoading && !error ? data : [];
}

export default useSearch;
