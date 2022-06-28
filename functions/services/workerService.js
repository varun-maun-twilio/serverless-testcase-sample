exports.searchWorkersByActivity = async function (twilioClient, requestEvent) {
    const { activityName } = requestEvent;

    if (activityName == null) {
        return {
            statusCode: 400,
            errorMessage: 'Missing Input parameters',
        };
    }
    if (!['Offline', 'Active'].includes(activityName)) {
        return {
            statusCode: 400,
            errorMessage: 'Invalid value for activityName',
        };
    }

    const [workerList, workerListError] = await twilioClient.taskrouter.workspaces(process.env.TWILIO_FLEX_WORKSPACE_SID)
        .workers
        .list({ limit: 5000, activityName })
        .then(dlist => [dlist, null])
        .catch(e => [null, e]);

    if (workerListError != null) {
        return {
            statusCode: 500,
            errorMessage: 'Problem with downstream system',
        }
    }



    return {
        statusCode: 200,
        data: {
            workerList,
        },
    };
};
