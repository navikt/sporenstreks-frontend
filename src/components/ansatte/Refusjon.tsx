import React from "react";
import {InputProps} from "nav-frontend-skjema/lib/input";
import {Input} from "nav-frontend-skjema";

export interface RefusjonProps extends InputProps {
    refusjon: number
}

export class Refusjon extends React.Component<RefusjonProps> {
    constructor(props) {
        super(props);
        this.state = {
            refusjon: props.refusjon
        }
    }
    handleChange = (evt) => {
        console.log(this.state)
        this.setState({
            refusjon: evt.target.value
        })
    }
    render(){
        return (<div><Input value={this.state["refusjon"]} onChange={this.handleChange}/></div>)
    };
}
