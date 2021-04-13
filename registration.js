const axios = require('axios');
const prompt = require('prompt-sync')();

const registration = () => {
    const name = prompt('What is your name? ');
    const email = prompt('What is your email? ');
    const mobile = prompt('What is your mobile number? ');
    const positionApplied = prompt('What is the position you applied for? ');
    const source = prompt('Which agency did you apply from? ');

    return axios({
        method: process.env.REGISTER_METHOD,
        url: process.env.REGISTER,
        headers: {
            'content-type': 'application/json'
        },
        data: {
            Name: name,
            Email: email,
            Mobile: mobile,
            PositionApplied: positionApplied,
            Source: source
        }
    }).then(result => {
        console.log(`Registration was successful. Proceeding to next step..`);
        return true;
    }).catch(err => {
        console.log(`Error encountered while trying to register. (${(err.request && err.response) ? err.response.data.Message : "Internal Error"})`);
        return false;
    });
}

module.exports = registration;