import React from "react";
import {InputProps} from "nav-frontend-skjema/lib/input";
import {Input} from "nav-frontend-skjema";

export interface DagerProps extends InputProps {
    antall: number
}

export class Dager extends React.Component<DagerProps> {
    constructor(props) {
        super(props);
        this.state = {
            antall: props.antall
        }
    }
    handleChange = (evt) => {
        console.log(this.state)
        this.setState({
            antall: evt.target.value
        })
    }
    render(){
        return (<div><Input value={this.state["antall"]} onChange={this.handleChange}/></div>)
    };
}
