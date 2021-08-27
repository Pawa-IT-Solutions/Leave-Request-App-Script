const Header = {
  Timestamp: 'Timestamp',
  EmailAddress: 'Email Address',
  Name: 'Name',
  StartDate: 'Start date',
  EndDate: 'End date',
  Reason: 'Reason',
  AdditionalInformation: 'Additional Information',
  UniqueID: "Request ID",
  ApprovedBy: 'Approved By',
  DeniedBy: 'Denied By',
  ApprovalLink: 'Link to Approve',
  DenyialLink: 'Link to deny',
};

const Reason = {
  Vacation: 'Vacation',
  SickLeave: 'Sick leave',
  MaternityPaternity: 'Maternity/Paternity',
  Breavement: 'Bereavement',
  LeaveOfAbsence: 'Leave of absence',
  Other: 'Other reason',
};


/**
 * Set up the "Request time off" form.
 */
function formSetup() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  if (sheet.getFormUrl()) {
    let ui = SpreadsheetApp.getUi();
    ui.alert(
      'ℹ️ A Form already exists',
      'Unlink the form and try again.\n\n' +
      'From the top menu:\n' +
      'Click "Form" > "Unlink form"',
      ui.ButtonSet.OK
    );
    return;
  }

  // Create the form.
  let form = FormApp.create('Request time off')
      .setCollectEmail(true)
      .setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId())
      .setLimitOneResponsePerUser(false);

  form.addTextItem().setTitle(Header.Name).setRequired(false);
  form.addDateItem().setTitle(Header.StartDate).setRequired(true);
  form.addDateItem().setTitle(Header.EndDate).setRequired(true);
  form.addListItem().setTitle(Header.Reason).setChoiceValues(Object.values(Reason)).setRequired(true);
  form.addTextItem().setTitle(Header.AdditionalInformation).setRequired(false);
}


/**
 * Creates an "Approval" and "Notified status" column
 */
function columnSetup() {
  let sheet = SpreadsheetApp.getActiveSheet();

  appendColumn(sheet, Header.UniqueID);
  appendColumn(sheet, Header.ApprovedBy);
  appendColumn(sheet, Header.DeniedBy);
  appendColumn(sheet, Header.ApprovalLink);
  appendColumn(sheet, Header.DenyialLink);
}


/**
 * Appends a new column.
 * 
 *  @param {SpreadsheetApp.Sheet} sheet - tab in sheet.
 *  @param {string} headerName - name of column.
 */
function appendColumn(sheet, headerName) {
  let range = sheet.getRange(1, sheet.getLastColumn() + 1);

  // Create the header header name.
  range.setValue(headerName);

  
}









