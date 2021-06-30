import React, { Component } from 'react'
import "./DisplayTeacher.css"
import Axios from "axios";

class AddData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: "",
            end: "",
            task: "",
        }
    }
    makeVisible = (e) => {
        let element = document.getElementById("Form");
        element.classList.add("visibleForm");
        element.classList.remove("hiddenForm");
    }
    hide = () => {
        var element = document.getElementById("Form");
        element.classList.remove("visibleForm");
        element.classList.add("hiddenForm");
    }
    send = () => {
        let curr= this.state;
        let props= this.props;
        if((curr.start).parseInt >= (curr.end).parseInt){
            window.alert("Invalid Start and End Time");
            return;
        }
        function getCount(){
            return new Promise(async (resolve) => {
                await Axios.get("https://schedule-calender.herokuapp.com/check", {
                    params:{name: props.str ,starttime : curr.start,endtime : curr.end},
                }).then(async (response) => {
                    resolve(response.data);
                }).catch((err)=>console.log(err));
            })
        }
        let count = getCount();
        if(count > 0){
            window.alert("Schedule is clashing"); 
            return;
        }
        Axios.post("https://schedule-calender.herokuapp.com/insert",
            {params:{name: props.str, date: "2021-06-"+props.date, start: curr.start,
                end: curr.end, task: curr.task}}
        ).then((response)=>{
            window.location.reload();
        });
    }
    render(){
        return (
            <div>
                <div  id="Form" className="hiddenForm">
                    <h1 className="m0">Add Details</h1> 
                    <p className="m0">Start Time</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ start: e.target.value });
                            }}
                            className="w m0"
                            type="time"
                            placeholder="02:00"
                            
                        />
                    </div>
                    <p className="m0">End Time</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ end: e.target.value });
                            }}
                            className="w m0"
                            type="time"
                            placeholder="03:00"
                        />
                    </div>
                    <p className="m0">Task</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ task: e.target.value });
                            }}
                            className="w m0"
                            type="text"
                            placeholder="Subject"
                        />
                    </div>
                    <div className="formButtons">
                        <button className="formButton" onClick={() => this.send()}>
                            Add Schedule
                        </button>
                        <button
                            className="formButton"
                            onClick={()=> this.hide()}
                        >
                            Close
                        </button>
                    </div>
                </div>
                <button
                className="createInside"
                onClick={() => this.makeVisible()}
                >
                <img alt="add"
                src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                />
                <p>CREATE</p>
            </button>
            </div>
        )
    }
}

export default AddData

