# RAPP - Research and Projects Portal

This capstone project is meant to store, orgnaise, and display a collection of student projects in the UNT computer science department. The user interface is a web-app written in React with a REST api for the database of projects.

The current live server is hosted at <http://10.144.192.198/>
**You must be connected to the UNT VPN to access this server!**

## Sponsors and Related People

This information is current as of the end of the Spring 2021 semester. All contacts are those used by the _Organ Harvesters_ Spring 2021 capstone team. Information may have changed.

**Project Sponsor:**
Dr. Mark Albert - <mark.albert@unt.edu>

**Research Assistant:**
Eswar Ajay nimmaluri- <Eswarajaynimmaluri@my.unt.edu>

**Server Management:**
Alejo Ponce (System Administrator) - <alejo.ponce@unt.edu>
Jim Byford (Senior IT Support Manager) - <jim.byford@unt.edu>

## GitHub Repository Fork Structure

```
colton123e / Campd-Capstone                 Original Repo
├─╴ aviously25 / Campd-Capstone             Working Second Revision
│   └─╴banana-pudding / Campd-Capstone      ~~~ YOU ARE HERE ~~~
└─╴prestj / Campd-Capstone                  Broken
```

Feel free to check out the other forks, but the most recent working development is on the current (banana-pudding) fork. When beginning a new semester, please fork off of banana-pudding

## UNT Server Configuration

A production build of the most recent changes to this fork is hosted at the IP address shown above. This is **NOT** accessable outside of the UNT network, so first install and connect to the UNT VPN to access it. More information about connecting to and managing the remote server is detailed in the server management wiki page.

## Starting Local Development

Please note that user login is handled through UNT's LDAP/Active Directory. To log in on a local server, you **must** be connected to the UNT VPN! Your local backend server cannot access UNT's LDAP server without being in the network.

### Installation

1. Clone `banana-pudding / Campd-Capstone`
2. Navigate inside `/path/to/Campd-Capstone/`
3. Run `npm i` to install API/backend server dependencies
4. Navigate inside `/path/to/Campd-Capstone/client/`
5. Run `npm i` to install frontend React app dependencies

### Run Full Project

1. Navigate to `/path/to/Campd-Capstone/`
2. Run `npm run dev` to start the frontend and the backend concurrently

### Run Backend Only

1. Navigate to `/path/to/Campd-Capstone/`
2. Run `node server.js` to start the API server

Optionally, run `nodemon server.js` to continuously restart backend on file changes
_This requires you to install nodemon globally_

### Run Frontend Only

1. Navigate inside `/path/to/Campd-Capstone/client/`
2. Run `npm start` to begin React hot reload server

### Build Production Frontend

1. Navigate inside `/path/to/Campd-Capstone/client/`
2. Run `npm run build` to create a production build of the React app

### Run Production Server

1. **First create a production build as shown above!**
2. Navigate to `/path/to/Campd-Capstone/`
3. Run `node server.js --env production` to start the API server using the production build
