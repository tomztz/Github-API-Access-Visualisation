# Github-API-Access-Visualisation report

## Getting started
1. Clone the repository
2. Make sure [Node.js](https://nodejs.org/) is installed on PC.
3. Navigate into routes folder and substitute with your token, username and the repository interested in users.js.\
    token:

    `const octokit = new Octokit({
        auth: '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', //substitute with your token
    });`

    username and repository:\
    `const owner = 'tomztz';   //substitute with your username `\
    `const repo = 'Java-Projects';  //substitte with your repository`
4. Run:\
 `npm start`
5. View results via browser:\
`localhost:3000/users`


 
## Sample outputs
 
 <img width="479" alt="Screenshot 2021-12-20 200012" src="https://user-images.githubusercontent.com/73280812/146825615-cb9e95d9-aec0-48b1-9ffa-e2c60bdce937.png">
 
 ![Screenshot 2021-12-22 013110](https://user-images.githubusercontent.com/73280812/147019880-6684f701-5b52-45ca-8f4e-ac85c78d9378.png)

## Technology used

### Frontend

React.js\
d3

## Backend
Node.js\
Express.js\
octokit.js
