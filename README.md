
# Broadcasting Algorithm Visualizer

## Overview
A visualization of the optimal broadcasting algorithm to find the broadcast center of a tree as well as the minimum broadcast time from that center.
Experience the live project: https://broadcasting-algorithm-visualizer.onrender.com/

## Components

### Flask API Server
The Flask-based API server acts as an interface between the frontend and
backend components. NetworkX, a graph library in Python, is used inside
the server to enhance the server's capabilities in managing and analyzing
tree structures.


#### Features:
- **NetworkX usage**: The API server uses NetworkX methods as well as the custom broadcasting algorithm file to generate the desire data.
- **Data processing**:  The API server transforms these data to be suitable for the frontend and D3.js format. It returns these data in a json readable format
- **Request handling** :The API server receives request from the frontend to generate a tree and to perform the broadcast algorithm on that tree

## Frontend D3.js 
  Rendering the interactive visualization of the tree structure and the
broadcast center determination process was accomplished using D3.js, a
javascript library specialized in the generation of dynamic graphs.


#### Features:
- **Dynamic graph rendering** : This library takes the data from the API endpoint in json and constructs a tree from the data.
- **Dynamic graph transformation** : It  performs the broadcasting algorithm by removing nodes, or filling nodes with specific color and text such as the broadcasting time of a node.
- **User interface**: Displays option to generate any trees, change the visualization speed as well as displaying the algorithm steps and important information.

## Backend broadcasting algorithm
A custom broadcasting algorithm was implemented by a colleague to
compute the broadcast center and time. It interacts with the API server to
receive and process tree data efficiently

### Features:
- **Incremental steps data processing** : Modified the algorithm so it can send data in incremental steps to be able to visualize

## Installation 

## Software Configuration
1. **Set up the python code**: Set up the python files in a dedicated IDE like PyCharm
2. **Set up the static website**: Set up frontend code in a dedicated IDE like Visual Studio Code.
3. **Server Setup**: Deploy the Flask server as well as the static website on a suitable hosting platform or locally.

## How to contribuate
1. **Fork + clone**: Fork the repo and clone it to your local computer.
2. **Adding broadcasting algorithm** : The backend broadcasting algorithm are based on the NetworkX library. You can either add new python file in the broadcastAlgorithmProcessorProject folder which already uses NetworkX library OR you can add your algorithms directly to NetworkX and get your PR approved
3. **Adding endpoints** : To send the data, you can create a new file or add to the app.py file to create new endpoints to send the data from your broadcast algorithms
4. **Adding visualization**: To visualize data, you can add code directly to the broadcastingVisualizer folder. Either in the existing index.js, or add your own javascript file to connect to the backend server.

## Credits and Acknowledgments
This project leverages several open-source libraries and platforms, including:
- [Flask](https://flask.palletsprojects.com/) for api web server
- [D3.js](https://github.com/d3/d3/wiki) for the graph visualization
- [NetworkX](https://networkx.org/documentation/stable/index.html) for the algorithm processing
- [Render](https://docs.render.com/docs) for server deployment

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.
