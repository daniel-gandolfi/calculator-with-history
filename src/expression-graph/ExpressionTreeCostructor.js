import * as MathOperations from "../MathOperations"

export function isMulOrDivNode(node) {
    return node.isOperationNode() 
        && (node.mathOperation === MathOperations.MUL  
            || node.mathOperation === MathOperations.DIV); 
}
export function isAddOrMinNode(node) {
    return node.isOperationNode() 
        && (node.mathOperation === MathOperations.ADD 
            || node.mathOperation === MathOperations.MIN); 
}
function _addNodeAsChildOf(child, parent) {
    if (parent) {
        console.log("adding ", child, " to ", parent)
        child.setParentNode(parent);
        let children;
        if (parent.children) {
            children = parent.children.concat([child])
        } else {
            children = [child]
        }
        parent.setChildren(children)
    }
}
function getNodeRoot(node) {
    return getFirstParentWithConditionRoot(node, function(root){
        return root.parentNode === null;
    });
}
function getFirstParentWithConditionRoot(node, test) {
    let root = node;
    if (root) {
        if (test(root)) {
            return root;
        }
        while(root.parentNode!= null) { 
            root = root.parentNode;
            if (test(root)) {
                return root;
            }
        }
    }
    return null;
}

function gestisciOperationNodeConPrecedenteOperation(operationNode, previousOperationNode){
    var previousOperationNodeChildCount = previousOperationNode.children.length;
    var previousOperationNodeHasChildren = previousOperationNodeChildCount > 0;
    var aggiunto;
    if (isAddOrMinNode(previousOperationNode)) {
        if (isAddOrMinNode(operationNode)) {
            _addNodeAsChildOf(operationNode, previousOperationNode);
            aggiunto = true;
        } else {
            aggiunto = false;
        }
    } else {
        if (isAddOrMinNode(operationNode)) {
            _addNodeAsChildOf(operationNode, previousOperationNode);
            aggiunto = true;
        } else {
            aggiunto = false;
        }
    }
    return aggiunto;
}
function gestisciOperationNodeConPrecedenteNumeric(operationNode, previousNumericNode){
    var aggiunto;
    if (previousNumericNode.parentNode) {
        let numericNodeParent = previousNumericNode.parentNode;
        
        console.log("handling operationNode ", operationNode, " with previous numericNode ", previousNumericNode)
        if (isMulOrDivNode(operationNode)){
            console.log("operationNode is mul or div ")
            if(isAddOrMinNode(numericNodeParent)){
                console.log("numericNodeParent is add or min")
                console.log("replacing: ", previousNumericNode, " of ", numericNodeParent, " with ", operationNode)
                numericNodeParent.replaceChild(operationNode, previousNumericNode);
                //set numeric as child of mulOrDivNode
                _addNodeAsChildOf(previousNumericNode, operationNode)
            } else {
                console.log("numericNodeParent is not add or min ", numericNodeParent)
                let child = getFirstParentWithConditionRoot(previousNumericNode, function(trasversingNode){
                    if (trasversingNode.isOperationNode()) {
                        return (isAddOrMinNode(operationNode) && isAddOrMinNode(trasversingNode)) ||
                            (isMulOrDivNode(operationNode) && isMulOrDivNode(trasversingNode))
                    }
                    return false;
                })
                if (child) {
                    if (child.parentNode) {
                        child.parentNode.replaceChild(operationNode, child);
                    }
                    _addNodeAsChildOf(child, operationNode);
                } else {
                    _addNodeAsChildOf(getNodeRoot(previousNumericNode), operationNode);
                }
            }
            aggiunto = true;
        } else {
            console.log("operationNode is not mul or div ")
            _addNodeAsChildOf(getNodeRoot(previousNumericNode), operationNode);
            aggiunto = true;
        }
    } else {
        _addNodeAsChildOf(previousNumericNode, operationNode);
        aggiunto = true;
    }
    return aggiunto;
}
function gestisciNumericNodeConPrecedenteOperation(numericNode,previousOperationNode){
    var previousOperationNodeChildCount = previousOperationNode.children.length;
    if (previousOperationNodeChildCount === 0) {
        _addNodeAsChildOf(numericNode, previousOperationNode)
    } else {
        _addNodeAsChildOf(numericNode, previousOperationNode);
    }
}
function gestisciNumericNodeConPrecedenteNumeric(numericNode,previousNumericNode){
    //non dovrebbe succedere
}
function ExpressionTreeCostructor() {
    var previousNode;
    function _addNode(currentNode) {
        if (previousNode) {
            if (currentNode.isOperationNode()) {
                if (previousNode.isOperationNode()) {
                    gestisciOperationNodeConPrecedenteOperation(currentNode, previousNode)
                } else {
                    gestisciOperationNodeConPrecedenteNumeric(currentNode, previousNode)
                }
            } else {
                if (previousNode.isOperationNode()) {
                    gestisciNumericNodeConPrecedenteOperation(currentNode, previousNode)
                } else {
                    gestisciNumericNodeConPrecedenteNumeric(currentNode, previousNode)
                }
            }
            previousNode = currentNode;
        } else {
            previousNode = currentNode;
        }
    }
    return {
        addNode: _addNode,
        getRoot: ()=>getNodeRoot.call(this,previousNode)
    }
}

export default ExpressionTreeCostructor;