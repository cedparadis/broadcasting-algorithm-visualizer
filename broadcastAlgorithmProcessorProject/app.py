import json

from flask import Flask, jsonify
from flask_cors import CORS
import networkx as nx
import broadcasting as br

app = Flask(__name__)
CORS(app)


random_tree = None

# Generate a random tree
# Perform broadcasting algorithm
# Return step 1, all end vertices marked 0
# Return step 2, all labeled nodes with values
# Return step 3,4,5,6 : all next node to be deleted in order with their value
# Return neighbour node ??
# Return step 7: broadcast center + broadcast value
# return all in one method (appart from generating the tree) or separate...? one method seems better


def generate_random_tree(num_nodes):
    tree = nx.generators.trees.random_tree(num_nodes)
    return tree


# Defining an endpoint for the generation of random trees
@app.route('/generate_random_tree/<int:num_nodes>')
def generate_random_tree_route(num_nodes):
    global random_tree
    random_tree = generate_random_tree(num_nodes)

    tree_dict = {
        'nodes': [{'id': node} for node in random_tree.nodes()],
        'links': [{'source': source, 'target': target} for source, target in random_tree.edges()],
        'root': next(node for node, degree in random_tree.degree() if degree > 1)
    }

    json_tree = jsonify(tree_dict)

    return json_tree


@app.route('/get_all_steps')
def get_broadcast_center_on_random_tree():
    global random_tree
    if random_tree is None:
        return jsonify({'error': 'Random tree not generated'})
    # Perform broadcasting algorithm
    broadcast_center = br.tree_broadcast_center(random_tree)
    removed_nodes_list = list(br.removed_nodes)
    labeled_vertices = br.labeled_nodes
    w_deleted_nodes = br.w_deleted_nodes

    steps_data = {
        "step_one": {
            "removed_nodes":  removed_nodes_list
        },
        "step_two": labeled_vertices,
        "step_three_to_six": w_deleted_nodes,
        "broadcast_center": {
            'min_broadcast_time': int(broadcast_center[0]),  # Assuming the integer is at index 0
            'broadcast_centers': list(broadcast_center[1])  # Convert set to list
        }
    }
    return jsonify(steps_data)


if __name__ == '__main__':
    app.run(debug=True)
