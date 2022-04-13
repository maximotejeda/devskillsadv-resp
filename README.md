# Getting Started with devskillsadv-resp

This project was created as an assigment.
The api for the project must be running to in order for the page to work in [http://localhost:8081](http://localhost:8081).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Credentials
The credentials are hardcoded, but they are suppose to be passed through a login form.
The login is automated at page init.

## Conditions
- On init, the form validator is set to false, if the form is filled with correct data is changed to true.
- On init, useEffect perform an initial query to validate credentials.
- After the credential validation token var is set to response to the last query.
- Then we set headers Authentication and content-type.
- Then the page query the Api for the data to hydrate the table.
- Bottons are dependant of the form validator.
- Botton Save is disabled until form validator is set to true.
- Botton Clear set the for to its initial state.
- On save the data of the valid form is sent to the api with a POST req/.
- On save the data of the valid form is append to the table.
- On save the form is cleared.
- If the ssn is already in the data var an error is shown in the form part.
- After a 10secs the error disappear.
- The page is reloaded every 2 minutes.

## Alternatives
A context would be a good option to control the data flow in the application.
Helpers to separate the the functions to control the page.
Custom hooks to make api calls.
