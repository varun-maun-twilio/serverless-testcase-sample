require('dotenv').config();

const twilioClient = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const workerService = require('../../../functions/services/workerService');

describe('searchWorkers', () => {
  it('searchWorkers_throwError_mandatoryFieldsAreMissing', async () => {
    const response = await workerService.searchWorkersByActivity(twilioClient, {});
    expect(response.statusCode).toEqual(400);
    expect(response.errorMessage).toEqual('Missing Input parameters');
  });

  it('searchWorkers_throwError_activityNameInvalid', async () => {
    const response = await workerService.searchWorkersByActivity(twilioClient, { activityName: 'Sleeping' });
    expect(response.statusCode).toEqual(400);
    expect(response.errorMessage).toEqual('Invalid value for activityName');
  });


  it('searchWorkers_throwError_downstreamServiceIssue', async () => {
    const backupWorkspaceSid = process.env.TWILIO_FLEX_WORKSPACE_SID;
    process.env.TWILIO_FLEX_WORKSPACE_SID = 'dummy';
    const response = await workerService.searchWorkersByActivity(twilioClient, { activityName: 'Offline' });
    expect(response.statusCode).toEqual(500);
    process.env.TWILIO_FLEX_WORKSPACE_SID =backupWorkspaceSid;
  });
  
  it('searchWorkers_returnListOfWorkers_activityNameValid', async () => {
    const response = await workerService.searchWorkersByActivity(twilioClient, { activityName: 'Offline' });
    expect(response.statusCode).toEqual(200);
  });

});
