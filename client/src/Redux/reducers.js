// reducers.js
const initialState = {
    role: '',
    token: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROLE':
            return { ...state, role: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: !state.token };
        default:
            return state;
    }
};

export default reducer;
