import React, {Component} from "react";
import styles from "./CalculatorDisplay.module.scss"
class CalculatorDisplay extends Component {

    render(){
        return <div className={styles.display}>
            {this.props.value}
        </div>
    }
}
export default CalculatorDisplay