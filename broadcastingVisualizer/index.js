let currentStep = 0;
    const step0 = "Step 0. (Does T have only one or two vertices?) v(rl <- 2 then BC(T) - V(T); if V(T)I 2 then set b (T) - 1 else set b (T) - 0 fi; STOP ft.";
    const step1 = "Step 1. (Label the endvertices of T with 0.) Let U be the set of endvertices of T; for each u U do set t(u)-O od; set T’ - T- U.";
    const step2 = "(Label the endvertices of T’.) Let W be the set of vertices of T’ with degree in T’ at most one; for each w in W do let u1, u2, ..., uk be the labeled vertices in U adjacent to w, ordered so that t(u1) >= t(u2) >= ... >= t(uk); set t(w) = max{t(ui) + i} for 1 <= i <= k; end for";
    const step3456 = "Step 3. (Select the next vertex to be deleted and the next vertex to be labeled, until there is only one vertex left.) While |V(T’)| >= 2 do Step 4. (Select the next vertex w.) Let w in W satisfy t(w) = min {t(wi) | wi in W}; let v be the vertex adjacent to w in T’. Step 5. (Delete w from W and T’, and add it to U.) Set W = W - {w}; set U = U ∪ {w}; set T’ = T’ - {w}. (Note, if T’ now has one vertex, it is considered to be an endvertex.) Step 6. (Label the next vertex.) If v is now an endvertex of T’ then let v be adjacent to labeled vertices u1, u2, ..., u in U ordered so that t(u1) >= t(u2) >= ... >= t(u); set t(v) = max {t(ui) + i | 1 <= i <= k}; set W = W ∪ {v}. od";
    const step7 = "Step 7. (There is one vertex left.) Let v be the one vertex of T'; set b(T) = t(v); let the neighbors of v in T be u1, u2, ..., u, where t(u1) >= t(u2) >= ... >= t(u); let j be the smallest integer such that t(uj) + j > max {t(ui) + i | 1 <= i <= k}; set BC(T) = {v, u1, u2, ..., uj}; STOP";
    document.getElementById('treeForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const numNodes = document.getElementById('numNodes').value;
      const treeDataEndpoint = `https://broadcasting-algorithm-processor.onrender.com/generate_random_tree/${numNodes}`;
      const broadcastAlgorithmEndpoint = `https://broadcasting-algorithm-processor.onrender.com/get_all_steps`;
      delay = 2000;
      let fullDeletedGraph = [];
      let nodesToBeDeleted = [];
      changeSpeed();

      clearExistingTree(); // Clear existing tree before generating a new one
      fetchAndVisualizeTree(treeDataEndpoint, broadcastAlgorithmEndpoint);
    });

    function fetchAndVisualizeTree(endpoint, broadcastAlgorithmEndpoint) {
     updateAlgorithmStepDescription(step0);
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const links = data.links.map(d => Object.create(d));
          const nodes = data.nodes.map(d => Object.create(d));

          const root = data.root;

          const width = 600;
          const height = 400;

          const svg = d3.select("#tree-container")
            .attr("width", width)
            .attr("height", height);

          const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-50))
            .force("center", d3.forceCenter(width / 2, height / 2));

          const link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke", "black")
            .attr("stroke-width", 1);

          const node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .attr("fill", "steelblue");

          node.append("title")
            .text(d => d.id);


          simulation.on("tick", () => {
            link
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);

            node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
          });

          

        // perform step one of the broadcasting visualization
        
          fetch(broadcastAlgorithmEndpoint)
          .then(response => response.json())
          .then(stepOneData => {
            const removedNodes = stepOneData.step_one.removed_nodes;
            simulation.on("end", () => {
            updateAlgorithmStepDescription(step1);
            
            console.log(removedNodes);
            // color specific nodes based on step one
            console.log("in step one");

            svg.selectAll(".node")
            .attr("fill", d => removedNodes.includes(d.id) ? "black" : "steelblue")
            .attr("class", d => removedNodes.includes(d.id) ? "highlighted" : "")
            
            // Log IDs of nodes with the "highlighted" class
            const highlightedIDs = svg.selectAll(".highlighted").data().map(d => d.id);
            console.log("Highlighted Node IDs:", highlightedIDs);
            showAlgorithmInformation("N/A", "N/A", highlightedIDs, "N/A");
           // Select all nodes and bind data
const nodeText = svg.selectAll(".node-text")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "node-text")
  .attr("font-size", "10px") // Set the font size
  .text(function(d) {
    return removedNodes.includes(d.id) ? 'Time: 0' : '';
  });

  // Set the position of text elements based on node positions
nodeText.attr("x", function(d) {
    return d.x + 12; // Adjust the x position as needed
  })
  .attr("y", function(d) {
    return d.y + 5; // Adjust the y position as needed
  });
  //delete the nodes before step 2
  setTimeout(() => {
    //filter nodes to remove
    const timeZeroToRemove = nodeText.remove();
  },delay);



   // step 2

   setTimeout(()=> {
   const labeledData = stepOneData.step_two;
        const labeledNodes = Object.entries(labeledData).map(([node, broadcastTime]) => [
        Number(node),
        broadcastTime,
        ]);
        const labeledId = Object.keys(labeledData).map(Number);

        showAlgorithmInformation("N/A", "N/A", highlightedIDs, labeledId);

        console.log("Id of nodes: ", labeledId);
        updateAlgorithmStepDescription(step2);
// Add a new class for nodes that will be colored black
node.each(function(d) {
    const currentNode = d3.select(this);
    if (labeledId.includes(d.id)) {
        currentNode.attr("class", "highlighted-black")
                    .attr("fill", "black");
    }
});

console.log("Nodes colored black:", svg.selectAll(".highlighted-black").nodes());

    // Select all nodes and bind data
const labeledText = svg.selectAll(".label-text")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "label-text")
  .attr("font-size", "10px") // Set the font size
  .text(function(d) {
    const foundNode = labeledNodes.find(([nodeId]) => nodeId === d.id);
    if(foundNode){
        return `Time: ${foundNode[1]}`;
    }
  });

  // Set the position of text elements based on node positions
labeledText.attr("x", function(d) {
    return d.x + 12; // Adjust the x position as needed
  })
  .attr("y", function(d) {
    return d.y + 5; // Adjust the y position as needed
  });

 //delete the text before step 3,4,5,6
 setTimeout(() => {
    //filter nodes to remove
    labeledText.remove();
  },(delay + 1000));
  
   }, (delay + 2000));

   //step 3,4,5,6

   // delete 
   setTimeout(()=> {

   const nodesToBeDeletedData = stepOneData.step_three_to_six;
   const nodesToBeDeleted = Object.entries(nodesToBeDeletedData).map(([node, broadcastTime]) => [
        Number(node),
        broadcastTime,
        ]);
        nodeToBeDeletedId = Object.keys(nodesToBeDeletedData).map(Number);
         fullDeletedGraph = highlightedIDs.concat(nodeToBeDeletedId);
        showAlgorithmInformation("N/A", "N/A", fullDeletedGraph, nodeToBeDeletedId);
        console.log("Id of nodes: ", nodeToBeDeletedId);

        updateAlgorithmStepDescription(step3456);
// Add a new class for nodes that will be colored black
node.each(function(d) {
    const currentNode = d3.select(this);
    if (nodeToBeDeletedId.includes(d.id)) {
        currentNode.attr("class", "highlighted-black")
                    .attr("fill", "black");
    }
});

console.log("Nodes colored black:", svg.selectAll(".highlighted-black").nodes());
    // Select all nodes and bind data
    const nodeToBeDeletedText = svg.selectAll(".next-to-be-deleted")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "next-to-be-deleted")
  .attr("font-size", "10px") // Set the font size
  .attr("font-weight", "bold") // Set the font weight to bold
  .text(function(d) {
    const foundNode = nodesToBeDeleted.find(([nodeId]) => nodeId === d.id);
    if(foundNode){
        return `Next node to be deleted: ${foundNode[1]}`;
    }
  }).attr("x", function(d) {
    return d.x + 12; // Adjust the x position as needed
  })
  .attr("y", function(d) {
    return d.y + 5; // Adjust the y position as needed
  })
  .style("opacity", 0);

// Transition for delayed display
nodeToBeDeletedText.transition()
  .delay(function(_, i) { return i * 1000; }) // Delay based on index (i)
  .style("opacity", 1); // Transition to make text visible

}, (delay + 8000));

setTimeout(() => {

//final step get broadcasting center
const broadcastCenterData = stepOneData.broadcast_center;

// Extracting broadcast centers array and minimum broadcast time
const broadcastCenters = broadcastCenterData.broadcast_centers;
const minBroadcastTime = broadcastCenterData.min_broadcast_time; 
updateAlgorithmStepDescription(step7);
showAlgorithmInformation(broadcastCenters, minBroadcastTime, fullDeletedGraph, nodeToBeDeletedId);
// Usage example
console.log("Broadcast Centers:", broadcastCenters); 
console.log("Minimum Broadcast Time:", minBroadcastTime); 

// Color only the broadcast nodes to orange
node.each(function(d) {
    const currentNode = d3.select(this);
    if (broadcastCenters.includes(d.id)) {
        currentNode.attr("class", "broadcast-centers")
                    .attr("fill", "orange");
    }
});

 // Remove existing text elements for nodes matching broadcasting centers
 svg.selectAll(".next-to-be-deleted").remove();
const label_broadcast_center = svg.selectAll(".label-broadcast-centers")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "label-broadcast-centers")
  .attr("font-size", "10px") // Set the font size
  .attr("font-weight", "bold") // Set the font weight to bold
  .text(function(d) {
    const foundNode = broadcastCenters.includes(d.id);
    if(foundNode){
        return `Broadcast Center: ${minBroadcastTime}`;
    }
  }).attr("x", function(d) {
    return d.x + 12; // Adjust the x position as needed
  })
  .attr("y", function(d) {
    return d.y + 5; // Adjust the y position as needed
  });

}, (delay + 18000));
});
          })
          .catch(error => {
            console.error('Error fetching step one node info: ', error);
          });
        })
        .catch(error => {
          console.error('Error fetching tree data: ', error);
        });
    }

    function clearExistingTree() {
      // Clear existing tree by removing all child elements inside the SVG container
      d3.select("#tree-container").selectAll("*").remove();
    }

    function updateAlgorithmStepDescription(step) {
  document.getElementById('stepDescription').innerText = step;
}
function nextStep(){
    currentStep++;
  }

  function changeSpeed(){
    const speedSelect = document.getElementById('speedSelect');
    delay = parseInt(speedSelect.value);
  }
  function showAlgorithmInformation(center, time, U, W){
     // Create content to display
  const content = `
    <p>Broadcast Centers: ${center}</p>
    <p>Time: ${time}</p>
    <p>Nodes in U: ${U}</p>
    <p>Nodes in W: ${W}</p>
  `;

   // Get the information div
   const informationDiv = document.getElementById('information');

     // Update the content of the div
  informationDiv.innerHTML = content;
  }