import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

async function useBrand(id) {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/brand`;
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();

    const query = id ? `${apiUrl}/${id}` : `${apiUrl}`;

    const { isLoading, error, data } = useQuery([query], () =>
        fetch(query, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json()),
    );

    return !isLoading && !error ? data : null;
}

export default useBrand;
