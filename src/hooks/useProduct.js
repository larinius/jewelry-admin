import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useProduct(id) {
    console.log("USE PRODUCTS");
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/product`;

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () => axios.get(query));

    return {isLoading, error, data};
}

export default useProduct;
