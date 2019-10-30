// your code goes here ...
//create the array to store members and errors
var members = [];
//create variable to hold error messages
var errors = "";
// function for generating IDs
function generateId() {
  var date = new Date();
  var components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
  var id = components.join("");
  return id;
}
//function for doing a forEach with a NodeList (several options for this, chose this instead of messing with array prototypes)
var forEach = function(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

var addMember = document.querySelector("button.add");

var submitMembers = document.querySelector("button[type=submit]");

submitMembers.addEventListener("click", function(e) {
  e.preventDefault();
  //stores the IDs grabbed from final list of dom nodes
  var memberIds = [];
  var membersJSON = {};
  // get all nodes of the members
  var member;
  memberNodeList = document.getElementsByClassName("member");
  // go through each node in the NodeList and extract the id
  forEach(memberNodeList, function(index, value) {
    memberIds.push(value.id);
  });

  memberIds.forEach(function(id) {
    function findMember(members) {
      return members.id === id;
    }
    var thisMember = members.find(findMember);

    membersJSON[id] = thisMember;
  });

  var preTagNode = document.querySelector("pre.debug");
  preTagNode.innerHTML = JSON.stringify(membersJSON);
  console.log("you submitted a form with: \n" + JSON.stringify(membersJSON));

  alert("It was submitted successfully please go to console for JSON");
});

addMember.addEventListener("click", function(e) {
  e.preventDefault();

  // get values from inputs (and parseInt the age which comes to us as a string instead of a number)
  var age = document.getElementsByName("age")[0].value;
  var parsedAgeString = parseInt(age) || 0;
  var relation = document.getElementsByName("rel")[0].value;
  var smoker = document.getElementsByName("smoker")[0].checked;
  // check for errors
  if (parsedAgeString <= 0)
    errors += "Please specify an age as a number greater than 0.\n";
  if (relation == "") errors += "Please specify a relation.\n";
  // if errors, display alert with errors
  if (errors != "") {
    alert(errors);
    e.preventDefault();
    errors = "";
    return;
  }
  // build member object
  var member = {
    id: generateId(),
    age: parsedAgeString,
    relation: relation,
    smoker: smoker
  };

  members.push(member);

  var stringId = member.id.toString();
  var element = document.createElement("div");

  element.setAttribute("id", stringId);
  element.setAttribute("class", "member");
  element.innerHTML =
    "Member # " +
    members.length +
    " : " +
    "Age: " +
    parsedAgeString +
    " " +
    "Relationship: " +
    relation +
    " " +
    "Smoker: " +
    smoker;

  var button = document.createElement("button");
  button.setAttribute("id", stringId);

  button.innerHTML = "delete";

  button.addEventListener("click", function(e) {
    function findMember(members) {
      return members.id === e.target.id;
    }
    var thisMember = members.find(findMember);
    var thisMemberElement = document.getElementById(thisMember.id);
    thisMemberElement.outerHTML = "";
    delete thisMemberElement;
  });
  element.appendChild(button);
  document.body.appendChild(element);
});
