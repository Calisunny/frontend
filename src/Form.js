import React, { Component } from "react";
import "./DisplayTeacher.css";
import Axios from "axios";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            start: "",
            end: "",
            task: "",
        };
    }
    send = () => {
        let curr= this.state;
        if((curr.start).parseInt >= (curr.end).parseInt){
            window.alert("Invalid Start and End Time");
            return;
        }
        const getCount = () => {
            return new Promise(async (resolve) => {
                await Axios.get("https://schedule-calender.herokuapp.com/check", {
                    params:{name: curr.name ,starttime : curr.start,endtime : curr.end},
                }).then(async (response) => {
                    resolve(response.data);
                });
            })
        }
        let count = getCount();
        if(count > 0){
            window.alert("Schedule is clashing"); 
            return;
        }
        Axios.post("https://schedule-calender.herokuapp.com/insert",
            {params:{name: curr.name, date:curr.date, start: curr.start,
                end: curr.end, task: curr.task}}
        ).then((response)=>{
            window.location.reload();
        });
    };
    hide = () => {
        var element = document.getElementById("Form");
        element.classList.remove("visibleForm");
        element.classList.add("hiddenForm");
    }
    render() {
        return (
            <div id="Form" className="hiddenForm">
                <h1 className="m0">Add Details</h1>
                <p className="m0">Enter teacher's name</p>
                <div>
                    <input
                        onChange={(e) => {
                            this.setState({ name: e.target.value });
                        }}
                        className="w m0"
                        type="text"
                        placeholder="Tony Stark"
                    />
                </div>
                <p className="m0">Date</p>
                <div>
                    <input
                        onChange={(e) => {
                            this.setState({ date: e.target.value });
                        }}
                        className="w m0"
                        type="date"
                        placeholder="Month-Day"
                    />
                </div>
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
        );
    }
}

export default Form;
