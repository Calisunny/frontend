import React, { Component } from "react";
import Axios from "axios";

class UpdateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            date: "",
            start: "",
            newStart: "",
            end: "",
            task: "",
        };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            name: props.name,
            date: props.date,
            start: props.start,
            newStart: props.start,
            end: props.end,
            task: props.task,
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
                            endtime: curr.end,
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
            Axios.post(
                "https://schedule-calender.herokuapp.com/update", //update
                {
                    params: {
                        name: curr.name,
                        date: "2021-06-" + curr.date,
                        start: curr.newStart,
                        end: curr.end,
                        task: curr.task,
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
                        name: curr.name,
                        date: "2021-06-" + props.date,
                        start: curr.start,
                    },
                }
            ).then((response) => {
                window.location.reload();
            });
        }
    };
    render() {
        let curr = this.state;
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
                            placeholder={curr.start}
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
                            placeholder= {curr.end}
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
                            placeholder= {curr.task}
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
