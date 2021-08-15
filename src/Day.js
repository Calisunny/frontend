import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import UpdateForm from "./UpdateForm";

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: [],
            date: "0",
            start: "",
            end: "",
            task: "",
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
    makeVisible = (e) => {
        let element = document.getElementById("UpdForm");
        element.classList.add("visibleUpd");
        element.classList.remove("hiddenUpd");
    };
    componentDidUpdate(props) {
        if (props.date + "" === this.state.date) return;
        this.getData();
    }
    detailsForUpdate= (obj) =>{
        this.setState({start: obj.starttime.substring(0, 5),
            end: obj.endtime.substring(0, 5), task: obj.task});
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
        this.setState({ show: data, date: "2021-06-" });
    }
    render() {
        const curr = this.state;
        const props = this.props;
        return (
            <div className="dayResults">
            <UpdateForm name={props.str} start={curr.start} task={curr.task}
            date={curr.date} end={curr.end} />
                <br />
                {curr.show.map((obj, ind) => (
                    <div className="data" key={ind} 
                    onClick={()=>this.detailsForUpdate(obj)}>  
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
