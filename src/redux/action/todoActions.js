import axios from 'axios';

export const fetchTodosRequest = () => ({ type: 'FETCH_TODOS_REQUEST' });

export const fetchTodosSuccess = (todos) => ({
    type: 'FETCH_TODOS_SUCCESS',
    payload: todos,
});

export const fetchTodosFailure = (error) => ({
    type: 'FETCH_TODOS_FAILURE',
    payload: error,
});

export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo,
});

export const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    payload: id,
});

export const updateTodo = (todo) => ({
    type: 'UPDATE_TODO',
    payload: todo,
});

export const fetchTodos = () => async (dispatch) => {
    dispatch(fetchTodosRequest());
    try {
        const response = await axios.get('http://localhost:4000/todo/getTodo');
        dispatch(fetchTodosSuccess(response.data.todoTasks));
    } catch (error) {
        dispatch(fetchTodosFailure(error.message));
    }
};

export const createTodo = (todo) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:4000/todo/addTodo', todo);
        dispatch(addTodo(response.data.todo));
    } catch (error) {
        console.error(error);
    }
};

export const removeTodo = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:4000/todo/deleteTodo/${id}`);
        dispatch(deleteTodo(id));
    } catch (error) {
        console.error(error);
    }
};

export const modifyTodo = (id, updates) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:4000/todo/updateTodo/${id}`, updates);
        dispatch(updateTodo(response.data.updatedTodo));
    } catch (error) {
        console.error(error);
    }
};

export const dragValTodo = (id, todoStatus) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:4000/todo/updateTodo/${id}`, { todoStatus });
        dispatch(updateTodo(response.data.updatedTodo));
    } catch (error) {
        console.error(error);
    }
};
