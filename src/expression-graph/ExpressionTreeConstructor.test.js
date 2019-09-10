import {isMulOrDivNode}   from "./ExpressionGraphConstructor"
import {isAddOrMinNode}  from "./ExpressionGraphConstructor"
import { MulExpressionNode, DivExpressionNode, AddExpressionNode, MinExpressionNode } from "./MathOperationNodes";
import ExpressionNode from "./ExpressionNode";
function prepareNodeForLog(node) {
    var newNode = {
        nodeValue: node.nodeValue,
        children: node.chilren ? node.chilren.map(prepareNodeForLog): []
    }

    return newNode;
}

describe("ExpressionParser tests", function(){

    describe("utility functinos tests", function(){
        var mulNode = new MulExpressionNode();
        var divNode = new DivExpressionNode();
        var addNode = new AddExpressionNode();
        var minNode = new MinExpressionNode();
        var numNode = new ExpressionNode(2);
        it ("isAddOrMinNode", function(){
            expect(isAddOrMinNode(mulNode)).toBeFalsy()
            expect(isAddOrMinNode(divNode)).toBeFalsy()
            expect(isAddOrMinNode(addNode)).toBeTruthy();
            expect(isAddOrMinNode(minNode)).toBeTruthy();
            expect(isAddOrMinNode(numNode)).toBeFalsy();
        })
        it ("isMulOrDivNode", function(){
            expect(isMulOrDivNode(mulNode)).toBeTruthy()
            expect(isMulOrDivNode(divNode)).toBeTruthy()
            expect(isMulOrDivNode(addNode)).toBeFalsy();
            expect(isMulOrDivNode(minNode)).toBeFalsy();
            expect(isMulOrDivNode(numNode)).toBeFalsy();
        })
    })
})