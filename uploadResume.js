const fs = require('fs');
const axios = require('axios');

const uploadResume = axaAPIKey => {
    let base64PDF;
    try {
        base64PDF = fs.readFileSync('Resume.pdf', { encoding: 'base64' })
    } catch (err) {
        console.log(`Error encountered while trying to read Resume.pdf (${err.message})`);
        return false;
    }

    return axios({
        method: process.env.UPLOAD_METHOD,
        url: process.env.UPLOAD,
        headers: {
            'x-axa-api-key': axaAPIKey,
            'content-type': 'application/json'
        },
        data: {
            'file': {
                'mime': 'application/pdf',
                'data': base64PDF
            }
        }
    }).then(result => {
        console.log(`Resume upload was successful. Proceeding to next step..`);
        return true;
    }).catch(err => {
        console.log(`Error encountered while trying to upload the resume. (${(err.request && err.response) ? err.response.data.Message : "Internal Error"})`);
        return false;
    });
}

module.exports = uploadResume;