import ExpressionNode from "./ExpressionNode";
import {
    AddExpressionNode, MulExpressionNode, 
    MinExpressionNode,DivExpressionNode
} from "./MathOperationNodes"

describe("Math operation nodes tests", function(){
    const nodeNumber2 = new ExpressionNode(2);
    const nodeNumber3 = new ExpressionNode(3);
    const nodeNumber5 = new ExpressionNode(5);
    
    describe("AddExpressionNode test", function(){
        it("should add 3 and 2 ", function(){ 
            const addNode = new AddExpressionNode([
                nodeNumber3,
                nodeNumber2
            ]);
            expect(addNode.resolve()).toBe(5)
        })
    })
    describe("MulExpressionNode test", function(){
        it("should mul 5 and 2 ", function(){ 
            const mulNode = new MulExpressionNode([
                nodeNumber5,
                nodeNumber2
            ]);
            expect(mulNode.resolve()).toBe(10)
        })
    })
    describe("MinExpressionNode test", function(){
        it("should min 5 and 2 ", function(){ 
            const minNode = new MinExpressionNode([
                nodeNumber5,
                nodeNumber2
            ]);
            expect(minNode.resolve()).toBe(3)
        })
    })
    describe("DivExpressionNode test", function(){
        it("should div 5 and 2 ", function(){ 
            const divNode = new DivExpressionNode([
                nodeNumber5,
                nodeNumber3
            ]);
            expect(divNode.resolve()).toBe(5/3)
        })
    })
    describe("Composition test", function(){
        it("should ((5+5)*3 - 2)/2=6.5 ", function(){ 
            const addNode = new AddExpressionNode([
                nodeNumber5,
                nodeNumber5
            ]);
            const mulNode = new MulExpressionNode([
                addNode,
                nodeNumber3
            ])
            const minNode = new MinExpressionNode([
                mulNode,
                nodeNumber2
            ])
            const divNode = new DivExpressionNode([
                minNode,
                nodeNumber2
            ])
            expect(divNode.resolve()).toBe(((5+5)*3 - 2)/2)
        })
    })
    
})