import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";

import { Chance } from "chance";
import jwtDecode from "jwt-decode";

import { LOGIN, LOGOUT } from "store/actions";
import accountReducer from "store/accountReducer";

import Loader from "ui-component/Loader";
import axios from "axios";

const chance = new Chance();


const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem("serviceToken", serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem("serviceToken");
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const query = `${process.env.REACT_APP_API_BASE_URL}/account/me`;
    // const { isLoading, error, data, refetch } = useQuery(["account", "me"], () => axios.get(query).then((res) => res.data));

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem("serviceToken");
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/me`);

                    if (response) {
                        const { user } = response.data;

                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user,
                            },
                        });
                    }
                } else {
                    dispatch({
                        type: LOGOUT,
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT,
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/account/login`;
        const response = await axios.post(apiUrl, { email, password });
        const { serviceToken, user } = response.data;
        setSession(serviceToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user,
            },
        });
    };

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/register`, {
            id,
            email,
            password,
            firstName,
            lastName,
        });
        let users = response.data;

        if (window.localStorage.getItem("users") !== undefined && window.localStorage.getItem("users") !== null) {
            const localUsers = window.localStorage.getItem("users");
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                },
            ];
        }

        window.localStorage.setItem("users", JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = (email) => console.log(email);

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default JWTContext;
