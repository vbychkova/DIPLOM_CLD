function Graph() {
    this.nodes = [];
    this.arrows = new Map();
}
Graph.prototype.findCircuits = function findCircuits() {
    var startNode;
    var stack = [];
    var circuits = [];
    var blocked = new Map();

    var b = new Map();

    var graph = this;

    function addCircuit(start, stack) {
        var orders = [start.order].concat(
            stack.map(function(n) {
                return n.order;
            })
        );

        if (Math.min.apply(null, orders) !== start.order) {
            circuits.push([].concat(stack).concat(start));
        }
    }

    function unblock(u) {
        blocked.set(u, false);

        if (b.has(u)) {
            b.get(u).forEach(function(w) {
                b.get(u).delete(w);
                if (blocked.get(w)) {
                    unblock(w);
                }
            });
        }
    }

    function circuit(node) {
        var found = false;

        stack.push(node);
        blocked.set(node, true);

        graph.arrows.get(node).forEach(function(w) {
            if (w === startNode) {
                found = true;
                addCircuit(startNode, stack);
            } else if (!blocked.get(w)) {
                if (circuit(w)) {
                    found = true;
                }
            }
        });

        if (found) {
            unblock(node);
        } else {
            graph.arrows.get(node).forEach(function(w) {
                var entry = b.get(w);

                if (!entry) {
                    entry = new Set();
                    b.set(w, entry);
                }

                entry.add(node);
            });
        }

        stack.pop();
        return found;
    }

    graph.nodes.forEach(function(node) {
        startNode = node;
        graph.arrows.get(node).forEach(circuit);
    });

    return circuits;
};