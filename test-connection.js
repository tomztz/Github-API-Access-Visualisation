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
    console.log(data)
}

getContents();

console.log(getContents());