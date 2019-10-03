import React, {Component} from "react";
import CalculatorDisplay from "../CalculatorDisplay/CalculatorDisplay";
import CalculatorButtonGrid from "../CalculatorButtonGrid/CalculatorButtonGrid";
import {ADD, MIN, MUL, DIV} from "../MathOperations"
import ExpressionNode from "../expression-graph/ExpressionNode";
import ExpressionTreeCostructor
    from "../expression-graph/ExpressionTreeCostructor";
import styles from "./Calculator.module.scss"
import History from "../History";

import {
    AddExpressionNode, DivExpressionNode,
    MinExpressionNode, MulExpressionNode
} from "../expression-graph/MathOperationNodes";

function createDefaultState() {
    return {
        display: "0",
        treeConstructor: new ExpressionTreeCostructor(),
        isEqualJustPressed: false,
        currentHistoryIterator: null
    }
}

const HISTORY_SIZE = 30;

class Calculator extends Component {
    constructor() {
        super();
        this.state = Object.assign(
            createDefaultState(),
            {
                history: new History(HISTORY_SIZE),
                currentHistoryIterator: null
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.display !== nextState.display);
    }

    onNumberPressed = (num) => {

        var clearField = this.state.isEqualJustPressed || this.state.display === "0"
        var displayValue;
        if (clearField) {
            displayValue = num
        } else {
            displayValue = this.state.display + "" + num
        }

        this.resetHistoryIterator();

        this.setState({
            display: displayValue,
            isEqualJustPressed: false
        })
    }
    resetHistoryIterator = () => {
        if (this.state.currentHistoryIterator != null) {
            this.setState({
                currentHistoryIterator: null
            });
        }
    }
    onDotPressed = () => {
        this.resetHistoryIterator();
        this.setState({
            display: this.state.display + ".",
            isEqualJustPressed: false
        })
    }
    onOperationPressed = (mathOperation) => {
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
            default:
                return;
        }

        var number = Number(this.state.display)
        var tree = this.state.treeConstructor;
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
        var tree = this.state.treeConstructor;
        tree.addNode(new ExpressionNode(number))

        var computedValue = tree.getRoot().resolve();
        this.state.history.add(computedValue)
        this.setState({
            display: computedValue,
            treeConstructor: new ExpressionTreeCostructor(),
            isEqualJustPressed: true
        })
    }
    reset = () => {
        this.setState(createDefaultState())
    }
    deleteLastChar = () => {
        const display = "" + this.state.display;
        if (display !== "0") {
            this.setState({
                display: (display.length !== 1 ? display.substr(0, display.length - 1) : "0")
            })
        }
    };
    handleHistoryExtraction = (savedValue) => {
        if (savedValue) {
            const newTree = new ExpressionNode(savedValue);
            this.setState({
                treeConstructor: new ExpressionTreeCostructor(),
                display: newTree.resolve(),
                isEqualJustPressed: true
            })
        }
    };
    getOrCreateHistoryIterator = () => {
        var currentHistoryIterator = this.state.currentHistoryIterator;
        if (!currentHistoryIterator) {
            currentHistoryIterator = this.state.history.getIterator();
            this.setState({
                currentHistoryIterator
            })
        }
        return currentHistoryIterator;
    };
    onBackPressed = () => {
        const currentHistoryIterator = this.getOrCreateHistoryIterator();
        if (currentHistoryIterator.hasPrevious()) {
            this.handleHistoryExtraction(currentHistoryIterator.previous());
        }
    };
    onForwardPressed = () => {
        const currentHistoryIterator = this.getOrCreateHistoryIterator();
        if (currentHistoryIterator.hasNext()) {
            this.handleHistoryExtraction(currentHistoryIterator.next());
        }
    };

    render() {
        return <div className={styles.container}>
            <CalculatorDisplay value={this.state.display}/>
            <CalculatorButtonGrid onNumberPressed={this.onNumberPressed}
                onOperationPressed={this.onOperationPressed}
                onEqualPressed={this.onEqualPressed}
                onDotPressed={this.onDotPressed}
                onResetPressed={this.reset}
                onDeletePressed={this.deleteLastChar}
                onBackPressed={this.onBackPressed}
                onForwardPressed={this.onForwardPressed}
            />
        </div>
    }
}

export default Calculator