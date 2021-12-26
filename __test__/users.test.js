const methods = require('../routes/users.js');
const getCommits = methods.commits;
const getTotalCommits = methods.number;
const getContents = methods.contents;

describe("POST /users", () => {
    global.Headers = ()=>{'Content-Type', 'application/json'}
    describe("Test getCommits", () => {
  
      test("expect JSON with string commiter", async () => {
        
        const result = await getCommits();
        const resToString = JSON.stringify(result);
        expect(resToString).toContain("committer");
      })
      test("expect JSON with string author", async () => {
        const result = await getCommits();
        const resToString = JSON.stringify(result);
        expect(resToString).toContain("author");
      })
      test("expect JSON with string node_id", async () => {
        const result = await getCommits();
        const resToString = JSON.stringify(result);
        expect(resToString).toContain("node_id");
      })
      test("expect JSON with string commit", async () => {
        const result = await getCommits();
        const resToString = JSON.stringify(result);
        expect(resToString).toContain("commit");
      })
    })
    describe("Test getContents", () => {
  
        test("expect JSON with string name", async () => {
          
          const result = await getContents();
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("name");
        })
        test("expect JSON with string url", async () => {
          const result = await getContents();
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("url");
        })
        test("expect JSON with string path", async () => {
          const result = await getContents();
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("path");
        })
        test("expect JSON with string links", async () => {
          const result = await getContents();
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("links");
        })
      })

    describe("Test getTotalCommits", () => {
  
        test("expect 22 commits in tested repo", async () => {
          
          const result = await getTotalCommits()
          expect(result==22);
        })
        
      })
})