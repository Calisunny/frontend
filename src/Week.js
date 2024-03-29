import React, { Component } from "react";
import Axios from "axios";
import UpdateForm from "./UpdateForm";
import "./App.css";

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDays: ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"],
            show: [],
            startDay: -1,
            date: 0,
            start: "",
            end: "",
            task: "",
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.date + "" === "") return {};
        return { date: props.date };
    }
    shouldComponentUpdate(props) {
        if (props.view !== "Week" || props.date + "" === "") return false;
        return true;
    }
    detailsForUpdate = (obj) => {
        this.setState({
            start: obj.starttime.substring(0, 5),
            end: obj.endtime.substring(0, 5),
            task: obj.task,
        });
    };
    componentDidUpdate(props) {
        if (props.date === this.state.date) return;
        this.getData();
    }
    async getData() {
        const curr = this.state;
        const name = this.props.str;
        const weekStart = curr.startDay + curr.date * 7;
        let dbdata = [];
        function weekInfo(str, day) {
            return new Promise(async (resolve) => {
                if (day < 1 || day > 30) {
                    resolve([]);
                }
                day = day + "";
                let date = "2021-06-" + (day.length === 1 ? "0" + day : day);
                await Axios.get(
                    "https://schedule-calender.herokuapp.com/data",
                    {
                        params: { name: str, date: date },
                    }
                ).then(async (response) => {
                    let currday = response.data;
                    resolve(currday);
                });
            });
        }
        for (let i = weekStart; i < weekStart + 7; i++) {
            let daydata = await weekInfo(name, i);
            dbdata.push(daydata);
        }
        this.setState({ show: dbdata });
    }
    render() {
        const props = this.props;
        const curr = this.state;
        let i = 0;
        return (
            <div className="WeekParent">
                <UpdateForm
                    name={props.str}
                    start={curr.start}
                    task={curr.task}
                    date={curr.date}
                    end={curr.end}
                />
                {curr.show.map((day, ind) => (
                    <div className="WeekDayParent" key={ind}>
                        <div
                            key={ind}
                            className={
                                i === 0 || i === 6 ? "Wday Wend" : "Wday"
                            }
                        >
                            {curr.weekDays[i++]}
                        </div>

                        <div className="data data-week" key={ind + "d"}>
                            {day.map((obj, index) =>
                                obj.task === undefined ? (
                                    <React.Fragment />
                                ) : (
                                    <div
                                        className="dataContainer"
                                        key={index + "" + { ind }}
                                        onClick={() =>
                                            this.detailsForUpdate(obj)
                                        }
                                    >
                                        <div
                                            className="range"
                                            key={index + "r"}
                                        >
                                            {obj.starttime.substring(0, 5)} -
                                            {obj.endtime.substring(0, 5)}
                                        </div>
                                        <div className="task" key={index + "t"}>
                                            {obj.task}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
}

export default Week;
