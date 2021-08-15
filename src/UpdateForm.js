import React, { Component } from "react";
import Axios from "axios";

class UpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newStart: "",
            newTask: "",
        };
    }
    hide = () => {
        var element = document.getElementById("UpdForm");
        element.classList.remove("visibleUpd");
        element.classList.add("hiddenUpd");
    };
    send = (operation) => {
        let curr = this.state;
        let props = this.props;
        // console.log(curr.start,props.start);
        // if (curr.start.parseInt >= curr.end.parseInt) {
        //     window.alert("Invalid Start and End Time");
        //     return;
        // }
        function getCount() {
            return new Promise(async (resolve) => {
                await Axios.get(
                    "https://schedule-calender.herokuapp.com/check",
                    {
                        params: {
                            name: props.str,
                            starttime: curr.newStart,
                            endtime: props.end,
                        },
                    }
                )
                    .then(async (response) => {
                        resolve(response.data);
                    })
                    .catch((err) => console.log(err));
            });
        }
        let count = getCount();
        if (count > 0) {
            window.alert("Schedule is clashing");
            return;
        }
        if (operation === "u") {
            console.log(curr,this.state);
            Axios.put(
                "https://schedule-calender.herokuapp.com/update", //update
                {
                    params: {
                        name: props.name,
                        date: "2021-06-" + props.date,
                        start: props.start,
                        newStart: curr.newStart,
                        end: props.end,
                        task: props.task,
                        newTask: curr.task,
                    },
                }
            ).then((response) => {
                window.location.reload();
            });
        } else {
            console.log("del");
            Axios.delete(
                "https://schedule-calender.herokuapp.com/delete", //delete
                {
                    params: {
                        name: props.name,
                        date: "2021-06-" + props.date,
                        start: props.start,
                    },
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
    };
    render() {
        let curr = this.state;
        let props = this.props;
        return (
            <div>
                <div id="UpdForm" className="hiddenUpd">
                    <h1 className="m0">Update Details</h1>
                    <p className="m0">Start Time</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ newStart: e.target.value },
                                    ()=>{console.log(e.target.value)});
                            }}
                            className="w m0"
                            type="time"
                            placeholder={props.start}
                        />
                    </div>
                    <p className="m0">End Time</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ end: e.target.value },
                                    ()=>{console.log(e.target.value)});
                            }}
                            className="w m0"
                            type="time"
                            placeholder= {props.end}
                        />
                    </div>
                    <p className="m0">Task</p>
                    <div>
                        <input
                            onChange={(e) => {
                                this.setState({ newTask: e.target.value },
                                    ()=>{console.log(e.target.value)});
                            }}
                            className="w m0"
                            type="text"
                            placeholder= {props.task}
                        />
                    </div>
                    <div className="formButtons">
                        <button
                            className="formButton"
                            onClick={() => this.send("u")}
                        >
                            Update
                        </button>
                        <button
                            className="formButton"
                            onClick={() => this.send("d")}
                        >
                            Delete
                        </button>
                        <button
                            className="formButton"
                            onClick={() => this.hide()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateForm;
