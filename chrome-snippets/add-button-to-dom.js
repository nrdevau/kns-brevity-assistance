// Brittle selector to get the checklist container
let checklistContainer = document.querySelector('#ClientDetails > div:nth-child(1) > div.col-lg-5.col-md-12.col-sm-12.col-xs-12.accordian-group-box > div.portlet.light.bordered.checklist > div > div > div > div > div.panel-headingnew');
let notifyWorkerButton = document.createElement('button');
notifyWorkerButton.style.cssText = 'background: #3a50b4; background: linear-gradient(90deg, rgba(58, 80, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(93, 69, 252, 1) 100%);color: white;border: unset;padding: 2px;float: right;'});
notifyWorkerButton.onclick = function(){
    openWorkerNotificationWindow(); return false;
  };
notifyWorkerButton.appendChild(document.createTextNode("Notify Worker"));
checklistContainer.append(notifyWorkerButton);
let notifyClientButton = document.createElement('button');
notifyClientButton.onclick = function(){
    alert('Fire notify client window - todo'); return false;
  };
notifyClientButton.appendChild(document.createTextNode("Notify Client"));
checklistContainer.append(notifyClientButton);

