/**
  * GOTO Jira
  *
  * A chrome extension to navigate through your JIRA issues
  * @author Carlo Sciolla
  */

(function GOTOJira(){
    var issueField = document.getElementById("issue");
    var gotoButton = document.getElementById("GOTO");
    var baseURL    = "https://backbase.atlassian.net/browse/";

    gotoButton.onclick = function(){
        window.postMessage("getselection");
    };
})();
