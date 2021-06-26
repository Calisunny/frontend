import React, { Component } from 'react'
import './App.css';
class SearchTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: ""
        }
    }
    textChange= e =>{
        this.setState({display: e.target.value});
    }
    clicked= e =>{
        this.props.search(this.state.display);
    }
    render() {
        let curr= this.state;
        return (
            <div className= "headerFont">
                <label>Search Teacher</label>
                <div className= "oneLine">
                    <input className= "input" type= "text" onChange={this.textChange} value={curr.display}/>
                    <button className= "find" onClick={this.clicked}>
                        <span className= "span">Find</span>
                        <span className= "span">Find</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default SearchTeacher

