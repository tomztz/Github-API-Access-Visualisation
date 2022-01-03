# Github-API-Access-Visualisation report
## Introduction
This project’s focus is to be able to create a visualisation of software engineering metrics using the Github API.\
Last year in college, For the module software engineering project 1, I worked on a project from IBM, as a backend developer in a group of 4. I measured some software engineering metrics of our team, by looking at the number of commits in the repositories Including:\
* The change in number of commits during April.
* Each member’s number of commits over the total commits.

And created visualization for both.\
Measured repository link: https://github.com/tomztz/computer-vision-model

## Implementation
![New Microsoft PowerPoint Presentation](https://user-images.githubusercontent.com/73280812/147859172-37647822-b07f-4224-9332-4c4a1ae78dc1.jpg)
The system works as follow: Firstly, node will make a http request to the GitHub v3 api, and Github would give back information as JSON. Secondly, node will send the necessary data either in JSON or csv to response at localhost:3001/users and react/d3 will make an http request to localhost:3001/users. Finally, the data will be processed and be able to visualise at localhost:3000 or index.html.

## Currently supported functionalities
### backend(users.js)
* [x] Get all contents from a github repository (getContents())
* [x] Get and count all commits from a github repository (getCommits(),getTotalCommits())
* [x] Get and count all commits from start to end date (getCommitsByDate(),getTotalCommitsByDate())
* [x] Get and count all commits by a contributor in a github repository (getCommitsByUser(),getTotalCommitsByUser())
* [x] Send JSON result from github api to localhost:3001/users
* [x] Send csv to localhost:3001/users
* [x] Unit test with jest
### frontend(index.js,index.html)
* [x] Fetch data from localhost:3001/users
* [x] Produce a line chart from fetched data at localhost:3000
* [x] Produce a pie chart from fetched data at index.html
* [x] Unit test with jest   
## Getting started
1. Clone the repository
2. Make sure [Node.js](https://nodejs.org/) is installed on PC.
3. Navigate into backend/routes and substitute with your token in users.js.\
    token:

    `const octokit = new Octokit({
        auth: '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', //substitute with your token
    });`
#### Output JSON from Github api on response
1. Edit contents in router.get in users.js 
2. WARNING: please make sure that your only sending one response each time, comment out unused code which are sending to response
3. Uncomment: \
   `/*
     var result = await getCommits();    
     res.send(JSON.stringify(result));
     */`
4. Make sure you are in the directory backend and then run command:\
   `npm start`
5. Open browser and type `localhost:3001/users`
6. In this case outputs all the commits from the repository:
![Screenshot 2022-01-01 204840](https://user-images.githubusercontent.com/73280812/147859921-17246013-f4d0-4f9a-a8d1-b1840f22e80f.png)

#### Line chart showing the number of commits in April,2021
1. Open two terminals
2. For the first Terminal: edit contents of routers.get in users.js and make sure code from ` var result1 = await getTotalCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');` to `fs.writeFileSync("data.csv", csv);
    res.sendFile("C:/Github-API-Access-Visualisation/backend/data.csv");` are uncommented. Also make sure other code that are trying to send to responses are commented out.
3. change `res.sendFile("C:/Github-API-Access-Visualisation/backend/data.csv");` to your local path where the csv file is present if necessary.
4. Make sure you are in directory backend and run command:`npm start`
5. For the second Terminal: Nevagate to directory frontend.
6. run command:`npm start`
7. Wait for the browser to open a page at http://localhost:3000
8. Bellow is the output:
<img width="902" alt="Screenshot 2022-01-03 210034" src="https://user-images.githubusercontent.com/73280812/147980147-f81a2b09-fe71-4b8a-b28f-b557062e5db3.png">


#### Pie chart showing each members commits over total commits
1. Go to backend/routes/users.js and edit contents of routers.get, make sure code from `var result = await getTotalCommits();` to `fs.writeFileSync("percentages.csv", csvForPie);res.sendFile("C:/Github-API-Access-Visualisation/backend/percentages.csv");` are uncommented. Also make sure other code that are trying to send to responses are commented out
2. Change `res.sendFile("C:/Github-API-Access-Visualisation/backend/percentages.csv");` to your local path where the csv file is present if necessary.   
3. Nevagate to directory backend 
4. run command: `npm start`
4. open index.html at fronend/src in browser
5. Bellow is the output:
![Screenshot 2022-01-01 212415](https://user-images.githubusercontent.com/73280812/147860463-38229d9e-3d77-4021-85d0-f332789b3b0b.png)

#### Unit test
##### backend:
`cd backend`

`npm run test`

##### backend:
`cd frontend`

`npm run test`


## Technology used

### Frontend

* React.js
* d3.js
* npm
* Html
* Css
* jest

## Backend
* Node.js
* Express.js
* octokit.js
* npm
* jest

