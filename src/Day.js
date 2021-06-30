import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: [],
            date: "1",
        };
        this.getData = this.getData.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.date + "" === "") return {};
        return { date: props.date + "" };
    }
    shouldComponentUpdate(props) {
        if (props.view !== "Day" || props.date + "" === "") return false;
        return true;
    }
    componentDidUpdate(props) {
        if (props.date + "" === this.state.date) return;
        this.getData();
    }
    async getData() {
        const str = this.props.str;
        let date = this.state.date;
        date = "2021-06-" + (date.length === 1 ? "0" + date : date);
        let dbdata = [];
        function getName(str) {
            return new Promise(async (resolve) => {
                await Axios.get(
                    "https://schedule-calender.herokuapp.com/data",
                    {
                        params: { name: str, date: date },
                    }
                ).then(async (response) => {
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        dbdata.push(data[i]);
                    }
                    resolve(dbdata);
                });
            });
        }
        let data = await getName(str);
        this.setState({ show: data, date: this.props.date + "" });
    }
    render() {
        const curr = this.state;
        return (
            <div className="dayResults">
                <br />
                {curr.show.map((obj, ind) => (
                    <div className="data" key={ind}>
                        <div className="range">
                            {obj.starttime.substring(0, 5)} -
                            {obj.endtime.substring(0, 5)}
                        </div>
                        <div className="task">{obj.task}</div>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
}

export default Day;
