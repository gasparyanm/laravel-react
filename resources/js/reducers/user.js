const user = localStorage.getItem("user");

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        //move to const
        case 'get_user':
            return {
                ...state,
                isLoggedIn: true,
            };
        default:
            return state;
    }
}
