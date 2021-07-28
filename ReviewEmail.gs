/**
 * Send email based on a template message intent from Dialogflow Agent.
 * @param {String} Requester email to find intent
 * @param {String} Requester content 
 * @param {String} Generated UUID for the request
 * @param {Integer} Id of the last row of the sheet
 * @param {state} Opt state of the request
 */
function reviewContent_(Requesteremail, RequestContent, Uuid, Last, StartDate, EndDate, Reason, MoreInfo, state) {
  Logger.log('reviewContent Requesteremail: ' + Requesteremail + ' RequestContent: ' + RequestContent + ' Uuid: ' + Uuid + ' Last: ' + Last + " start date: " + StartDate + " end date: " + EndDate + " reason: " + Reason + " state: " + state);
  var scriptUri = DEPLOY_ID;
  Logger.log(scriptUri)
  // hack some values on to the data just for email templates.
  var ApprovalUrl = scriptUri + "?i=" + Uuid + '&state=' + APPROVED_STATE + '&last=' + Last;
  var DenyUrl = scriptUri + "?i=" + Uuid + '&state=' + DENIED_STATE + '&last=' + Last;

  Logger.log(ApprovalUrl);
  Logger.log(DenyUrl);
 

  var form = {
    requester_Email: Requesteremail,
    requester_Content: RequestContent,
    start_Date: StartDate,
    end_Date: EndDate,
    requester_Reason: Reason,
    more_info: MoreInfo,
    uu_Id: Uuid,
    approval_Url: ApprovalUrl,
    deny_Url: DenyUrl
  };


  if (state === undefined) {
    // state is new
    var templ = HtmlService.createTemplateFromFile('EmailTemp');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: APPROVER_EMAIL,
      // cc: Session.getEffectiveUser().getEmail(),
      // bcc: Session.getEffectiveUser().getEmail(),
      subject: "[New Request] New moderation request",
      htmlBody: message
    });
  }
  if (state === APPROVED_STATE) {
    // state is approved
    var templ = HtmlService.createTemplateFromFile('EmailApprove');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      // cc: Session.getEffectiveUser().getEmail(),
      subject: "[Request - Approval workflow] Request Approved",
      htmlBody: message
    });

  //------------------------------------------------------------------------------------------------------
  //Send calendar event because the approval was successful
 
      createEvent(Requesteremail, StartDate, EndDate);

  //------------------------------------------------------------------------------------------------------
 
    
  }
  if (state === DENIED_STATE) {
    // state is deny
    var templ = HtmlService.createTemplateFromFile('EmailDeny');
    templ.form = form;
    var message = templ.evaluate().getContent();
    MailApp.sendEmail({
      to: Requesteremail,
      cc: Session.getEffectiveUser().getEmail(),
      subject: "[Request - Approval workflow] Request Deny",
      htmlBody: message
    });
  }


}

function createEvent(calendar_id, StartDate, EndDate) {
// var calendar_id = 'test@dev.pawait.co.ke';
  //  var cal = Calendar.Calendars.get('test@dev.pawait.co.ke');
  // Logger.log(cal.summary);

  var calendar = CalendarApp.getCalendarById(calendar_id);

  if(calendar == null){
    //user may not have access, so auto-subscribe to their calendar. Keep calendar hidden and unselected so as not to clutter.
    calendar = CalendarApp.subscribeToCalendar(calendar_id,{hidden:true,selected:false});
  }

  try {
          calendar.createAllDayEvent(
            'OOO - Out Of Office',
            // new Date ('7/14/2021'),
            // new Date('7/20/2021'),
            StartDate,
            EndDate,
            {
              description: 'message',
              // guests: additionalEmail,
              sendInvites: true,
            });
        } catch (e) {
          Logger.log(
                'Error adding event....' + e);
        }


}




