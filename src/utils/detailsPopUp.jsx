import React from 'react';
import '../styles/update.css'

const DetailsPopUp = (props) => {

    const taksDetail = props.task

    return (props.trigger) ?
        <section className="details-pop-up flex justify-center items-center h-screen bg-[#000000B3] fixed w-full">
            <div className="pop-up-content relative w-full max-w-[50%] h-[80vh] p-[20px] border border-gray-300 bg-[#ffff] rounded-[10px]">
                <h3 className="font-[600]">Task Details</h3>
                <div>
                    <h6>Title: <span className="font-[600] text-[20px]">{taksDetail.title}</span></h6>
                    <div>
                        <p className='m-0'>Description: <span>{taksDetail.description}</span></p>
                        <p className='m-0'>Created at <span>{taksDetail.createdAt}</span></p>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0">
                    <button className="px-2 py-1 rounded-md bg-blue-600 text-white mr-3 mb-3" onClick={() => props.setTrigger(false)}>Close</button>
                </div>
            </div>
        </section>
        : "";
}

export default DetailsPopUp;
