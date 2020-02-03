// don't touch this, foundation function
$(document).foundation();


// variable to hold the path user takes, needs to be cleared everytime they go home/make any changes. 
let pathTaken = [];

let cancertype;

// variable which will hold the data-number value of the clicked node to be later used by the submit button.
let clickedNodeFlag;


// the trial class for obtaining needed information related to the trials and nodes
class Trials {
    constructor(nodeClicked) {
        // array which holds all the trials for lungs, then later we filter the information we need
        this.lungTrials;
        this.breastTrials;


        // array which holds all the nodes for lungs chart
        this.lungNodes;
        this.skinNodes;
        this.breastNodes;
        this.urinaryNodes;

        // running the fetch functions for both json files.
        // getting the trials


        // using the nodeClicked value to fetch the correct node. 
        this.fetchNodes(nodeClicked, cancertype);
        pathTaken.push(nodeClicked);
    }

    // function to create the following nodes by passing the node that the user just clicked on
    createNodes(nodeClicked, cancertype) {

        // array to hold all the information about the clicked node
        let nodeClickedInfo;
        switch (cancertype) {
            case 0:
                nodeClickedInfo = this.lungNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                break;
            case 1:
                nodeClickedInfo = this.skinNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                break;
            case 2:
                nodeClickedInfo = this.breastNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                break;
            case 3:
                nodeClickedInfo = this.urinaryNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                break;
        }

        // array to hold the nodes to be followed by the clicked node
        const nodesToFollow = nodeClickedInfo[0].nodesToFollow;
        // variable to hold the nodes' names 
        const nodesClickedName = nodeClickedInfo[0].name;


        // the foreach loop to create multiple nodes according to the nodesToFollow;
        document.getElementById("buttons").innerHTML = "";
        if (nodesToFollow.length == 0) {
            this.matchNodes();
        } else {
            nodesToFollow.forEach(element => {
                let createdNode = document.createElement("input");
                createdNode.type = "button";
                createdNode.classList.add("large-12");
                // getting the value from a function created just to get name of the nodes while passing it the node we want the name of.
                createdNode.value = this.gettingNodeName(element);

                // setting the data-number of the created element by using the function solely for getting the node number of the specific node.
                createdNode.setAttribute('data-number', this.gettingNodeNumber(element));

                document.getElementById("buttons").append(createdNode);

                createdNode.addEventListener("click", function () {
                    // giving flag the value of the data-number to be used by the submit button
                    clickedNodeFlag = createdNode.dataset.number;
                });

            })
        };
        console.log(nodesToFollow);
    }


    gettingNodeName(node) {
        let nodeName;
        switch (cancertype) {
            case 0:
                nodeName = this.lungNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 1:
                nodeName = this.skinNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 2:
                nodeName = this.breastNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 3:
                nodeName = this.urinaryNodes.filter(clickedNode => clickedNode.node == node);
                break;
        }

        return nodeName[0].name;
    }

    gettingNodeNumber(node) {
        let nodeNumber;
        switch (cancertype) {
            case 0:
                nodeNumber = this.lungNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 1:
                nodeNumber = this.skinNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 2:
                nodeNumber = this.breastNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 3:
                nodeNumber = this.urinaryNodes.filter(clickedNode => clickedNode.node == node);
                break;
        }

        return nodeNumber[0].node;
    }

    gettingNodeQuestion(node) {
        let nodeNumber = this.lungNodes.filter(clickedNode => clickedNode.node == node);
        console.log(nodeNumber[0].questionOnThisNode);

        return nodeNumber[0].questionOnThisNode;
    }

