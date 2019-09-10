import ExpressionGraphConstructor   from "./ExpressionGraphConstructor"
import {isMulOrDivNode}   from "./ExpressionGraphConstructor"
import {isAddOrMinNode}  from "./ExpressionGraphConstructor"
import math from "math-expressions"
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

    describe("expression parsing tests", function(){
        const levels = {
            simple: [
                "2",
                "1+1",
                "3*3",
                "16/4",
                "6-2",
                "-6-2",
                "6-80"
            ],
            medium: [
                "2*2+4",
                "2+2*4",
                "2/2*2",
                "2/2/2",
                "--2",
                "2*-1",
                "+-1"
            ],
            hard: [
                "2*2+2/2",
                "2+2/2*2",
                "2/-3",
                "-0.5+1*2/4",
                "-4/3*-1/5"
            ]
        }
        Object.keys(levels).forEach(function(difficulty){
            const expressionTests = levels[difficulty];
            describe("start test of level " + difficulty, function(){
                expressionTests.forEach(function(expression){
                    const res = math.fromText(expression).evaluate();
                    it(expression + "=" + res, function(){
                        const rootNode = new ExpressionGraphConstructor(expression);
                        expect(rootNode.resolve()).toBe(res);
                    })
                })
            })
        })
    })
})