/**
  * GOTO Jira
  *
  * A chrome extension to navigate through your JIRA issues
  * @author Carlo Sciolla
  */

function GOTOJira(){
    var gotoButton = document.getElementById("GOTO");
    var issueText  = document.getElementById("issue");

    gotoButton.onclick = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response) {
                issueText.innerHTML = "Selected text: " + response;
            });
        });
    };
}

GOTOJira();
