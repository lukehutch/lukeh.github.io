
const SPREADSHEET_ID = "1WM9jMm3Ka5dSLh1M67jM32r83GmVAg9Qx7W" + "_" + "rfuGnaI";
const CLIENT_ID =
    "503675354804-"
    + "8h4c2hh0gn5frqnnae97ll67p5d1592m.apps.go"
    + "ogleusercontent.com";
const API_KY = "AIzaSyAyNeAxyZZ"
    + "_" + "jPEeTOdzNzA" + "__"
    + "sij8hnY-wE";
const SCOPE = "https://www.go" + "ogleapis.com/au" + "th/spread" + "sheets";
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
}

async function intializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeInited();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: '', // defined later
    });
    gisInited = true;
    maybeInited();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        // document.getElementById('authorize_button').style.visibility = 'visible';
    }
}


gapi.load('client:auth2', () => {
    gapi.client.init({
        'apiKey': API_KY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(()=> {
        console.log("Logged in: " + gapi.auth2.getAuthInstance().isSignedIn.get());
    }).then(async () => {
        const geoloc = (await fetch("https://api.db-ip.com/v2/free/self")).body();
        const params = {
          spreadsheetId: SPREADSHEET_ID, 
          range: 'Sheet1',
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
        };
        const valueRangeBody = {
          'majorDimension': 'ROWS',
          'values': [new Date().toString(), window.location.href, geoloc, Navigator.userAgent]
        };
        let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function (response) {
          // TODO: Insert desired response behaviour on submission
          console.log(response.result);
        }, function (reason) {
          console.error('error: ' + reason.result.error.message);
        });
    });
});


