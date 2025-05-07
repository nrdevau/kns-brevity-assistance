/**
 * Render a window to help streamline brevity checklist workflow
 */

const options = [{
   value: 'sms',
   text: 'SMS Worker'
}, {
   value: 'email',
   text: 'Email Worker'
}];

// TODO: work out backend endpoint requirements
const notifyEndpoint = (elem, item) => {
    const type = 'sms';
    const client = 'Made up Client';
    return `https://nrdev.au/notifier.php?key=nrdevkns&type=${type}&client=${client}&checklistItem=${item}`;
};

function renderNotificationSelector(newWindow, options) {
    let notificationSelectorHtml = "<select onchange='window.opener.setValue(this.value);'>";
    options.forEach((option) => {
        notificationSelectorHtml += "<option value='"+option.value+"'>";
        notificationSelectorHtml += option.text;
        notificationSelectorHtml += "</option>";        
    });
    notificationSelectorHtml += "</select>";
    console.log();
    return notificationSelectorHtml;
}

function renderWindow(newWindow) {

    
    const clientName = __NRDEV__.brevity.clientChecklist.name;
let expiredHtml = '<h5>No expired items!</h5>';
if (__NRDEV__.brevity.clientChecklist.data.missing) {
    expiredHtml =
    `<h3>Expired Checklist Items</h3>
    <table class="table">
      <caption>The following checklist items need to be actioned</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Client</th>
          <th>Item</th>
          <th>Expiry</th>
          <th>Notify</th>
          <th>&nbsp;</th>
        </tr>
      </thead>`;
      expiredHtml += '<tbody>';
    __NRDEV__.brevity.clientChecklist.data.missing.forEach((elem, index) => {
        expiredHtml += `
    <tr>
          <th scope="row">${index+1}</th>
          <td>${clientName}</td>
          <td>${elem.name}</td>
          <td>${elem.expiry}</td>
          <td>
              <i class="fa fa-times-circle" title="No Valid Record" style="color:red"></i>
              ${renderNotificationSelector(newWindow, options)}
          </td>
          <td>
              <a href="${notifyEndpoint(elem, index)}">
              Send</a>
          </td>
        </tr>`
    });
      expiredHtml += '</tbody>';
      expiredHtml += '</table>';
}


let presentHtml = '<h5>No checklist items to show</h5>';
if (__NRDEV__.brevity.clientChecklist.data.present) {
    presentHtml =
    `<h3>Present Checklist Items</h3>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Client</th>
          <th>Item</th>
          <th>Expiry</th>
          <th>Notify</th>
          <th>&nbsp;</th>
        </tr>
      </thead>`;
    presentHtml += `<tbody>`;
    __NRDEV__.brevity.clientChecklist.data.present.forEach((elem, index) => {
        presentHtml += `
    <tr>
          <th scope="row">${index+1}</th>
          <td>${clientName}</td>
          <td>${elem.name}</td>
          <td>${elem.expiry}</td>
          <td>
          <i class="fa fa-check-circle" title="Ok" style="color:green"></i>
          SMS - Jess
          </td>
          <td>
              <a href="${notifyEndpoint(elem, index)}">
              Send</a>
          </td>
        </tr>`
    });
        
    presentHtml += `</tbody>`;
    presentHtml += `</table>`;
}

let mainContent =
    `<div class="container">
    <h2>Kylie's Automated Assistant</h2>
    ${expiredHtml}
    ${presentHtml}
    </div>`;

const myContent = 
    `<html>
    <head>
        <title>Kylie's Automated Assistant - Brevity Worker Notifier</title> 
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
        <!-- font awesome? -->
        <link rel="stylesheet" href="/assets/css/fonts/fontawesome/css/font-awesome.min.css">
    </head>
    <body>
    ${mainContent}
    </body>
    </html>`;

    return myContent;
    
}


function openWorkerNotificationWindow() {
    newWindow = window.open("", null, "height=400,width=1200,status=yes,toolbar=no,menubar=no");  
    newWindow.document.write(renderWindow(newWindow));
}


if (!window.__NRDEV__) {
    console.log('Make sure you extract the brevity data first!');
}
else {
    console.log('Now trigger openWorkerNotificationWindow() and the window should open');
    // openWorkerNotificationWindow();
}

