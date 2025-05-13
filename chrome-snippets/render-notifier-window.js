/**
 * Render a window to help streamline brevity checklist workflow
 */


/*
    jq -r '.aaData[] | [.primaryid, .name, .email, .mobilephone] | join(": ")' Nursing-Users.json
    */
    const workerDetails = [
        {id: 1, name: 'Nate'},
        {id: 2, name: 'Worker 2'},
    ]

    let options = [];
    workerDetails.forEach((elem, i) => {
        options.push({value: elem.id, text: elem.name});
    });

    // TODO: work out backend endpoint requirements
    const notifyEndpoint = (checklistItem, notificationType) => {

        const workerId = 1;

        // TODO: post request data
        const data = {
          key: '<key from backend somehow>',
          workerId: workerId,
          clientId: clientId,
          checklistItem: checklistItem,
          notificationType: notificationType
        }

        fetch(url, data);

        return `https://nrdev.au/notifier.php?key=nrdevkns&type=${notificationType}&client=${clientId}&worker=${workerId}&checklistItem=${checklistItem}`;
    };

    const renderNotificationSelector = (newWindow, options, elem, index) => {
        let notificationSelectorHtml = "<select id="checklist-worker-notifier-${index}" onchange='window.opener.setValue(this.value);'>";
        options.forEach((option) => {
            notificationSelectorHtml += "<option value='"+option.value+"'>";
            notificationSelectorHtml += option.text;
            notificationSelectorHtml += "</option>";
        });
        notificationSelectorHtml += "</select>";
        console.log();
        return notificationSelectorHtml;
    };

    const renderWindow = (newWindow) => {
        const clientName = window.__NRDEV__.brevity.clientChecklist.name;
        let expiredHtml = '<h5>No expired items!</h5>';
        if (window.__NRDEV__.brevity.clientChecklist.data.missing) {
            expiredHtml =
                `<h3>Expired Checklist Items</h3>
    <table class="table table-striped">
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
            window.__NRDEV__.brevity.clientChecklist.data.missing.forEach((elem, index) => {
                expiredHtml += `
    <tr>
          <th scope="row">${index+1}</th>
          <td>${clientName}</td>
          <td>${elem.name}</td>
          <td>${elem.expiry}</td>
          <td>
              <i class="fa fa-times-circle" title="No Valid Record" style="color:red"></i>
              ${renderNotificationSelector(newWindow, options, elem, index)}
          </td>
          <td>
              <a href="${notifyEndpoint(index, 'sms')}">
                  SMS
              </a>
          </td>
          <td>
              <a href="${notifyEndpoint(index, 'email')}">
                  Email
              </a>
          </td>
        </tr>`
    });
            expiredHtml += '</tbody>';
            expiredHtml += '</table>';
        }


        let presentHtml = '<h5>No checklist items to show</h5>';
        if (window.__NRDEV__.brevity.clientChecklist.data.present) {
            presentHtml =
                `<h3>Present Checklist Items</h3>
    <table class="table table-striped">
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
                window.__NRDEV__.brevity.clientChecklist.data.present.forEach((elem, index) => {
                    presentHtml += `
    <tr>
          <th scope="row">${index+1}</th>
          <td>${clientName}</td>
          <td>${elem.name}</td>
          <td>${elem.expiry}</td>
          <td>
          <i class="fa fa-check-circle" title="Ok" style="color:green"></i>
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
        `<div class="container container-fluid">
           <div class="d-flex align-items-center p-5">
             <img alt="" src="https://nrdev.au/images/logos/kns.png">
             <h2 class="px-3">Kylie's Automated Assistant</h2>
           </div>
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

    const openWorkerNotificationWindow = () => {
        let newWindow = window.open("", null, "height=400,width=1200,status=yes,toolbar=no,menubar=no");
        newWindow.document.write(renderWindow(newWindow));
    }
if (!window.__NRDEV__) {
    console.log('Make sure you extract the brevity data first!');
}
else {
    console.log('Now trigger openWorkerNotificationWindow() and the window should open');
    // openWorkerNotificationWindow();
}

