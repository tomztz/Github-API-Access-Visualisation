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

const getCommitsByUsers = async(user)=>{
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=100&author={user}', {
        owner,
        repo ,
        user
      });
      return data;
}

const getTotalCommitsByUsers = async(user) =>{
    var data = await getCommitsByUsers(user);
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
//WARNING: since every request has only one response, please make sure you are sending one res.method
//i.e. commenting out the unwanted parts to avoid sending multiple response.
router.get('/', async(req, res, next) => {  
    //uncomment to check all commits in JSON
/*
    var result = await getCommits();    
    res.send(JSON.stringify(result));*/
//-------------------------------------------------------------------------------------------------    
//The bellow code provides a csv file as data neccessary for the line chart to work
     
    var result1 = await getTotalCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
    var result2 = await getTotalCommitsByDate('2021-04-05T00:00:00Z','2021-04-10T23:59:59Z');
    var result3 = await getTotalCommitsByDate('2021-04-10T00:00:00Z','2021-04-15T23:59:59Z');
    var result4 = await getTotalCommitsByDate('2021-04-15T00:00:00Z','2021-04-20T23:59:59Z');
    var result5 = await getTotalCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
    
    var arr = [{
        date:'04/01/2021',value: result1},
       {date:'04/05/2021',value : result2},
       {date:'04/10/2021',value : result3},
       {date:'04/15/2021',value : result4},
       {date:'04/20/2021',value : result5}
       ];     
    
    
    var csv = "date,commits\r\n"+arr[0].date+","+arr[0].value+"\r\n"+arr[1].date+","+arr[1].value
    +"\r\n"+arr[2].date+","+arr[2].value+"\r\n"+arr[3].date+","+arr[3].value+
    "\r\n"+arr[4].date+","+arr[4].value;


    
    fs.writeFileSync("data.csv", csv);
    res.sendFile("C:/Github-API-Access-Visualisation/backend/data.csv");
 //-----------------------------------------------------------------------------------------   
    //uncomment the below code to see data in JSON formatt
    /*   
    res.setHeader('Content-Type', 'application/json');
    res.json([{
        date:'04/01/2021',value: result1},
       {date:'04/05/2021',value : result2},
       {date:'04/10/2021',value : result3},
       {date:'04/15/2021',value : result4},
       {date:'04/20/2021',value : result5}
       ]);*/
//-------------------------------------------------------------------------------------------------       
    //Uncomment the bellow code to update the csv file which is necessary for the pir chart to work
    /*
    var result = await getTotalCommits();
    var commit1 = await getTotalCommitsByUsers('AAjayiB');
    var perc1 = (commit1/result)*100 ;
    var commit2 = await getTotalCommitsByUsers('tomztz');
    var perc2 = (commit2/result)*100; 
    var commit3 = await getTotalCommitsByUsers('FrontRowWithJ');
    var perc3 = (commit3/result)*100; 
    var commit4 = await getTotalCommitsByUsers('Alantrivandrum');
    var perc4 = (commit4/result)*100;
    
    var csvForPie = "commiter,percent\r\n"+"AAjayiB"+","+perc1+"\r\n"+"tomztz"+","
    +perc2+"\r\n"+"FrontRowWithJ"+","+perc3+"\r\n"+"Alantrivandrum"+","+perc4;

    fs.writeFileSync("percentages.csv", csvForPie);
    res.sendFile("C:/Github-API-Access-Visualisation/backend/percentages.csv");*/
});

module.exports = {  router : router,
                    commits : getCommits,
                    contents : getContents,
                    number : getTotalCommits,
                    commitsByDate: getCommitsByDate,
                    totalCommitsByDate:getTotalCommitsByDate,
                    commitsByUsers: getCommitsByUsers,
                    totalCommitsByUsers:getTotalCommitsByUsers  }