    //checks the user choices against available trials and if they are open to more patients or not.
    matchNodes() {
        //output is the variable that will be outputted to the screen for the user to read
        let output;
        console.log(pathTaken)
        //switch to keep track of what type of cancer
        switch (cancertype) {
            case 0:

                // console.log(this.lungTrials[0].pathToSuccessfulTrial);


                for (let i = 0; i < this.lungTrials.length; i++) {

                    if (pathTaken.length == this.lungTrials[i].pathToSuccessfulTrial.length) {
                        
                        for (let x = 0; x < this.lungTrials[i].pathToSuccessfulTrial.length; x++) {
                            if (pathTaken[x] == this.lungTrials[i].pathToSuccessfulTrial[x]) {
                                output = "The patient is eligible for trial " + this.lungTrials[i].name;
                            }
                        }
                    }
                }


                //outputs the result to the screen.
                document.getElementById("title").innerText = "Results:"
                document.getElementById("buttons").append(output);
                break;

            case 1:
                //for loop to check the entire trial array
                for (let i = 0; i < this.skinTrials.length; i++) {

                    if (pathTaken.length == this.skinTrials[i].pathToSuccessfulTrial.length) {
                        
                        for (let x = 0; x < this.skinTrials[i].pathToSuccessfulTrial.length; x++) {
                            
                            if (pathTaken[x] == this.skinTrials[i].pathToSuccessfulTrial[x]) {
                                if (this.skinTrials[i].Availability == true) {
                                    output = "The patient is eligible for trial " + this.skinTrials[i].name;
                                } else {
                                    output = "THe trial " + this.skinTrials[i].name + " is not open to new patients."
                                }
                            }
                            else {
                                output = "The patient is not eligible for a trial at this time."
                            }
                        }
                    }
                }
                //outputs the result to the screen.
                document.getElementById("title").innerText = "Results:"
                document.getElementById("buttons").append(output);
                break;

            case 2:
                //for loop to check the entire trial array
                for (let i = 0; i < this.breastTrials.length; i++) {

                    if (pathTaken.length == this.breastTrials[i].pathToSuccessfulTrial.length) {
                        
                        for (let x = 0; x < this.breastTrials[i].pathToSuccessfulTrial.length; x++) {
                            if (pathTaken[x] == this.breastTrials[i].pathToSuccessfulTrial[x]) {
                                if (this.breastTrials[i].Availability == true) {
                                    output = "The patient is eligible for trial " + this.breastTrials[i].name;
                                } else {
                                    output = "THe trial " + this.breastTrials[i].name + " is not open to new patients."
                                }
                            }
                            else {
                                output = "The patient is not eligible for a trial at this time."
                            }
                        }
                    }
                }
                //outputs the result to the screen.
                document.getElementById("title").innerText = "Results:"
                document.getElementById("buttons").append(output);
                break;

            case 3:
                //for loop to check the entire trial array
                for (let i = 0; i < this.urinaryTrials.length; i++) {

                    if (pathTaken.length == this.urinaryTrials[i].pathToSuccessfulTrial.length) {
                        
                        for (let x = 0; x < this.urinaryTrials[i].pathToSuccessfulTrial.length; x++) {
                            if (pathTaken[x] == this.urinaryTrials[i].pathToSuccessfulTrial[x]) {
                                output = "The patient is eligible for trial " + this.urinaryTrials[i].name;
                            }
                            else {
                                output = "The patient is not eligible for a trial at this time."
                            }
                        }
                    }
                }
                //outputs the result to the screen.
                document.getElementById("title").innerText = "Results:"
                document.getElementById("buttons").append(output);
                break;
        }

    }



    fetchNodes(nodeClicked, cancertype) {
        fetch('data/nodes.json')
            .then(data => data.json())
            .then(data => {
                switch (cancertype) {
                    case 0:
                        this.lungNodes = data.lungNodes;
                        this.lungTrials = data.lungTrials
                        // running the funciton createNodes with the value of the clicked node's data-number
                        this.createNodes(nodeClicked, cancertype);
                        break;
                    case 1:
                        this.skinNodes = data.skinNodes;
                        this.skinTrials = data.skinTrials
                        // running the funciton createNodes with the value of the clicked node's data-number
                        this.createNodes(nodeClicked, cancertype);
                        break;
                    case 2:
                        this.breastNodes = data.breastNodes;
                        this.breastTrials = data.breastTrials
                        this.createNodes(nodeClicked, cancertype);
                        break;
                    case 3:
                        this.urinaryNodes = data.urinaryNodes;
                        this.urinaryTrials = data.urinaryTrials
                        this.createNodes(nodeClicked, cancertype);
                        break;
                }

            });
    };

}


// let tri = new Trials;

let click = 0;
let lung = document.getElementById("lung");
let skin = document.getElementById("skin");
let breast = document.getElementById("breast");
let urinary = document.getElementById("urinary");
let submit = document.getElementById("submit");


lung.addEventListener("click", function () {
    cancertype = 0;
    lung.style.display = "none";
    skin.style.display = "none";
    breast.style.display = "none";
    urinary.style.display = "none";
    theStart(lung.dataset.number);
});
skin.addEventListener("click", function () {
    cancertype = 1;
    lung.style.display = "none";
    skin.style.display = "none";
    breast.style.display = "none";
    urinary.style.display = "none";
    theStart(skin.dataset.number);
});
breast.addEventListener("click", function () {
    cancertype = 2;
    lung.style.display = "none";
    skin.style.display = "none";
    breast.style.display = "none";
    urinary.style.display = "none";
    theStart(breast.dataset.number);
});
urinary.addEventListener("click", function () {
    cancertype = 3;
    lung.style.display = "none";
    skin.style.display = "none";
    breast.style.display = "none";
    urinary.style.display = "none";
    theStart(urinary.dataset.number);
});







// another click listener for the creation of the following nodes to come.
submit.addEventListener("click", getNew);

function getNew() {
    theStart(clickedNodeFlag);
}

function theStart(nodeClicked) {

    // passing the clicked node's data-number value to the class
    let tri = new Trials(nodeClicked);
}