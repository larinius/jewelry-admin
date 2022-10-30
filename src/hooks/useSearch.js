import { useQuery } from "@tanstack/react-query";
function useSearch(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/product`;

    const query = `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetch(query).then((res) => res.json()));

    return !isLoading && !error ? data : [];
}

export default useSearch;
