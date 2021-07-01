import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import AddData from "./AddData";
import "./App.css";
import React, { Component } from "react";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "Day",
            date: 1,
        };
    }
    changeView = (e) => {
        let ele= document.getElementById("mi");
        if(e.target.value === "Month"){
            ele.style.display= "none";
        }else ele.style.display= "block";
        this.setState({view: e.target.value});
    }
    changeVal = (e) => {
        if(this.state.view==="Week" && 
        (e.target.value < 0 || e.target.value > 5)) return;
        if(e.target.value < 0 || e.target.value > 30) return;
        this.setState({date: e.target.value});
    }
    render() {
        const curr = this.state;
        let max= 30;
        let view = <Day str={this.props.str} date={curr.date} view={curr.view}/>;
        if (curr.view === "Week") {
            view = <Week str={this.props.str} date={curr.date} view={curr.view}/>;
            max= 5;
        } else if (curr.view === "Month") {
            view = <Month str={this.props.str}  view={curr.view}/>;
        }
        return this.props.enter ? (
            <React.Fragment>
                <div className="header2">
                    <button className="back" onClick={this.props.back}>
                        <i className="fas fa-caret-left backpadding"></i>BACK
                    </button>
                    <input
                        onChange={(e) => this.changeVal(e)}
                        type="number"
                        id="mi"
                        value= {curr.date}
                        min= {0}
                        max= {max}
                        className="midInput"
                    />
                    <select
                        className="viewType"
                        onChange={(e)=>this.changeView(e)}
                    >
                        <option type="1"> Day </option>
                        <option type="2"> Week </option>
                        <option type="3"> Month </option>
                    </select>
                </div>
                {view}
                <AddData date={curr.date}  str={this.props.str}/>
            </React.Fragment>
        ) : (
            <div className="header">
                <div className="headerFont">
                    <div className="oneLine">
                        <input
                            placeholder="🔎 Search Teacher"
                            className="input"
                            type="text"
                            onChange={(e) => this.props.textChange(e)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;
