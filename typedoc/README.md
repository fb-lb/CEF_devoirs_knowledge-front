**knowledge-front v0.0.0**

***

# Knowledge-front - Angular application

The aim of this project is to develop the front-end website for the Knowledge company. Knowledge sells training learning in various disciplines. Now they want to develop e-learning, so students have to be able to create their own account on the website, buy new courses and access to the lessons. They can also validate each lesson, if all lessons in cursus are validated then the cursus is validated too. If all cursus in a theme are validated, the user receives a certification for this theme. He can access to all certfications he has in certification page.

There is also a back-office part for the administrator. There are three interfaces for the administrator :
- a CRUD (Create / Read / Update / Delete) for courses' content
- a CRUD for users
- a CRUD for purchases

Technologies used in this project :
- Angular,
- FontAwesome for icons,
- EmailJS to send mails to new registered user with a link to validate user email,
- Stripe to pay courses.

Website URL :   
Project repository : https://github.com/fb-lb/CEF_devoirs_knowledge-front/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

To really use the app, you need a back-end and a database to connect to an account and access to courses so be sure you install this project in this repository too :  
https://github.com/fb-lb/CEF_devoirs_knowledge-back

## Technologies

- IDE : [VSCode](https://code.visualstudio.com/)
- [NodeJs](https://nodejs.org/en/download)

- Angular : 20.2.0
- SCSS for the style
- FontAwesome for icons : [create an account](https://fontawesome.com/start)
- Stripe : [create an account](https://dashboard.stripe.com/register)

## Project initialization

Run `npm install` to install dependencies.

## Environment variables

In src/environments, create a file environment.ts with :
```environment.ts
export const environment = {
  backUrl: "http://localhost:3000", // your back-end url
  stripePublicKey: 'pk_test_your_public_key',
}
```

## Development server

Run `ng serve` or `npm run start` for a dev server.  
Navigate to `http://localhost:4200/`.  
The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Users password to login

> Here is the different user name to connect, John and Jane are admin and the other are users :  
john.doe@test.com  
jane.doe@test.com  
jack.doe@test.com  
james.doe@test.com  

> This is the same password for all users : PassWord-12345-!
