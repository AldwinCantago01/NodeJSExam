require('dotenv').config()

const prompt = require('prompt-sync')()

const registration = require('./registration');
const uploadResume = require('./uploadResume');
const scheduleInterview = require('./scheduleInterview');

const application = async () => {
    const registrationResult = await registration();
    if (!registrationResult) return;

    const axaAPIKey = prompt('Please provide the "x-axa-api-key" sent to your email: ');

    const uploadResumeResult = await uploadResume(axaAPIKey);
    if (!uploadResumeResult) return;

    scheduleInterview(axaAPIKey);
}

application();