/**
 * GOTOJira content script
 *
 * Respond on queries to provide the selected text on the page
 */

function noIssuesFoundResponse(){
    return {
        found: false,
        text: "no issues found"
    };
}

function findIssueNumber(){
    var selection = window.getSelection();
    if(selection != null && selection != undefined && selection.toString() !== "") {
        return {
            found: true,
            text: selection.toString()
        };
    }

    return noIssuesFoundResponse();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getSelection") {
            var selection = findIssueNumber();
            sendResponse(selection);
        }
    });
