import { useQuery } from "@tanstack/react-query";
function useCategory(id) {
    const apiUrl = "http://192.168.0.104:3000/api/category";

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetch(query).then((res) => res.json()));

    return !isLoading && !error ? data : null;
}

export default useCategory;
