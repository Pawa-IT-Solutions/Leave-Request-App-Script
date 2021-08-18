# One Step Approval App Script

This solution uses a Google Apps Script to automate the process of leave approval. The workflow is as follows:

1. The user submits a leave request using a google form.
2. Data from the form is sent to a linked sheet.
3. As the form is submitted, the app script sends the information in the form to the approver.
4. The approver can choose to accept or deny the request by clicking on either option in the email.
5. The approver's response is recorded in the sheet and also sent to the requester.
6. If the request was accepted, an out of office event is automatically created in the requester's calendar.

## Deploying the script

The instructions on how to deploy the solution can be found here: https://docs.google.com/document/d/1FRHyiDVgM2ngEdt_zD4nuqb7V_YKDojF3CtEUWufiu0

This script is an extension of the one step approval workflow app script here: https://github.com/Pawa-IT-Solutions/One-Step-Approval-AppScript
