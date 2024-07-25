import axios from "axios";
import { useLayoutEffect, useState } from "react";
import '../styles/update.css'
import { useDispatch } from "react-redux";
import { modifyTodo } from "../redux/action/todoActions";

const Update = (props) => {

    const taskDetail = props.task
    const [title, setTitle] = useState(taskDetail?.title || '')
    const [description, setDescription] = useState(taskDetail?.description || '')

    const dispatch = useDispatch()
    useLayoutEffect(() => {
        if (taskDetail) {
            setTitle(taskDetail.title)
            setDescription(taskDetail.description)
        }
    }, [taskDetail])

    const handleSave = async () => {
        const updatedTask = {
            ...taskDetail,
            title,
            description
        };
        try {
            dispatch(modifyTodo(taskDetail._id, updatedTask))
            props.setTrigger(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (props.trigger) ?
        <section className="details-pop-up flex justify-center items-center h-screen bg-[#000000B3] fixed w-full">
            <div className="pop-up-content relative w-full max-w-[50%] h-[80vh] p-[20px] border border-gray-300 bg-[#ffff] rounded-[10px]">
                <h3 className="font-[600]">Edit Task</h3>
                <div>
                    <div>
                        <p className="m-0">Title </p>
                        <input className="outline-none border-b border-b-slate-300 w-full font-[500]" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <p className="m-0 ">Description:</p>
                        <input className="outline-none border-b border-b-slate-300 w-full font-[500]" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className=" flex items-center absolute bottom-0 right-0">
                    <button className="px-2 py-1 rounded-md bg-slate-200 mr-3 mb-3" onClick={() => handleSave()}>Save</button>
                    <button className="px-2 py-1 rounded-md bg-slate-400 mr-3 mb-3" onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>
        </section>
        : "";
}

export default Update;

