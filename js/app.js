document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  //console.log(description, severity, assignedTo);
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  e.preventDefault();
  fetchIssues();
}

const setStatusClosed = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id == id);
  currentIssue.status = "Closed";
  //console.log(currentIssue);
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id !== id);
  console.log(remainingIssues);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  let length = issues.length ? issues.length : 0;
  for (let i = 0; i < length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    console.log(status);
    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
                              </div>`;
  }
};
fetchIssues();
