import React from "react";
import {useCallback} from "react";
import {ADD, MIN,MUL, DIV} from "../MathOperations"
import styles from "./CalculatorButtonGrid.module.scss"

const numberList = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
];

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

    const addPressed = useCallback(() => onOperationPressed(ADD), [onOperationPressed]),
      minPressed = useCallback(() => onOperationPressed(MIN), [onOperationPressed]),
      mulPressed = useCallback(() => onOperationPressed(MUL), [onOperationPressed]),
      divPressed = useCallback(() => onOperationPressed(DIV), [onOperationPressed]);

    const numberCallbackList = numberList.map(function (number) {
        return ()=>onNumberPressed(number)
    });

    return <div className={styles.container}>
        <button className={styles["button--operation"]} onClick={onBackPressed}>&#x27F2;</button>
        <button className={styles["button--operation"]} onClick={onForwardPressed}>&#x27F3;</button>
        <button className={styles["button--operation"]} onClick={onDeletePressed}>&#x232B;</button>
        <button className={styles["button--math-operation"]} onClick={divPressed}>/</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[1]}>1</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[2]}>2</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[3]}>3</button>
        <button className={styles["button--math-operation"]} onClick={addPressed}>+</button>

        <button className={styles["button--number"]} onClick={numberCallbackList[4]}>4</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[5]}>5</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[6]}>6</button>
        <button className={styles["button--math-operation"]} onClick={minPressed}>-</button>

        <button className={styles["button--number"]} onClick={numberCallbackList[7]}>7</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[8]}>8</button>
        <button className={styles["button--number"]} onClick={numberCallbackList[9]}>9</button>
        <button className={styles["button--math-operation"]} onClick={mulPressed}>x</button>

        <button className={styles["button--operation"]} onClick={onResetPressed}>AC</button>
        <button className={styles["button--zero"]} onClick={numberCallbackList[0]}>0</button>
        <button className={styles["button--dot"]} onClick={onDotPressed}>.</button>
        <button className={styles["button--math-operation"]} onClick={onEqualPressed}>=</button>
    </div>
}
export default React.memo(CalculatorButtonGrid)