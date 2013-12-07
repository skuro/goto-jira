/**
  * GOTO Jira
  *
  * A chrome extension to navigate through your JIRA issues
  * @author Carlo Sciolla
  */

function listIssues(issues){
    var issueText  = document.getElementById("issue");

    if(issues.found) {
        issueText.innerHTML = "Issue found";
    }
    else {
        issueText.innerHTML = "No issue found";
    }
}

function GOTOJira(){
    var gotoButton = document.getElementById("GOTO");

    gotoButton.onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response) {
                listIssues(response);
            });
        });
    };
}

GOTOJira();
