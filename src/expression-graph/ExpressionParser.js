
import ExpressionNode from "./ExpressionNode";
import { AddExpressionNode, MinExpressionNode, MulExpressionNode, DivExpressionNode } from "./MathOperationNodes";
import ExpressionTreeCostructor from "./ExpressionTreeCostructor"

function _isNumber(character ) {
    return /\d/.test(character) && !isNaN(Number(character))
}
function _isNumericElement(character) {
    return character === "."
        || character === ","
        || _isNumber(character);
}
function _createOperationNodeFromChar(char) {
    switch(char) {
        case "+":
            return new AddExpressionNode([]);
        case "-":
            return new MinExpressionNode([]);
        case "*":
            return new MulExpressionNode([]);
        case "/":
            return new DivExpressionNode([]);
        default:
            throw new Error("invalid operation char " + char)
    }
}
var invalidExpressionCharsRegex = /\/\*|\/\/|\*\/|\*\*|-\/|-\*|\+\/|\+\*/g;
function ExpressionParser(expression) {
    var chars = expression.split("");
    //NON VALIDI ** */ // /* +* +/ -* -/
    //    VALIDI *- *+ /+ /- +- ++ -+ --
    
    var containsInvalidOperationCharSequences = invalidExpressionCharsRegex.test(expression);
    
    if (containsInvalidOperationCharSequences) {
        console.log("errore")
        throw new Error("the expression cannot be parsed")
    }

    var treeConstructor = new ExpressionTreeCostructor();
    for (let stringIndex = 0; stringIndex < chars.length; ++stringIndex) {
        let currentNode;
        let character = chars[stringIndex];
        var isNum = _isNumericElement(character);
        if (isNum) {
            let numberChars = [];
            let numberHasMoreThaOneChar = false;
            while (_isNumericElement(character) && stringIndex < chars.length) {
                numberChars.push(character);
                ++stringIndex;
                character = chars[stringIndex];
                numberHasMoreThaOneChar = true;
            }
            if (numberHasMoreThaOneChar) {
                --stringIndex;
            }
            let number = Number(
                numberChars.join("")
            );
            currentNode = new ExpressionNode(number)
        } else {
            currentNode = _createOperationNodeFromChar(character);
        }
        treeConstructor.addNode(currentNode);
    }
    console.log(`tree created`);

    return treeConstructor.getRoot();
}

export default {
    ExpressionParser,
    _createOperationNodeFromChar: _createOperationNodeFromChar
};