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


def process_bfs_on_random_tree(tree):
    bfs_nodes = list(nx.bfs_tree(tree, 0))
    return bfs_nodes


# Defining an endpoint for the generation of random trees
@app.route('/generate_random_tree/<int:num_nodes>')
def generate_random_tree_route(num_nodes):
    global random_tree
    random_tree = generate_random_tree(num_nodes)

    tree_dict = {
        'nodes': [{'id': node} for node in random_tree.nodes()],
        'links': [{'source': source, 'target': target} for source, target in random_tree.edges()]
    }

    json_tree = jsonify(tree_dict)

    return json_tree


@app.route('/get_broadcast_center')
def get_broadcast_center_on_random_tree():
    global random_tree
    if random_tree is None:
        return jsonify({'error': 'Random tree not generated'})
    # Perform broadcasting algorithm
    broadcast_center = br.tree_broadcast_center(random_tree)

    broadcast_center_json = {
        'min_broadcast_time': int(broadcast_center[0]),  # Assuming the integer is at index 0
        'broadcast_centers': list(broadcast_center[1])  # Convert set to list
    }
    return jsonify(broadcast_center_json)


@app.route('/get_step_one')
def get_step_one_from_broadcast_algorithm():
    removed_nodes_list = list(br.removed_nodes)
    data = {
        "removed_nodes": removed_nodes_list
    }
    json_data = json.dumps(data)

    return json_data


@app.route('/get_step_two')
def get_step_two_from_broadcast_algorithm():
    labeled_vertices = br.labeled_nodes

    return jsonify(labeled_vertices)


if __name__ == '__main__':
    app.run(debug=True)
