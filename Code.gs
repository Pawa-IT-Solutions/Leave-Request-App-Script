/** @OnlyCurrentDoc */

/**
 * Main function to be triggered onFormSubmit 
 * Send a formatted email to an approver 
 * It collect values from the submittedForm (see bellow)
 * @param {e}: event 
 * 
 * Columns mapping from the Google Sheet
 * 0 Timestamp	1 Email address	2 Approval request 	
 * This function is trigger onFormSubmit
 * Version: 1
 * Creation Date: May 2021 
 * Author: Vincent M
*/

function autoFillGoogleDocFromForm(e) {
// assume it's the first sheet where the data is collected
var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
var last = sh.getLastRow();
var lastcol = sh.getLastColumn();
var Requesteremail = e.values[1];
var RequestContent = e.values[2];
var StartDate = e.values[3];
var EndDate = e.values[4];
var Reason = e.values[5];
var MoreInfo = e.values[6];
// Generate Unique ID
var Uuid = uuid_(lastcol);
// return the URL : apps needs to be deployed
var scriptUri = DEPLOY_ID;
Logger.log('uri: '+scriptUri);
// Append results in the Google Sheet
var array = [ [
  Uuid, "NA", "NA",
'=HYPERLINK("'+scriptUri+'?i='+Uuid+'&state=APPROVED&last="&ROW(),"Approve")',
'=HYPERLINK("'+scriptUri+'?i='+Uuid+'&state=DENIED&last="&ROW(),"Deny")',
] ]
Logger.log('array to be inserted in the Sheet last: '+array);
// insert colum 4
var newRange = sh.getRange(last,8,1,5);
Logger.log(newRange.getA1Notation());
newRange.setValues(array);
reviewContent_(
  Requesteremail,
  RequestContent,
  Uuid,
  last,
  StartDate,
  EndDate,
  Reason,
  MoreInfo
  ); // TemplateEmail + Recipients settings 
}