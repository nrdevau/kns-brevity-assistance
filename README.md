# Brevity Assistance

Intention is to add custom functionality on top of the CRM for a client that fills gaps causing issues to their workflow.

Currently the solution is to run the chrome snippets in the following order:
1. extract-details.js (this pulls the data into a global `__NRDEV__` variable)
1. render-notifier-window.js (defines a method to be called by the button added to the dom in step 3)
1. add-button-to-dom.js (Adds buttons for opening the custom window, to allow a CRM admin to trigger manual SMS or email notifications)

### Goals
Eventually the SMS and email notifications will be automated, but we should do it manually a bunch of times until
- understand the copy content well
- occurance rate is sane
- underlying data (expiry dates) are all set as necesary


#### Edge cases to be aware of
Some checklist items are used internally (no need to notify workers or clients)

#### TODO
- Setup backend on nrdev using ClickSend (poc working)
- Determine who to send notifications to
- Load snippets in the client's browser
