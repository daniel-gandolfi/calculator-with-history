import React from "react";
import styles from "./CalculatorDisplay.module.scss"
function CalculatorDisplay (props){
    return <div className={styles.display}>
        {props.value}
    </div>
}
export default CalculatorDisplay