/**
 * GOTOJira content script
 *
 * Creates a tooltip with links to the JIRA issues mentioned in the currently
 * selected text.
 *
 * @author Carlo Sciolla
 */

var GOTOJira = function() {

    // save ref for cross fn call
    var self = this;

    this.tooltipTemplate = "<ul id=\"goto-jira-list\">{{#issues}}<li><a goto-jira=\"link\" href=\"{{link}}\">{{key}}</a></li>{{/issues}}</ul>";

    this.bubble = (function() {
        var elem = document.createElement("div");
        elem.setAttribute('id', 'GOTOJira_bubble');
        elem.setAttribute('class', 'GOTOJira_bubble');
        document.body.appendChild(elem);

        return elem;
    })();

    this.parseIssues = function (text) {
        return text.match(/[a-zA-Z]+-[0-9]+/g) || [];
    };

    this.isIssueClick = function (event){
        var target = event.target;
        var attrib = target.getAttribute("goto-jira");
        return attrib != null && "link" == attrib;
    };

    this.renderBubbleContent = function (model) {
        var tooltipTemplate = self.tooltipTemplate;
        var output = Mustache.render(tooltipTemplate, model);
        return output;
    };

    // Move that bubble to the appropriate location.
    this.renderBubble = function (mouseX, mouseY, issues) {
        var issuesLinks = [];
        var bubble = self.bubble;

        issues.forEach(function(issue) {
            issuesLinks.push({
                link : "https://backbase.atlassian.net/browse/" + issue,
                key  : issue
            });
        });

        bubble.innerHTML = self.renderBubbleContent({issues : issuesLinks});
        bubble.style.top = mouseY + 'px';
        bubble.style.left = mouseX + 'px';
        bubble.style.visibility = 'visible';
    }

    // Lets listen to mouseup DOM events.
    document.addEventListener('mouseup', function (e) {
        if(!self.isIssueClick(e)) {
            var selection = window.getSelection().toString();
            if (selection.length > 0) {
                var issues = self.parseIssues(selection);
                if(issues.length > 0) {
                    self.renderBubble(e.clientX, e.clientY, issues);
                }
            }
        }
    }, false);

    // Close the bubble when we click on the screen.
    document.addEventListener('mousedown', function (e) {
        var bubble = self.bubble;

        if(!self.isIssueClick(e) && bubble.style.visibility == "visible") {
            bubble.innerHTML = "";
            bubble.style.visibility = 'hidden';
            return false;
        }
    }, false)
};

var gotoJira = new GOTOJira();
