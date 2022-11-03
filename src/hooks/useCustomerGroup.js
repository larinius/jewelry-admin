import { useQuery } from "@tanstack/react-query";
function useCustomerGroup(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/usergroup`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => fetch(query).then((res) => res.json()));

    return !isLoading && !error ? data : null;
}

export default useCustomerGroup;
