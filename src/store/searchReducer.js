// searchReducer.js

import * as actionTypes from "./actions";

const initialState = {
    pages: {},
};

// ==============================|| SEARCH REDUCER ||============================== //

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_SAVE:
            const updatedPages = {
                ...state.pages,
                [action.page]: action.searchString,
            };

            return {
                ...state,
                pages: updatedPages,
            };
        default:
            return state;
    }
};

export default searchReducer;
