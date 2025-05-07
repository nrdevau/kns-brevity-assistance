// Brittle selector to get the checklist container
let checklistContainer = document.querySelector('#ClientDetails > div:nth-child(1) > div.col-lg-5.col-md-12.col-sm-12.col-xs-12.accordian-group-box > div.portlet.light.bordered.checklist > div > div > div > div > div.panel-headingnew');
let notifyButton = document.createElement('button');
notifyButton.onclick = function(){
    openWorkerNotificationWindow(); return false;
  };
notifyButton.appendChild(document.createTextNode("Notify Worker"));
checklistContainer.append(notifyButton);
let notifyClientButton = document.createElement('button');
notifyClientButton.onclick = function(){
    alert('Fire notify client window - todo'); return false;
  };
notifyClientButton.appendChild(document.createTextNode("Notify Client"));
checklistContainer.append(notifyClientButton);

