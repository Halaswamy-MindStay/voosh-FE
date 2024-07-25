const initialState = {
    todoList: [],
    loading: false,
    error: null,
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_TODOS_SUCCESS':
            return { ...state, loading: false, todoList: action.payload };
        case 'FETCH_TODOS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_TODO':
            return { ...state, todoList: [...state.todoList, action.payload] };
        case 'DELETE_TODO':
            return { ...state, todoList: state.todoList.filter(todo => todo._id !== action.payload) };
        case 'UPDATE_TODO':
            return {
                ...state,
                todoList: state.todoList.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                ),
            };
        default:
            return state;
    }
};

export default todoReducer;
