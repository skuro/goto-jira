/**
 * GOTOJira content script
 *
 * Respond on queries to provide the selected text on the page
 */

function getSelection(){
    var selection = window.getSelection();
    if(selection != null && selection != undefined) {
        return {
            selected: true,
            text: selection.toString()
        };
    }

    return {
        selected: false
    };
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getSelection") {
            var selection = {text: "foobar"};
            sendResponse(selection);
        }
        else{
            sendResponse({text: "nothing"}); // snub them.
        }
    });
