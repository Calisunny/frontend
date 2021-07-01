import React, { Component } from 'react'; 
import Axios from "axios";
import "./App.css";

class Month extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: [],
        }
    }
    shouldComponentUpdate(props){
        if(props.view !== "Month") return false;
        return true;
    }
    componentDidUpdate(props){
        if(props.date === this.state.date) return;
        this.getData();
    }
    async getData() {
        console.log("called");
        const name = this.props.str;
        let dbdata = [];
        function monthInfo(str,day) {
            let daydata= [];
            return new Promise(async (resolve) => {
                day= day+"";
                let date= "2021-06-" + (day.length === 1 ? "0" + day : day);
                daydata.push(date);
                await Axios.get("https://schedule-calender.herokuapp.com/data", {
                    params: {name : str, date : date},
                }).then(async (response) => {
                    let currday= response.data;
                    for (let i = 0; i < currday.length; i++) {
                        daydata.push(currday[i]);
                    }
                    resolve(daydata);
                });
            });
        }
        for(let i=1; i<=30; i++){
            let daydata= await monthInfo(name,i);
            dbdata.push(daydata);
        }
        this.setState({show : dbdata});
    }
    render() {
        let days= [];
        let show= this.state.show;
        for(let i=1; i<=30; i++){
           days.push("June "+ i);
        }
        return (
            <div className="teacherParent">
                {
                    show.map((day,ind)=>(
                        <div key={ind} className="teacherContainer">
                            <div className="bigText" key={ind}>
                                {days[ind]}
                            </div>
                            <div className= "data">
                            {
                                day.map((obj,index)=>(
                                obj.task===undefined ? (<React.Fragment/>) :
                                (
                                    <div key={index}>
                                        <div className="range">
                                            {obj.starttime.substring(0, 5)} -
                                            {obj.endtime.substring(0, 5)}
                                        </div>
                                        <div className="task">{obj.task}</div>
                                    </div>
                                )
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    componentDidMount() {
        this.getData();
    }
}

export default Month
