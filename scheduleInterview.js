const axios = require('axios');
const moment = require('moment');
const prompt = require('prompt-sync')();

const scheduleInterview = axaAPIKey => {
    let correctPrompt = false;
    let proposedDate;
    let proposedTime;

    while (!correctPrompt) {
        proposedDate = prompt('Please give a proposed date of interview in "YYYY-MM-DD" format: ');
        if (proposedDate === 'close') return;

        if (!moment(proposedDate, "YYYY-MM-DD", true).isValid()) {
            console.log('Input must be a date in "YYYY-MM-DD" format.');
        } else {
            correctPrompt = true;
        }
    }

    correctPrompt = false;
    while (!correctPrompt) {
        proposedTime = prompt('Please give a proposed time of interview in "HHmmAM/PM" format: ');
        if (proposedTime === 'close') return;

        if (!moment(proposedTime, "hmmA", true).isValid()) {
            console.log('Input must be a time in "HHmmAM/PM" format.');
        } else {
            correctPrompt = true;
        }
    }

    axios({
        method: process.env.SCHEDULE_METHOD,
        url: process.env.SCHEDULE,
        headers: {
            'x-axa-api-key': axaAPIKey,
            'content-type': 'application/json'
        },
        data: {
            proposedDate: proposedDate,
            proposedTime: proposedTime
        }
    }).then(result => {
        console.log(`Interview has been registered, please wait for further instructions.`);
    }).catch(err => {
        console.log(`Error encountered while trying schedule an interview. (${(err.request && err.response) ? err.response.data.Message : "Internal Error"})`);
    });
}

module.exports = scheduleInterview;