import React from "react";
import partial from "lodash/partial"
import {ADD, MIN,MUL, DIV} from "../MathOperations"
import styles from "./CalculatorButtonGrid.module.scss"
function CalculatorButtonGrid (props){
    const {
        onNumberPressed,
        onOperationPressed,
        onEqualPressed,
        onDotPressed,
        onBackPressed,
        onForwardPressed,
        onDeletePressed,
        onResetPressed
    } = props;
    return <div className={styles.container}>
        <button className={styles["button--operation"]} onClick={onBackPressed}>&#x27F2;</button>
        <button className={styles["button--operation"]} onClick={onForwardPressed}>&#x27F3;</button>
        <button className={styles["button--operation"]} onClick={onDeletePressed}>&#x232B;</button>
        <button className={styles["button--math-operation"]} onClick={partial(onOperationPressed,DIV)}>/</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,1)}>1</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,2)}>2</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,3)}>3</button>
        <button className={styles["button--math-operation"]} onClick={partial(onOperationPressed,ADD)}>+</button>

        <button className={styles["button--number"]} onClick={partial(onNumberPressed,4)}>4</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,5)}>5</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,6)}>6</button>
        <button className={styles["button--math-operation"]} onClick={partial(onOperationPressed,MIN)}>-</button>

        <button className={styles["button--number"]} onClick={partial(onNumberPressed,7)}>7</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,8)}>8</button>
        <button className={styles["button--number"]} onClick={partial(onNumberPressed,9)}>9</button>
        <button className={styles["button--math-operation"]} onClick={partial(onOperationPressed,MUL)}>x</button>

        <button className={styles["button--operation"]} onClick={onResetPressed}>AC</button>
        <button className={styles["button--zero"]} onClick={partial(onNumberPressed,0)}>0</button>
        <button className={styles["button--dot"]} onClick={onDotPressed}>.</button>
        <button className={styles["button--math-operation"]} onClick={onEqualPressed}>=</button>
    </div>
}
export default React.memo(CalculatorButtonGrid)