/**
 * GOTOJira content script
 *
 * Respond on queries to provide the selected text on the page
 */

var tooltipTemplate = "<ul>{{#issues}}<li><a goto-jira=\"link\" href=\"{{link}}\">{{key}}</a></li>{{/issues}}</ul>";

function parseIssues(text){
    return text.match(/[a-zA-Z]+-[0-9]+/g) || [];
}

var bubble = document.createElement("div");
bubble.setAttribute('id', 'GOTOJira_bubble');
bubble.setAttribute('class', 'GOTOJira_bubble');
document.body.appendChild(bubble);

function isIssueClick(event){
    var target = event.target;
    var attrib = target.getAttribute("goto-jira");
    return attrib != null && "link" == attrib;
}

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
    if(!isIssueClick(e)) {
        var selection = window.getSelection().toString();
        if (selection.length > 0) {
            var issues = parseIssues(selection);
            if(issues.length > 0) {
                renderBubble(e.clientX, e.clientY, issues);
            }
        }
    }
}, false);

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    if(!isIssueClick(e)) {
        bubble.innerHTML = "";
        bubble.style.visibility = 'hidden';
    }
}, false);

function renderBubbleContent(model) {
    var output = Mustache.render(tooltipTemplate, model);
    return output;
}

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, issues) {
    var issuesLinks = [];
    issues.forEach(function(issue) {
        issuesLinks.push({
            link : "https://backbase.atlassian.net/browse/" + issue,
            key  : issue
        });
    });

    bubble.innerHTML = renderBubbleContent({issues : issuesLinks});
    bubble.style.top = mouseY + 'px';
    bubble.style.left = mouseX + 'px';
    bubble.style.visibility = 'visible';
}

function noIssuesFoundResponse(){
    return {
        found: false,
        text: "no issues found"
    };
}
