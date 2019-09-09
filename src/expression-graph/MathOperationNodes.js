import ExpressionNode from "./ExpressionNode";
import * as MathOperations from "../MathOperations"
function add (args) {

    return args.reduce((tot, node) => tot + node.resolve(),0);
}
function multiplication (args) {
    return args.reduce((tot, node) => tot * node.resolve(),1)
}
function min (args) {
    let firstNode = args[0];
    if (args.length === 1 ) {
        return -1*firstNode.resolve();
    } else {
        return args.slice(1) .reduce((tot, node) => tot - node.resolve(), firstNode.resolve());
    }
}
function division (args) {
    let firstNode = args[0];
    if (args.length === 1 ) {
        return firstNode.resolve();
    } else {
        return args.slice(1) .reduce((tot, node) => tot / node.resolve(), firstNode.resolve());
    }
}

function AddExpressionNode(children) {
    ExpressionNode.call(this, add, children);
}
AddExpressionNode.prototype = Object.create(ExpressionNode.prototype)
AddExpressionNode.prototype.mathOperation = MathOperations.ADD;

function MinExpressionNode(children) {
    ExpressionNode.call(this,min ,children);
}
MinExpressionNode.prototype = Object.create(ExpressionNode.prototype)
MinExpressionNode.prototype.mathOperation = MathOperations.MIN;

function MulExpressionNode(children) {
    ExpressionNode.call(this,multiplication, children);
}
MulExpressionNode.prototype = Object.create(ExpressionNode.prototype)
MulExpressionNode.prototype.mathOperation = MathOperations.MUL;

function DivExpressionNode(children) {
    ExpressionNode.call(this,division, children);
}
DivExpressionNode.prototype = Object.create(ExpressionNode.prototype)
DivExpressionNode.prototype.mathOperation = MathOperations.DIV;

AddExpressionNode.prototype.parent = 
    MinExpressionNode.prototype.parent = 
    MulExpressionNode.prototype.parent =
    DivExpressionNode.prototype.parent = 
    ExpressionNode;

export {AddExpressionNode,MinExpressionNode,MulExpressionNode,DivExpressionNode}