var express = require('express');
var router = express.Router();
const { Octokit } = require('@octokit/core');
const fs = require('fs');
const csv = require('csv-parser');
const octokit = new Octokit({
    auth: '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',
});


const owner = 'tomztz';
const repo = 'computer-vision-model';
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
    
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=100', {
        owner,
        repo
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
    
    return shaCount;
}

const getCommitsByDate = async(startDate,endDate) =>{
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=100&since=${startDate}&until=${endDate}', {
        owner,
        repo,
        startDate,
        endDate
      });
      return data;
}

const getTotalCommitsByDate = async(startDate,endDate) =>{
    var data = await getCommitsByDate(startDate,endDate);
    var count = 0;
    arr = JSON.parse(JSON.stringify(data));//json
    arr.map(function(val){
      if(val.sha) {
      count++ 
  }
});
    
    return count;
}
/* GET users listing. */
router.get('/', async(req, res, next) => {  
    
    //var result = await getTotalCommits(); 
    var result1 = await getTotalCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
    var result2 = await getTotalCommitsByDate('2021-04-05T00:00:00Z','2021-04-10T23:59:59Z');
    var result3 = await getTotalCommitsByDate('2021-04-10T00:00:00Z','2021-04-15T23:59:59Z');
    var result4 = await getTotalCommitsByDate('2021-04-15T00:00:00Z','2021-04-20T23:59:59Z');
    var result5 = await getTotalCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
    
    //res.send("Total commits are "+result);
    var arr = [{//totalCommits : result}
        date:'01/04/2021',value: result1},
       {date:'05/04/2021',value : result2},
       {date:'10/04/2021',value : result3},
       {date:'15/04/2021',value : result4},
       {date:'20/04/2021',value : result5}
       ]; 
       
    res.setHeader('Content-Type', 'application/json');
    res.json(arr);
    
    var csv = "Date,Commits\r\n"+arr[0].date+","+arr[0].value+"\r\n"+arr[1].date+","+arr[1].value
    +"\r\n"+arr[2].date+","+arr[2].value+"\r\n"+arr[3].date+","+arr[3].value+
    "\r\n"+arr[4].date+","+arr[4].value;


    fs.writeFileSync("data.csv", csv);
    //res.send(JSON.stringify(result));
    
});

module.exports = {  router : router,
                    commits : getCommits,
                    contents : getContents,
                    number : getTotalCommits}
