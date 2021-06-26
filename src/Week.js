import React, { Component } from 'react';
import Axios from "axios";
import "./App.css";

class Week extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekDays: ["SUN","MON","TUE","WED","THURS","FRI","SAT"],
            show: [],
            startDay: -1,
            date: 1
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.date+""==="") return ({});
        return ({date : props.date});          
    }
    shouldComponentUpdate(props){
        if(props.view !== "Week" || props.date+""==="") return false;
        return true;
    }
    componentDidUpdate(props){
        if(props.date === this.state.date) return;
        this.getData();
    }
    async getData() {
        const curr= this.state;
        const name = this.props.str;
        const weekStart= curr.startDay + curr.date * 7;
        let dbdata = [];
        function weekInfo(str,day) {
            let daydata= [];
            return new Promise(async (resolve) => {
                if(day < 1 || day > 30){
                    resolve(daydata);
                }
                day= day+"";
                let date= "2021-06-" + (day.length === 1 ? "0" + day : day);
                await Axios.get("https://schedule-calender.herokuapp.com/data", {
                    params: {name : str, date : date},
                }).then(async (response) => {
                     let currday= response.data;
                    for(let i = 0; i < currday.length; i++){
                        daydata.push(currday[i].starttime.substring(0, 5)+"-"+
                        currday[i].endtime.substring(0, 5));
                        daydata.push(currday[i].task);
                    }
                    resolve(daydata);
                });
            });
        }
        for(let i=weekStart; i<weekStart+7; i++){
            let daydata = await weekInfo(name,i);
            dbdata.push(daydata);
        }
        this.setState({data : dbdata});
    }
    render() {
        const curr= this.state;
        let i=0;
        return (
            <div className="WeekParent">
                {
                    curr.show.map((day,ind)=>(
                    <div className="WeekDayParent">
                        <div key={ind} className="Wday">
                            {curr.weekDays[i++]}
                        </div>
                        <div>
                            {
                                day.map((data,index)=>(
                                    <div> {data} </div>
                                ))
                            }
                        </div>
                    </div>
                    ))
                }
            </div>
        )
    }
}

export default Week
