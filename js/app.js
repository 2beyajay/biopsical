// don't touch this, foundation function
$(document).foundation();


// variable to hold the path user takes, needs to be cleared everytime they go home/make any changes. 
let pathTaken = [];

//variable to allow the various switches to work
let cancertype;

// variable which will hold the data-number value of the clicked node to be later used by the submit button.
let clickedNodeFlag;


// the trial class for obtaining needed information related to the trials and nodes
class Trials {
    constructor(nodeClicked) {
        // arrays which holds all the trials for each type of cancer
        this.lungTrials;
        this.breastTrials;
        this.urinaryTrials;
        this.skinTrials
        // array which holds all the nodes for lungs chart
        this.lungNodes;
        this.skinNodes;
        this.breastNodes;
        this.urinaryNodes;
        // running the fetch functions for both json files.
        // getting the trials
        // using the nodeClicked value to fetch the correct node. 
        this.fetchNodes(nodeClicked, cancertype);
        //adding which button was clicked to the pathTaken array
        pathTaken.push(nodeClicked);
        
    }


    // function to create the following nodes by passing the node that the user just clicked on
    createNodes(nodeClicked, cancertype) {

        // array to hold all the information about the clicked node
        let nodeClickedInfo;
        switch (cancertype) {
            case 0:
                nodeClickedInfo = this.lungNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                document.body.style.backgroundImage = "url('img/background.svg')";

                break;
            case 1:
                nodeClickedInfo = this.skinNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                document.body.style.backgroundImage = "url('img/background.svg')";

                break;
            case 2:
                nodeClickedInfo = this.breastNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                document.body.style.backgroundImage = "url('./img/background.svg')";

                break;
            case 3:
                nodeClickedInfo = this.urinaryNodes.filter(clickedNode => clickedNode.node == nodeClicked);
                document.body.style.backgroundImage = "url('./img/background.svg')";

                break;
        }

        // array to hold what node numbers follow the current node
        const nodesToFollow = nodeClickedInfo[0].nodesToFollow;
        // variable to hold the nodes' names 
        const nodesClickedName = nodeClickedInfo[0].name;



        // the foreach loop to create multiple nodes according to the nodesToFollow;
        document.getElementById("nodesHere").innerHTML = "";
        //run the matchNode function if there are no more nodes to follow on a clicked option
        if (nodesToFollow.length == 0) {
            this.matchNodes();
        } else {
            //creating the breadCrumb trail
            let divCrumb = document.createElement("div");
            let theCorrect = document.createElement("img");
            let theCrumbP = document.createElement("p");
            theCrumbP.innerText = nodesClickedName;
            divCrumb.append(theCrumbP);
            theCorrect.setAttribute("src", "img/correct.png");
            divCrumb.classList.add("crumbBorder");
            divCrumb.append(theCorrect);
            crumbs.append(divCrumb);
            
            //loop that runs through each element of the array nodesToFollow
            nodesToFollow.forEach(element => {
                let createdDiv = document.createElement("div");
                document.getElementById("nodesHere").append(createdDiv);

                //using the loop, create the next set of buttons that will appear on the screen
                let createdNode = document.createElement("input");
                createdNode.type = "button";
                createdNode.classList.add("large-6");
                // using gettingNodeName, we pass that information to createdNode.value so that it has the correct name
                createdNode.value = this.gettingNodeName(element);
                
                //creating the informational button for each option
                let iButton = document.createElement("button");
                iButton.innerHTML = "i";

                // adding the modal data attribute - allows the modal to be opened
                iButton.setAttribute("data-open", "infoModal");
                //adding the class i-button to the newly made button so that they are styled correctly.
                iButton.classList.add("i-button");
                //giving the description of the option to the i-button for later use
                iButton.setAttribute('data-desc', this.gettingNodeDesc(element));




                // sassing the correct node number to the newly created button for later use
                createdNode.setAttribute('data-number', this.gettingNodeNumber(element));
                
                

                //put the newly created button in the correct position
                createdDiv.append(createdNode);
                
                //put the newly created i-buttons in the correct position
                createdDiv.insertBefore(iButton, createdNode);
                
                //runs when an option is selected.
                createdNode.addEventListener("click", function () {
                    //submit button is functional
                    submit.disabled = false;
                    // giving flag the value of the data-number to be used by the submit button
                    clickedNodeFlag = createdNode.dataset.number;

                });
                
                //runs when the information modal gets opened
                //inserts the name and description of the selected option based on which i button is clicked
                iButton.addEventListener('click', function (){
                    let iTitle = document.querySelector('h1');
                    let iDesc = document.querySelector('#result');
                    iTitle.innerText = createdNode.value;
                    iDesc.innerText = this.dataset.desc;
                })
            })
        };
    }


