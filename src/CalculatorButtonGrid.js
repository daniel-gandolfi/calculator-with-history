import React, {PureComponent} from "react";
import partial from "lodash/partial"
import {ADD, MIN,MUL, DIV} from "./MathOperations"
class CalculatorButtonGrid extends PureComponent {

    
    render(){
        const {
            onNumberPressed,
            onOperationPressed,
            onEqualPressed,
            onBackPressed,
            onForwardPressed,
            onDeletePressed
        } = this.props;
        return <>
            <button onClick={partial(onNumberPressed,1)}>1</button>
            <button onClick={partial(onNumberPressed,2)}>2</button>
            <button onClick={partial(onNumberPressed,3)}>3</button>
            <button onClick={partial(onNumberPressed,4)}>4</button>
            <button onClick={partial(onNumberPressed,5)}>5</button>
            <button onClick={partial(onNumberPressed,6)}>6</button>
            <button onClick={partial(onNumberPressed,7)}>7</button>
            <button onClick={partial(onNumberPressed,8)}>8</button>
            <button onClick={partial(onNumberPressed,9)}>9</button>
            <button onClick={partial(onNumberPressed,0)}>0</button>
            <button onClick={partial(onOperationPressed,ADD)}>+</button>
            <button onClick={partial(onOperationPressed,MIN)}>-</button>
            <button onClick={partial(onOperationPressed,MUL)}>x</button>
            <button onClick={partial(onOperationPressed,DIV)}>/</button>
            <button onClick={onEqualPressed}>=</button>
        </>
    }
}
export default CalculatorButtonGrid