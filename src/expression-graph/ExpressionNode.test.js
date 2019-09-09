import ExpressionNode from "./ExpressionNode";

describe("ExpressionNode Tests", function(){
    describe("Number node test", function(){
        var number = 5;
        it("should return " + number, function(){
            var node = new ExpressionNode(number);
            expect(node.resolve()).toBe(number);
        })
        it("should return 5+5=10" + number, function(){
            var node = new ExpressionNode(function(){
                return 5+5;
            });
            expect(node.resolve()).toBe(10);
        })
        it("should return 5", function(){
            var node = new ExpressionNode(function(children){
                return children[0].resolve() + children[1].resolve();
            }, [
                new ExpressionNode(3),
                new ExpressionNode(2)
            ]);
            expect(node.resolve()).toBe(5);
        })
        it("should change children length", function(){
            var node = new ExpressionNode(function(children){
                return children.reduce((tot,node)=> tot + node.resolve(), 0)
            });
            node.setChildren([
                new ExpressionNode(1),
                new ExpressionNode(1),
                new ExpressionNode(1),
                new ExpressionNode(1)
            ])
            expect(node.children.length).toBe(4);
            expect(node.resolve()).toBe(4);
        })
    })
})