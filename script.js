
const SPREADSHEET_ID = '1WM9jMm3Ka5dSLh1M67jM32r83GmVAg9Qx7W_rfuGnaI';
const CLIENT_ID = '503675354804-"
    + "8bd1dnh3d5dmh5bra73o100duhn110t3.apps.go"
    + "ogleusercontent.com';
const API_KY = "AIzaSyAyNeAxyZZ"
    + "_" + "jPEeTOdzNzA" + "__"
    + "sij8hnY-wE";
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

gapi.load('client:auth2', () => {
    gapi.client.init({
        'apiKey': API_KY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(()=> {
        // gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
        this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
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


