import React, {Component} from "react";
import CalculatorDisplay from "../CalculatorDisplay/CalculatorDisplay";
import CalculatorButtonGrid from "../CalculatorButtonGrid/CalculatorButtonGrid";
import {ADD, DIV, MIN, MUL} from "../MathOperations"
import ExpressionNode from "../expression-graph/ExpressionNode";
import ExpressionTreeCostructor
    from "../expression-graph/ExpressionTreeCostructor";
import styles from "./Calculator.module.scss"
import History from "../History";

import {
    AddExpressionNode,
    DivExpressionNode,
    MinExpressionNode,
    MulExpressionNode
} from "../expression-graph/MathOperationNodes";

function createDefaultState() {
    return {
        display: DEFAULT_DISPLAY_VALUE,
        treeConstructor: new ExpressionTreeCostructor(),
        isEqualJustPressed: false,
        currentHistoryIterator: null,
        isShowingHistory: false,
        isClean: true
    }
}

const HISTORY_SIZE = 30;
const DEFAULT_DISPLAY_VALUE = "0";
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

        var clearField = this.state.isEqualJustPressed || this.state.isClean;
        var displayValue;
        if (clearField) {
            displayValue = num
        } else {
            displayValue = this.state.display + "" + num
        }

        this.resetHistoryIterator();

        this.setState({
            display: displayValue,
            isEqualJustPressed: false,
            isShowingHistory: false,
            isClean: false
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
        if (("" + this.state.display).indexOf(".") === -1) {
            this.resetHistoryIterator();
            this.setState({
                display: this.state.display + ".",
                isEqualJustPressed: false,
                isShowingHistory: false
            })
        }
    }
    isMinusSignTheOnlyCharVisible = () => {
        const isMinusSignVisible = ("" + this.state.display).indexOf("-") !== -1;
        return isMinusSignVisible && this.state.display.length === 1;
    }
    onOperationPressed = (mathOperation) => {
        const tree = this.state.treeConstructor;
        const lastNodeDescriptor = tree.getLastNodeTypeDescriptor();
        var operationNode;
        if (this.isMinusSignTheOnlyCharVisible()) {
            return;
        }

        if (this.state.isClean) {
            if (mathOperation === MIN) {
                this.setState({
                    display: "-",
                    tree,
                    isEqualJustPressed: false,
                    isShowingHistory: false,
                    isClean: false
                })
            }
        } else {
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

            var number = Number(this.state.display);
            tree.addNode(new ExpressionNode(number));
            tree.addNode(operationNode);
            this.setState({
                display: DEFAULT_DISPLAY_VALUE,
                tree,
                isEqualJustPressed: false,
                isShowingHistory: false,
                isClean: true
            })
        }
    }
    onEqualPressed = () => {
        const canComputeValue = !this.state.isShowingHistory && !this.state.isEqualJustPressed && !this.isMinusSignTheOnlyCharVisible();
        if (canComputeValue) {
            var number = Number(this.state.display);
            var tree = this.state.treeConstructor;
            tree.addNode(new ExpressionNode(number));

            var computedValue = tree.getRoot().resolve();
            this.state.history.add(computedValue);
            this.setState({
                display: computedValue,
                treeConstructor: new ExpressionTreeCostructor(),
                isEqualJustPressed: true,
                isClean: false
            })
        }
    }
    reset = () => {
        this.resetHistoryIterator();
        this.setState(createDefaultState())
    }
    deleteLastChar = () => {
        const display = "" + this.state.display;
        if (display !== DEFAULT_DISPLAY_VALUE) {
            this.setState({
                display: (display.length !== 1 ? display.substr(0, display.length - 1) : DEFAULT_DISPLAY_VALUE),
                isClean: display.length === 1
            })
        }
    };
    handleHistoryExtraction = (savedValue) => {
        if (savedValue) {
            const newTree = new ExpressionNode(savedValue);
            this.setState({
                treeConstructor: new ExpressionTreeCostructor(),
                display: newTree.resolve(),
                isShowingHistory: true,
                isEqualJustPressed: false,
                isClean: false
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
        if (currentHistoryIterator && currentHistoryIterator.hasPrevious()) {
            if (this.state.isEqualJustPressed) {
                currentHistoryIterator.last();
            }
            this.handleHistoryExtraction(currentHistoryIterator.previous());
        }
    };
    onForwardPressed = () => {
        const currentHistoryIterator = this.getOrCreateHistoryIterator();
        if (currentHistoryIterator && currentHistoryIterator.hasNext()) {
            this.handleHistoryExtraction(currentHistoryIterator.next());
        }
    };

    getBtnGridComponent = (() => {
        var component = (
            <CalculatorButtonGrid
              onNumberPressed={this.onNumberPressed}
              onOperationPressed={this.onOperationPressed}
              onEqualPressed={this.onEqualPressed}
              onDotPressed={this.onDotPressed}
              onResetPressed={this.reset}
              onDeletePressed={this.deleteLastChar}
              onBackPressed={this.onBackPressed}
              onForwardPressed={this.onForwardPressed}
            />
        );
        return () => component;
    })();

    render() {
        return <div className={styles.container}>
            <CalculatorDisplay value={this.state.display}/>
            {this.getBtnGridComponent()}
        </div>
    }
}

export default Calculator
