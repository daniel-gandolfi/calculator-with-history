import React, {Component} from "react";

class CalculatorDisplay extends Component {

    render(){
        return <>
            {this.props.value}
        </>
    }
}
export default CalculatorDisplay