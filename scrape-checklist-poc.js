/**
 * Proof of concept to extract the checklist items for future SMS/Email notification work
 */

let checklistItems = Array.from(document.getElementsByClassName('tableChecks')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

let extracted = {
    present: [],
    missing: []
};

checklistItems.forEach( (elem, i) => {

    const present = (elem.getElementsByTagName('td')[2].getElementsByTagName('i')[0].title === 'Ok');
    if (present) {
        extracted.present.push({
            name: elem.getElementsByTagName('td')[0].textContent,
            expiry: elem.getElementsByTagName('td')[1].textContent,
        });
    } else {
        extracted.missing.push({
            name: elem.getElementsByTagName('td')[0].textContent,
            expiry: elem.getElementsByTagName('td')[1].textContent,
        });
    }
}
)

if (!window.__NRDEV__) {
    __NRDEV__ = {};
}

if (!__NRDEV__['brevity']) {
    __NRDEV__ = { brevity: {} };
}

if (!__NRDEV__['brevity']['clientChecklist']) {
    __NRDEV__ = { brevity: {
        clientChecklist: {}
    } };
}

__NRDEV__.brevity.clientChecklist = extracted;
