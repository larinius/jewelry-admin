import { useQuery } from "@tanstack/react-query";
function useProduct (id) { 

    const apiUrl = "http://192.168.0.104:3000/api/product";

    const { isLoading, error, data } = useQuery([`${apiUrl}/${id}`], () => fetch(`${apiUrl}/${id}`).then((res) => res.json()));
    
    return(!isLoading && !error? data : null);

 }

 export default useProduct;