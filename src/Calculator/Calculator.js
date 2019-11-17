import React, {useState} from "react";
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

const mathOperationToExpressionNodeMap = new Map();

mathOperationToExpressionNodeMap.set(ADD, AddExpressionNode);
mathOperationToExpressionNodeMap.set(MIN, MinExpressionNode);
mathOperationToExpressionNodeMap.set(MUL, MulExpressionNode);
mathOperationToExpressionNodeMap.set(DIV, DivExpressionNode);

const HISTORY_SIZE = 30;
const DEFAULT_DISPLAY_VALUE = "0";

function Calculator() {
	const [display, setDisplay] = useState(DEFAULT_DISPLAY_VALUE);
	const [history, setHistory] = useState(new History(HISTORY_SIZE));
	const [currentHistoryIterator, setCurrentHistoryIterator] = useState(null);
	const [treeConstructor, setTreeConstructor] = useState(new ExpressionTreeCostructor());
	const [isEqualJustPressed, setEqualJustPressed] = useState(false);
	const [isShowingHistory, setShowingHistory] = useState(false);
	const [isClean, setClean] = useState(true);

	function createDefaultState() {
		setDisplay(DEFAULT_DISPLAY_VALUE);
		setTreeConstructor(new ExpressionTreeCostructor());
		setEqualJustPressed(false);
		setCurrentHistoryIterator(null);
		setShowingHistory(false);
		setClean(true);
	}

	const onNumberPressed = (num) => {

		const clearField = isEqualJustPressed || isClean;
		let displayValue;
		if (clearField) {
			displayValue = num
		} else {
			displayValue = display + "" + num
		}

		resetHistoryIterator();

		setDisplay(displayValue);
		setEqualJustPressed(false);
		setShowingHistory(false);
		setClean(false)
	};
	const resetHistoryIterator = () => {
		setCurrentHistoryIterator(null)
	};
	const onDotPressed = () => {
		if (("" + display).indexOf(".") === -1) {
			resetHistoryIterator();
			setDisplay(display + ".");
			setEqualJustPressed(false);
			setShowingHistory(false);
		}
	};
	const isMinusSignTheOnlyCharVisible = () => {
		const isMinusSignVisible = ("" + display).indexOf("-") !== -1;
		return isMinusSignVisible && display.length === 1;
	};
	const onOperationPressed = (mathOperation) => {
		const tree = treeConstructor;
		tree.getLastNodeTypeDescriptor();
		let operationNode;
		if (isMinusSignTheOnlyCharVisible()) {
			return;
		}

		if (isClean) {
			if (mathOperation === MIN) {
				setDisplay("-");
				setTreeConstructor(tree);
				setEqualJustPressed(false);
				setShowingHistory(false);
				setClean(false)
			}
		} else {
			let expressionNodeConstructor = mathOperationToExpressionNodeMap.get(mathOperation);
			operationNode = new expressionNodeConstructor([]);

			const number = Number(display);
			tree.addNode(new ExpressionNode(number));
			tree.addNode(operationNode);
			setDisplay(DEFAULT_DISPLAY_VALUE);
			setTreeConstructor(tree);
			setEqualJustPressed(false);
			setShowingHistory(false);
			setClean(true);
		}
	};
	const onEqualPressed = () => {
		const canComputeValue = !isShowingHistory && !isEqualJustPressed && !isMinusSignTheOnlyCharVisible();
		if (canComputeValue) {
			const number = Number(display);
			treeConstructor.addNode(new ExpressionNode(number));

			const computedValue = treeConstructor.getRoot().resolve();
			history.add(computedValue);
			setHistory(history);
			setDisplay(computedValue);
			setTreeConstructor(new ExpressionTreeCostructor());
			setEqualJustPressed(true);
			setClean(false)
		}
	};
	const reset = () => {
		resetHistoryIterator();
		createDefaultState();
	};
	const deleteLastChar = () => {
		const displayValue = "" + display;
		if (displayValue !== DEFAULT_DISPLAY_VALUE) {
			setDisplay(displayValue.length !== 1 ? displayValue.substr(0, displayValue.length - 1) : DEFAULT_DISPLAY_VALUE);
			setClean(displayValue.length === 1)
		}
	};
	const handleHistoryExtraction = (iterator, savedValue) => {
		if (savedValue) {
			const newTree = new ExpressionNode(savedValue);
			setCurrentHistoryIterator(iterator);
			setTreeConstructor(new ExpressionTreeCostructor());
			setDisplay(newTree.resolve());
			setShowingHistory(true);
			setEqualJustPressed(false);
			setClean(false);
		}
	};
	const createHistoryIterator = () => {
		return history.getIterator();
	};
	const onBackPressed = () => {
		let iterator = currentHistoryIterator;
		if (!iterator) {
			iterator = createHistoryIterator();
		}
		if (iterator && iterator.hasPrevious()) {
			if (isEqualJustPressed) {
				iterator.last();
			}
			handleHistoryExtraction(iterator, iterator.previous());
		}
	};
	const onForwardPressed = () => {
		let iterator = currentHistoryIterator;
		if (!iterator) {
			iterator = createHistoryIterator();
		}
		if (iterator && iterator.hasNext()) {
			handleHistoryExtraction(iterator, iterator.next());
		}
	};

	return <div className={styles.container}>
		<CalculatorDisplay value={display}/>
		<CalculatorButtonGrid
			onNumberPressed={onNumberPressed}
			onOperationPressed={onOperationPressed}
			onEqualPressed={onEqualPressed}
			onDotPressed={onDotPressed}
			onResetPressed={reset}
			onDeletePressed={deleteLastChar}
			onBackPressed={onBackPressed}
			onForwardPressed={onForwardPressed}
		/>
	</div>
}

export default Calculator
