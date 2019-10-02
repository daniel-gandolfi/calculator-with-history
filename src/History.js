function History(size) {
    const elementList = [];

    function add(element) {
        if (elementList.length === size) {
            elementList.shift();
        }
        elementList.push(element);
    }

    function insert(element, index) {
        if (index === undefined) {
            add(element)
        } else {
            if (index < elementList.length) {
                if (elementList.length === size) {
                    elementList.shift();
                }
                elementList.splice(index, 0, element);
            }
        }
    }

    function remove(index) {
        if (index < elementList.length) {
            elementList.splice(index, 1);
        }
    }

    function removeLast() {
        const lastElementIndex = elementList.length - 1
        elementList.splice(lastElementIndex, 1);
    }

    function getIterator() {
        var index = elementList.length - 1;
        if (index < 0) {
            return null;
        } else {
            const previous = function () {
                if (hasPrevious()) {
                    --index;
                    return elementList[index];
                } else {
                    return null;
                }
            };
            const hasPrevious = function () {
                return index !== 0;
            };
            const next = function () {
                if (hasNext()) {
                    ++index;
                    return elementList[index];
                } else {
                    return null;
                }
            };
            const hasNext = function () {
                return index !== elementList.length - 1;
            };
            const first = function () {
                index = 0;
                return elementList[index];
            };
            const last = function () {
                index = elementList.length - 1;
                return elementList[index];
            };
            return {
                previous,
                hasPrevious,
                next,
                hasNext,
                first,
                last
            }
        }
    }

    return {
        add,
        insert,
        remove,
        removeLast,
        getIterator
    }
}

export default History;