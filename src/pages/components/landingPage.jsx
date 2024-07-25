import React, { useState, useEffect } from "react";
import Header from "../header/header";
import axios from "axios";
import Update from "../../utils/editDetailsPopUp";
import DetailsPopUp from "../../utils/detailsPopUp";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, removeTodo, dragValTodo } from '../../redux/action/todoActions';

const ItemTypes = {
    TASK: "task",
};

// Draggable Task Component
const Task = ({ task, index, moveTask, status }) => {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const dispatch = useDispatch();

    const [, ref] = useDrag({
        type: ItemTypes.TASK,
        item: { index, status, id: task._id },
    });

    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        hover: (item) => {
            if (item.index !== index || item.status !== status) {
                moveTask(item.index, index, item.status, status);
                item.index = index;
                item.status = status;
            }
        },
    });

    const handleDelete = async (id) => {
        await dispatch(removeTodo(id));
    };

    const openUpdatePopup = (task) => {
        setSelectedTask(task);
        setIsUpdateOpen(true);
    };

    const openDetailsPopup = (task) => {
        setSelectedTask(task);
        setIsDetailsOpen(true);
    };

    return (
        <div ref={(node) => ref(drop(node))} className="bg-blue-100 rounded-md p-2 mb-2">
            <Update trigger={isUpdateOpen} setTrigger={setIsUpdateOpen} task={selectedTask} />
            <DetailsPopUp trigger={isDetailsOpen} setTrigger={setIsDetailsOpen} task={selectedTask} />
            <h6>{task.title}</h6>
            <p>{task.description}</p>
            <p>{task.createdAt}</p>
            <div className="flex items-center justify-end">
                <button className="text-white bg-red-500 rounded-md px-2 py-1" onClick={() => handleDelete(task._id)}>Delete</button>
                <button className="text-white bg-blue-400 rounded-md px-2 py-1 ml-2" onClick={() => openUpdatePopup(task)}>Edit</button>
                <button className="text-white bg-blue-600 rounded-md px-2 py-1 ml-2" onClick={() => openDetailsPopup(task)}>View Details</button>
            </div>
        </div>
    );
};

// Board Component to render tasks
const Board = ({ tasks, moveTask }) => {
    const [, dropTODO] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            if (item.status !== "TODO") {
                moveTask(item.index, tasks.filter(task => task.todoStatus === "TODO").length, item.status, "TODO");
            }
        },
    });

    const [, dropInProgress] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            if (item.status !== "IN PROGRESS") {
                moveTask(item.index, tasks.filter(task => task.todoStatus === "IN PROGRESS").length, item.status, "IN PROGRESS");
            }
        },
    });

    const [, dropDone] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            if (item.status !== "DONE") {
                moveTask(item.index, tasks.filter(task => task.todoStatus === "DONE").length, item.status, "DONE");
            }
        },
    });

    return (
        <div className="flex flex-wrap justify-evenly">
            <div ref={dropTODO} className="p-2 shadow-md w-full md:w-1/3">
                <h4 className="bg-blue-400 font-medium text-white p-1 rounded-sm">TODO</h4>
                {tasks
                    .filter(task => task?.todoStatus === "TODO")
                    .map((task, index) => (
                        <Task key={task._id} task={task} index={index} moveTask={moveTask} status="TODO" />
                    ))}
                {tasks.filter(task => task.todoStatus === "TODO").length === 0 && (
                    <div className="bg-blue-50 rounded-md p-4 text-center">Drop tasks here</div>
                )}
            </div>

            <div ref={dropInProgress} className="p-2 shadow-md w-full md:w-1/3">
                <h4 className="bg-blue-400 font-medium text-white p-1 rounded-sm">IN PROGRESS</h4>
                {tasks
                    .filter(task => task?.todoStatus === "IN PROGRESS")
                    .map((task, index) => (
                        <Task key={task._id} task={task} index={index} moveTask={moveTask} status="IN PROGRESS" />
                    ))}
                {tasks.filter(task => task.todoStatus === "IN PROGRESS").length === 0 && (
                    <div className="bg-blue-50 rounded-md p-4 text-center">Drop tasks here</div>
                )}
            </div>

            <div ref={dropDone} className="p-2 shadow-md w-full md:w-1/3">
                <h4 className="bg-blue-400 font-medium text-white p-1 rounded-sm">DONE</h4>
                {tasks
                    .filter(task => task?.todoStatus === "DONE")
                    .map((task, index) => (
                        <Task key={task._id} task={task} index={index} moveTask={moveTask} status="DONE" />
                    ))}
                {tasks.filter(task => task.todoStatus === "DONE").length === 0 && (
                    <div className="bg-blue-50 rounded-md p-4 text-center">Drop tasks here</div>
                )}
            </div>
        </div>
    );
};

// Main Component
const LandingPage = () => {
    const todoData = useSelector(({ todos }) => todos?.todoList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const [counter, setCounter] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("recent");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const newTask = {
            title: `task${counter}`,
            description: `description${counter}`,
            todoStatus: "TODO",
        };
        try {
            await dispatch(createTodo(newTask));
            await dispatch(fetchTodos());
            setCounter(prevCounter => prevCounter + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredAndSortedTasks = todoData
        .filter(task => task?.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOption === "recent") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortOption === "oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });

    const moveTask = async (fromIndex, toIndex, fromStatus, toStatus) => {
        const updatedTasks = [...todoData];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        movedTask.todoStatus = toStatus;

        const getStatusLength = (status) => updatedTasks.filter(task => task.todoStatus === status).length;

        if (toStatus === "TODO") {
            updatedTasks.splice(toIndex, 0, movedTask);
        } else if (toStatus === "IN PROGRESS") {
            const todoLength = getStatusLength("TODO");
            updatedTasks.splice(todoLength + toIndex, 0, movedTask);
        } else if (toStatus === "DONE") {
            const todoLength = getStatusLength("TODO");
            const inProgressLength = getStatusLength("IN PROGRESS");
            updatedTasks.splice(todoLength + inProgressLength + toIndex, 0, movedTask);
        }

        try {
            await dispatch(dragValTodo(movedTask._id, movedTask.todoStatus));
            await dispatch(fetchTodos());
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="landingPage">
                <Header />
                <br />
                <section className="p-4">
                    <button className="bg-blue-600 text-white px-10 py-1 rounded-md mb-2" onClick={handleSubmit}>
                        Add Task
                    </button>
                    <div className="flex flex-wrap justify-between items-center shadow-md p-2 rounded-md">
                        <div className="flex items-center mt-1">
                            <p className="font-[500] m-0"> Search:</p>
                            <input
                                className="outline-none border border-gray-600 ps-2 rounded-md h-8 ms-1 w-full sm:w-[300px] md:w-[400px]"
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center mt-1">
                            <p className="font-[500] m-0"> Sort By:</p>
                            <select
                                className="outline-none border border-gray-600 ps-2 rounded-md h-8 ms-1 w-32"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="recent">Recent</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <Board tasks={filteredAndSortedTasks} moveTask={moveTask} />
                </section>
            </div>
        </DndProvider>
    );
};

export default LandingPage;
