import React from "react";
import "./Home.css"
import {useNavigate} from "react-router-dom" ;
const Home = () => {
    const Navigate= useNavigate();
    return (
        <> 
            <div className="header items-center">
                <h1 className="text-center font-bold text-4xl pt-5">WAQF TASK TRACKER</h1>
            </div>
            <div className="buttons  pt-10 h-[20vh] p-8  flex justify-between items-center">
                <div className="b1 cursor-pointer bg-slate-400 ml-[10vw] w-[15vw]  h-[12vh] rounded-lg p-5 pt-4" onClick={() => Navigate("/Property")}>Add Property + </div>
                    <div className="b2 cursor-pointer bg-slate-400 mr-[10vw] w-[14vw] h-[12vh] rounded-lg p-6 pt-4 pl-5"onClick={()=>Navigate("/Task")} >Add Task +</div>
               
            </div>
        </>
    );
};

export default Home;
