var express = require('express');
const fs = require('fs');
var router = express.Router();
const { Octokit } = require('@octokit/rest');
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




/* GET users listing. */
router.get('/', async(req, res, next) => {
  result = await getContents();
  res.send(JSON.stringify(result));
  //res.setHeader('Content-Type', 'application/json');
  
  //res.json(result);
    
});

module.exports = router;