    //function that gets and returns the name of the node
    gettingNodeName(node) {
        let nodeName;
        //switch to determine cancer type
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

    //function that gets the number of the individual nodes
    gettingNodeNumber(node) {
        let nodeNumber;
        //switch to determine the cancer type
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
    //function that gets the description of the indiviual nodes
    gettingNodeDesc(node){
        let nodeDesc;
        //switch determines which cancer type
        switch(cancertype){
            case 0:
                nodeDesc = this.lungNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 1:
                nodeDesc = this.skinNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 2:
                nodeDesc = this.breastNodes.filter(clickedNode => clickedNode.node == node);
                break;
            case 3:
                nodeDesc = this.urinaryNodes.filter(clickedNode => clickedNode.node == node);
                break;
        }
        return nodeDesc[0].desc;
    }

    gettingNodeQuestion(node) {
        let nodeNumber = this.lungNodes.filter(clickedNode => clickedNode.node == node);
        return nodeNumber[0].questionOnThisNode;
    }

    //checks the user choices against available trials and if they are open to more patients or not.
    matchNodes() {
        //hide the submit button
        //unhide the reset button
        //create variables for final screen output
        submit.classList.add("hide");
        reset.classList.remove("hide");
        pathTaken = pathTaken.join("")
        let joinedSuccessfulPath;
        let output = document.createElement("div");
        let divCrumb = document.createElement("div");
        let theCrumbP = document.createElement("p");
        
        divCrumb.append(theCrumbP);
        divCrumb.classList.add("crumbBorder");
        //switch to keep track of what type of cancer
        switch (cancertype) {
            case 0:
                //for loop to check the entire trial array
                for (let i = 0; i < this.lungTrials.length; i++) {
                    joinedSuccessfulPath = this.lungTrials[i].pathToSuccessfulTrial.join("");
                    if (pathTaken == joinedSuccessfulPath) {
                        if (this.lungTrials[i].Availability) {
                            output.innerHTML = `You are eligible for <span class="result-focus">${this.lungTrials[i].name}</span>`
                            theCrumbP.innerText = this.lungTrials[i].name;
                            divCrumb.append(theCrumbP)
                            contact.style.display = "block";
                            print.style.display = "block";
                            printP.style.display = "block";
                            break;
                        } else {
                            output.innerHTML = `The trial ${this.lungTrials[i].name} is <span class="result-focus">not open</span> to new patients.`
                            theCrumbP.innerText = this.lungTrials[i].name;
                            divCrumb.append(theCrumbP)
                            break;
                        }
                    } else {
                        output.innerHTML = `There are <span class="result-focus">no trials</span> available.`;
                        theCrumbP.innerText = " No Trials.";
                        divCrumb.append(theCrumbP)
                    }
                }

                //outputs the result to the screen.
                
                crumbs.append(divCrumb)
                document.getElementById("title").innerText = "";
                document.getElementById("nodesHere").append(output);
                break;

            case 1:
                //for loop to check the entire trial array
                for (let i = 0; i < this.skinTrials.length; i++) {
                    joinedSuccessfulPath = this.skinTrials[i].pathToSuccessfulTrial.join("");
                    if (pathTaken == joinedSuccessfulPath) {
                        if (this.skinTrials[i].Availability) {
                            output.innerHTML = `You are eligible for <span class="result-focus">${this.skinTrials[i].name}</span>`
                            theCrumbP.innerText = this.skinTrials[i].name;
                            divCrumb.append(theCrumbP)
                            contact.style.display = "block";
                            print.style.display = "block";
                            printP.style.display = "block";
                            break;
                        } else {
                            output.innerHTML = `The trial ${this.skinTrials[i].name} is <span class="result-focus">not open</span> to new patients.`
                            theCrumbP.innerText = this.skinTrials[i].name;
                            divCrumb.append(theCrumbP)
                            break;
                        }
                    } else {
                        output.innerHTML = `There are <span class="result-focus">no trials</span> available.`;
                        theCrumbP.innerText = " No Trials.";
                        divCrumb.append(theCrumbP)
                    }
                }
                //outputs the result to the screen.
                
                crumbs.append(divCrumb)
                document.getElementById("title").innerText = ""
                document.getElementById("nodesHere").append(output);
                break;

            case 2:
                //for loop to check the entire trial array
                for (let i = 0; i < this.breastTrials.length; i++) {
                    joinedSuccessfulPath = this.breastTrials[i].pathToSuccessfulTrial.join("");
                    if (pathTaken == joinedSuccessfulPath) {
                        if (this.breastTrials[i].Availability) {
                            output.innerHTML = `You are eligible for <span class="result-focus">${this.breastTrials[i].name}</span>`
                            theCrumbP.innerText = this.breastTrials[i].name;
                            divCrumb.append(theCrumbP)
                            contact.style.display = "block";
                            print.style.display = "block";
                            printP.style.display = "block";
                            break;
                        } else {
                            output.innerHTML = `The trial ${this.breastTrials[i].name} is <span class="result-focus">not open</span> to new patients.`
                            theCrumbP.innerText = this.breastTrials[i].name;
                            divCrumb.append(theCrumbP)
                            break;
                        }
                    } else {
                        output.innerHTML = `There are <span class="result-focus">no trials</span> available.`;
                        theCrumbP.innerText = " No Trials.";
                        divCrumb.append(theCrumbP)
                    }
                }
                //outputs the result to the screen.
                
                crumbs.append(divCrumb)
                document.getElementById("title").innerText = ""
                document.getElementById("nodesHere").append(output);
                break;

            case 3:
                //for loop to check the entire trial array
                for (let i = 0; i < this.urinaryTrials.length; i++) {
                    joinedSuccessfulPath = this.urinaryTrials[i].pathToSuccessfulTrial.join("");
                    if (pathTaken == joinedSuccessfulPath) {
                        if (this.urinaryTrials[i].Availability) {
                            output.innerHTML = `You are eligible for <span class="result-focus">${this.urinaryTrials[i].name}</span>`
                            theCrumbP.innerText = this.urinaryTrials[i].name;
                            divCrumb.append(theCrumbP)
                            contact.style.display = "block";
                            print.style.display = "block";
                            printP.style.display = "block";
                            break;
                        } else {
                            output.innerHTML = `The trial ${this.urinaryTrials[i].name} is <span class="result-focus">not open</span> to new patients.`
                            theCrumbP.innerText = this.urinaryTrials[i].name;
                            divCrumb.append(theCrumbP)
                            break;
                        }
                    } else {
                        output.innerHTML = `There are <span class="result-focus">no trials</span> available.`;
                        theCrumbP.innerText = " No Trials.";
                        divCrumb.append(theCrumbP)
                    }
                }
                //outputs the result to the screen.
                
                crumbs.append(divCrumb)
                document.getElementById("title").innerText = ""
                document.getElementById("nodesHere").append(output);
                break;
        }

    }



    //function to fetch the button information based on which cancer type
    fetchNodes(nodeClicked, cancertype) {
        fetch('data/nodes.json')
            .then(data => data.json())
            .then(data => {
                //switch that checks which type of cancer it is
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


// getting ready all the initial elements' references
let click = 0;
let lung = document.getElementById("lung");
let skin = document.getElementById("skin");
let breast = document.getElementById("breast");
let urinary = document.getElementById("urinary");
let submit = document.getElementById("submit");
let initial = document.getElementById("initialOptions");
let crumbs = document.getElementById("breadCrumbs");
let title = document.getElementById("mainTitle");
let divCrumb = document.createElement("div");
let contact = document.getElementById("contact");
let print = document.getElementById("print");
let printP = document.getElementById("printPage");
printP.style.display = "none";


//print button activation
printP.addEventListener("click", function (){
    window.print();
})

// putting the event listeners on the initial buttons
lung.addEventListener("click", function () {
    cancertype = 0;
    initial.style.display = "none";
    submit.classList.remove("hide");
    title.innerText += " - Lung Cancer";
    lung.classList.add("hide");
    theStart(lung.dataset.number);
});
skin.addEventListener("click", function () {
    cancertype = 1;
    initial.style.display = "none";
    submit.classList.remove("hide");
    title.innerText += " - Cutaneous Onc Cancer";
    lung.classList.add("hide");
    theStart(skin.dataset.number);
});
breast.addEventListener("click", function () {
    cancertype = 2;
    initial.style.display = "none";
    submit.classList.remove("hide");
    title.innerText += " - Breast Cancer";
    lung.classList.add("hide");
    theStart(breast.dataset.number);
});
urinary.addEventListener("click", function () {
    cancertype = 3;
    initial.style.display = "none";
    submit.classList.remove("hide");
    title.innerText += " - Genito - Urinary Cancer";
    lung.classList.add("hide");
    theStart(urinary.dataset.number);

});


// another click listener for the creation of following nodes to come.
submit.addEventListener("click", getNew);

//function that starts loading the next set of buttons
function getNew() {
    //stops the submit button from being useable
    submit.disabled = true;
    theStart(clickedNodeFlag);
    
}


function theStart(nodeClicked) {
    // passing the clicked node's data-number value to the class
    let tri = new Trials(nodeClicked);
}

//restart button and click event listener
let reset = document.getElementById("reset");
reset.addEventListener("click", resetApp);


//reloads the program when restart button is clicked
function resetApp() {
    document.location.reload();
}