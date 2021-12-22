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
    console.log(data);
    
    fs.writeFile('./commits.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!')});
}




/* GET users listing. */
router.get('/', function(req, res, next) {
    
    
    fs.readFile('./commits.json', function read(err, data) {
        if (err) {
            throw err;
        }
        res.send(data + 'my data')
    });
});

module.exports = router;
