import { useQuery } from "@tanstack/react-query";
function useBrand(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetch(query).then((res) => res.json()));

    return !isLoading && !error ? data : null;
}

export default useBrand;
