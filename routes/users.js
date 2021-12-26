var express = require('express');
var router = express.Router();
const { Octokit } = require('@octokit/core');
const octokit = new Octokit({
    auth: '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',
});


const owner = 'tomztz';
const repo = 'Java-Projects';
const url =  '/repos/{owner}/{repo}/{path}'; 
const ref =  'heads/master'; 

const getContents = async () => {
    const { data } = await octokit.request({
        owner,
        repo,
        url,
        method: 'GET',
        path: 'contents', // gets the whole repo
    });
    
    return data;
    
}

const getCommits = async () => {
    const { Octokit } = require('@octokit/core');
const octokit = new Octokit({
    auth: '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',
});

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'tomztz',
        repo: 'Java-Projects'
      });
      
      return data;
}

const getTotalCommits = async () =>{
    var data = await getCommits();
    var shaCount = 0;
    arr = JSON.parse(JSON.stringify(data));//json
    arr.map(function(val){
      if(val.sha) {
      shaCount++ 
  }
});
    console.log(shaCount);
    return shaCount;
}

/* GET users listing. */
router.get('/', async(req, res, next) => {
    
  
    //result = await getTotalCommits();
    result =  await getCommits();  
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
   
    //res.send(JSON.stringify(result));
  
  
  
  

    
});

module.exports = {  router : router,
                    commits : getCommits,
                    contents : getContents,
                    number : getTotalCommits}
