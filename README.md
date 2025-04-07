# TimerAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Development server

To start a local development server, run:

```bash
ng serve --open
```

or

```bash
npm start
```

Once the server is running, open your browser and the site will open at `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Goal

The goal of this project is for me to learn more about Angular.

## Features

- App enables the user to create a timer with a title and a date. 

- The countdown starts when the form is submitted, as long as it passes the validation(Date should not be prior to the day the form is created / Form can only be submitted if title and date is provided).

- Title and date will be set on the cookies so when user opens the app timer keeps going on.

- Reset timer button enables user to reset the timer completely and clear the cookies previously set.

- Message informing the user when the timer set on the cookies is completed.
