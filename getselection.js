var port = chrome.runtime.connect();

window.addEventListener("getselection", function(event) {
    var selectedText;
    if (focused) {
        try {
            selectedText = focused.value.substring(
                focused.selectionStart, focused.selectionEnd);
        } catch (err) {
        }
    }
    if (selectedText == undefined) {
        var sel = window.getSelection();
        var selectedText = sel.toString();
    }

    alert("found: " + selectedText);
}, false);
