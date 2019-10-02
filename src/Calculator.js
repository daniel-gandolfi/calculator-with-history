import React, {Component} from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorButtonGrid from "./CalculatorButtonGrid";
import {ADD, MIN, MUL, DIV} from "./MathOperations"
import ExpressionNode from "./expression-graph/ExpressionNode";
import ExpressionTreeCostructor from "./expression-graph/ExpressionTreeCostructor";
import styles from "./Calculator.module.scss"

import {
    AddExpressionNode, DivExpressionNode,
    MinExpressionNode, MulExpressionNode
} from "./expression-graph/MathOperationNodes";

class Calculator extends Component {
    constructor(){
        super();
        this.state = {
            display: "0",
            tree: new ExpressionTreeCostructor(),
            isEqualJustPressed: false
        }
    }
    onNumberPressed = (num) => {

        var clearField = this.state.isEqualJustPressed || this.state.display === "0"
        var displayValue ;
        if (clearField) {
            displayValue = num
        } else {
            displayValue = this.state.display + "" + num
        }

        this.setState({
            display: displayValue,
            isEqualJustPressed: false
        })
    }
    onDotPressed = () => {
        this.setState({
            display: this.state.display + ".",
            isEqualJustPressed: false
        })
    }
    onOperationPressed = (mathOperation)=> {
        var operationNode;
        switch (mathOperation) {
            case ADD:
                operationNode = new AddExpressionNode([]);
                break;
            case MIN:
                operationNode = new MinExpressionNode([]);
                break;
            case MUL:
                operationNode = new MulExpressionNode([]);
                break;
            case DIV:
                operationNode = new DivExpressionNode([]);
                break;
        }

        var number = Number(this.state.display)
        var tree = this.state.tree;
        tree.addNode(new ExpressionNode(number))
        tree.addNode(operationNode);
        this.setState({
            display: "0",
            tree,
            isEqualJustPressed: false
        })
    }
    onEqualPressed = () => {
        var number = Number(this.state.display)
        var tree = this.state.tree;
        tree.addNode(new ExpressionNode(number))

        this.setState({
            display: tree.getRoot().resolve(),
            tree: tree,
            isEqualJustPressed: true
        })
    }
    render(){
        return <div className={styles.container}>
            <CalculatorDisplay value={this.state.display}></CalculatorDisplay>
            <CalculatorButtonGrid  onNumberPressed={this.onNumberPressed} onOperationPressed={this.onOperationPressed}
                onEqualPressed={this.onEqualPressed} onDotPressed={this.onDotPressed}
            ></CalculatorButtonGrid>
        </div>
    }
}
export default Calculator