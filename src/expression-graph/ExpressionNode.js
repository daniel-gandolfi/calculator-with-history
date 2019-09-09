import isFunction from "lodash/isFunction"
import isArray from "lodash/isArray"

import * as NodeTypes from "./ExpressionNodeTypes";


function ExpressionNode (nodeValue, children) {
    if (isFunction(nodeValue)) {
        this.setChildren(children);
    } 
    this.nodeValue = nodeValue;
    this.parentNode = null;
}

ExpressionNode.prototype.resolve = function() {
    return this.isNumericNode() ? this.nodeValue : this.nodeValue(this.children);
}
ExpressionNode.prototype.getNodeType = function(){
    return isFunction(this.nodeValue) ? NodeTypes.OPERATION : NodeTypes.NUMERIC;
}
ExpressionNode.prototype.isOperationNode = function(){
    return this.getNodeType() === NodeTypes.OPERATION;
}
ExpressionNode.prototype.isNumericNode = function(){
    return this.getNodeType() === NodeTypes.NUMERIC;
}
ExpressionNode.prototype.setChildren = function(children){
    this.children = isArray(children) ? children : [children];
}
ExpressionNode.prototype.setParentNode = function(node){
    if (node instanceof ExpressionNode){
        this.parentNode = node;
    } 
}
ExpressionNode.prototype.replaceChild = function(newChild, oldChild){
    if (newChild) {
        var index = this.children.indexOf(oldChild);
        this.children.splice(index, 1, newChild);
        newChild.setParentNode(this);
        oldChild.setParentNode(null);
    }
}

export default ExpressionNode;