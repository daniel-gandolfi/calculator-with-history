import React, {Component} from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtonGrid from "./CalculatorButtonGrid";
import {ADD, MIN, MUL, DIV} from "./MathOperations"
import ExpressionTreeCostructor from "./expression-graph/ExpressionGraphConstructor";

class Calculator extends Component {
    constructor(){
        super();
        this.state = {
            displayValue: 0,
            expression: ""
        }
    }
    onNumberPressed = (num) => {
        this.setState({
            expression: this.state.expression + num
        })
    }
    onOperationPressed = (mathOperation)=> {
        switch (mathOperation) {
            case ADD:
                this.setState({
                    expression: this.state.expression + "+"
                })
                break;
            case MIN:
                this.setState({
                    expression: this.state.expression + "-"
                })
                break;
            case MUL:
                this.setState({
                    expression: this.state.expression + "*"
                })
                break;
            case DIV:
                this.setState({
                    expression: this.state.expression + "/"
                })
                break;
        }
    }
    onEqualPressed = () => {
        const exprTree = new ExpressionTreeCostructor(this.state.expression);
        this.setState({
            displayValue: exprTree.resolve(),
            expression: ""
        })
    }
    render(){
        return <>
            <CalculatorDisplay value={this.state.displayValue}></CalculatorDisplay>
            <CalculatorButtonGrid  onNumberPressed={this.onNumberPressed} onOperationPressed={this.onOperationPressed}
                onEqualPressed={this.onEqualPressed}
            ></CalculatorButtonGrid>
        </>
    }
}
export default Calculator