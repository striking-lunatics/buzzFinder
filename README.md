# Drink Local

An application that helps you find great local beers and breweries!

Either search through a list breweries near you, or search breweries by city and state.   
View brewery details and save your favorites. 
Share where you have been and recommend breweries to friends. Cheers!

### Features

- Search from current location
- Search for brewerys by city
- Observe distance to any brewery
- Brewery details

## Motivation

The motivation behind the creation of this project is to make finding a brewery quick and convienent. 

## Installation

Run the following commands in the command line to get Drink Local up and running.
```
$ git clone https://github.com/striking-lunatics/buzzFinder.git
$ cd buzzFinder
$ npm install
```
Before starting your server be sure to install postcress.app and pgAdmin. This project uses postcress for its database. 

Install postcress.app here - ***http://postgresapp.com***.
Install pgAdmin3 here - ***https://www.pgadmin.org***.

Once postcress.app is installed you should see a small elephant icon in the upper right corner of your desktop. Click it, then click 'open psql'. Doing this will start a psql server on your computer. 

pgAdmin3 is a tool used to view your database in a table format. It is a convienent way to visually refrence the database.

In order to get the databse up and running, run the following commands in the command line.

```
$ createdb buzzFinder 
$ knex migrate:latest 
```

You must name your database 'buzzFinder' as the server will be looking for this name. 

Finally, run
```
$ npm start
```

Open your browser to ***http://localhost:1337*** to view! 

## API Reference 

The api used is in Drink Local is breweryDB.

Refer to ***http://www.brewerydb.com/developers/docs*** for documentation. 

## Style Guide

Please reference ***https://github.com/airbnb/javascript*** for style.

## Contribution Guide

Open up a new branch for fixing bugs and adding new features, remember to use camelCase while naming your branch.

```
git checkout -b fix/yourBugFix
```

```
git checkout -b feature/yourNewFeature
```

## Future Features

Below is a list of features that we at Drink Local would like to see implemented. 

- Authentication via passport-facebook
- Retrieve saved user data and have the option for a user to view their saved breweries
- Give users the option to unlike a brewery 
- Refactor using redux to access data
