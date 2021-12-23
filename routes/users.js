var express = require('express');
const fs = require('fs');
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
    
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: 'tomztz',
        repo: 'Java-Projects'
      });
      console.log(data);
      return data;
}




/* GET users listing. */
router.get('/', async(req, res, next) => {
  result =  await getCommits();
  result1 = await getContents();
  res.send(JSON.stringify(result)).then(res.send(JSON.stringify(result1)));
  //res.setHeader('Content-Type', 'application/json');
  //res.json(result);
  
  

    
});

module.exports = router;
