import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import Form from "./Form";
import Topbar from "./Topbar";
import "./DisplayTeacher.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: [],
            display: "",
            enter: false,
            chosen: "",
        };
        this.getData = this.getData.bind(this);
    }
    textChange = (e) => {
        this.setState({ display: e.target.value }, () => {
            this.getData();
        });
    };
    enter = (e) => {
        this.setState({ enter: true, chosen: e.target.id });
    };
    back = () => {
        window.location.reload();
    };
    makeVisible = (e) => {
        let element = document.getElementById("Form");
        element.classList.add("visibleForm");
        element.classList.remove("hiddenForm");
    };
    async getData() {
        let name = this.state.display;
        let dbdata = [];
        function getName(str) {
            return new Promise(async (resolve) => {
                await Axios.get(
                    "https://schedule-calender.herokuapp.com/search",
                    {
                        params: { name: str },
                    }
                ).then(async (response) => {
                    for (let i = 0; i < response.data.length; i++) {
                        let profiledata = await getData(response.data[i].name);
                        dbdata.push(profiledata);
                    }
                    resolve(dbdata);
                });
            });
        }
        const getData = (useName) => {
            return new Promise(async (resolve) => {
                let profiledata = [];
                profiledata.push(useName);
                await Axios.get(
                    "https://schedule-calender.herokuapp.com/profile",
                    {
                        params: { name: useName },
                    }
                ).then((res) => {
                    const data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        profiledata.push(data[i]);
                    }
                    resolve(profiledata);
                });
            });
        };
        let data = await getName(name);
        this.setState({ show: data });
    }
    render() {
        let curr = this.state;
        let names = [];
        for (let i = 0; i < curr.show.length; i++)
            names.push(curr.show[i].shift());
        let k = 0;
        if (curr.enter) {
            return (
                <div>
                    <Topbar
                        textChange={this.textChange}
                        back={() => this.back()}
                        enter={curr.enter}
                        str={curr.chosen}
                    />
                </div>
            );
        }
        return (
            <div>
                <Topbar textChange={this.textChange} enter={curr.enter} />
                <div className="teacherParent">
                    {curr.show.map((data, index) => (
                        <div
                            className="teacherContainer"
                            key={index}
                            onClick={(e) => this.enter(e)}
                        >
                            <div className="bigText" key={index}>
                                <h2 id={names[k]}>{names[k++]}</h2>
                            </div>
                            {data.map((obj, index) => (
                                <div
                                    className="data"
                                    key={index}
                                    id={names[k - 1]}
                                >
                                    <div className="date" id={names[k - 1]}>
                                        {obj.date.substring(5, 10)}
                                    </div>
                                    <div className="range" id={names[k - 1]}>
                                        {obj.starttime.substring(0, 5)} -
                                        {obj.endtime.substring(0, 5)}
                                    </div>
                                    <div className="task" id={names[k - 1]}>
                                        {obj.task}
                                    </div>
                                </div>
                            ))}
                            <div className="needPading"></div>
                        </div>
                    ))}
                </div>
                <div className="create">
                    <Form str={curr.display} />
                    <button
                        className="createInside"
                        onClick={(e) => this.makeVisible(e)}
                    >
                        <img
                            alt="add"
                            src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"
                        />
                        <p>CREATE</p>
                    </button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
}

export default App;
