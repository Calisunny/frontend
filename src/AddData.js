import React, { Component } from 'react'
import "./DisplayTeacher.css"

class AddData extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
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

