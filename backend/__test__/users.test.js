const methods = require('../routes/users.js');
const getCommits = methods.commits;
const getTotalCommits = methods.number;
const getContents = methods.contents;
const getCommitsByDate = methods.commitsByDate;
const getTotalCommitsByDate=methods.totalCommitsByDate;
const getCommitsByUsers=methods.commitsByUsers;
const getTotalCommitsByUsers=methods.totalCommitsByUsers;


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

    describe("Test getCommitsByDate from 2021-04-01T00:00:00Z to 2021-04-05T23:59:59Z", () => {
  
        test("expect JSON with string commiter", async () => {
          
          const result = await getCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("committer");
        })
        test("expect JSON with string author", async () => {
          const result = await getCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("author");
        })
        test("expect JSON with string node_id", async () => {
          const result = await getCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("node_id");
        })
        test("expect JSON with string commit", async () => {
          const result = await getCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("commit");
        })
      })
    describe("Test getCommitsByDate from 2021-04-20T00:00:00Z to 2021-04-25T23:59:59Z", () => {
  
        test("expect JSON with string commiter", async () => {
          
          const result = await getCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("committer");
        })
        test("expect JSON with string author", async () => {
          const result = await getCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("author");
        })
        test("expect JSON with string node_id", async () => {
          const result = await getCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("node_id");
        })
        test("expect JSON with string commit", async () => {
          const result = await getCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("commit");
        })
      })  

    describe("Test getTotalCommits", () => {
  
        test("expect 38 commits in tested repo", async () => {
          
          const result = await getTotalCommits()
          expect(result).toEqual(38);
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

    describe("Test getTotalCommitsByDate", () => {
  
        test("expect 1 commit in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByDate('2021-04-01T00:00:00Z','2021-04-05T23:59:59Z');
          expect(result).toEqual(1);
        })

        test("expect 5 commits in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByDate('2021-04-15T00:00:00Z','2021-04-20T23:59:59Z');
          expect(result).toEqual(5);
        })

        test("expect 27 commits in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByDate('2021-04-20T00:00:00Z','2021-04-25T23:59:59Z');
          expect(result).toEqual(27);
        })
        
      })
        
      describe("Test getCommitsByUsers by testing commits by AAjayiB", () => {
  
        test("expect JSON with string commiter", async () => {
          
          const result = await getCommitsByUsers('AAjayiB');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("committer");
        })
        test("expect JSON with string author", async () => {
          const result = await getCommitsByUsers('AAjayiB');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("author");
        })
        test("expect JSON with string node_id", async () => {
          const result = await getCommitsByUsers('AAjayiB');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("node_id");
        })
        test("expect JSON with string commit", async () => {
          const result = await getCommitsByUsers('AAjayiB');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("commit");
        })
      })
      
      describe("Test getCommitsByUsers by testing commits by FrontRowWithJ", () => {
  
        test("expect JSON with string commiter", async () => {
          
          const result = await getCommitsByUsers('FrontRowWithJ');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("committer");
        })
        test("expect JSON with string author", async () => {
          const result = await getCommitsByUsers('FrontRowWithJ');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("author");
        })
        test("expect JSON with string node_id", async () => {
          const result = await getCommitsByUsers('FrontRowWithJ');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("node_id");
        })
        test("expect JSON with string commit", async () => {
          const result = await getCommitsByUsers('FrontRowWithJ');
          const resToString = JSON.stringify(result);
          expect(resToString).toContain("commit");
        })
      }) 
      describe("Test getTotalCommitsByUsers", () => {
  
        test("expect 1 commit in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByUsers('AAjayiB');
          expect(result).toEqual(5);
        })

        test("expect 5 commits in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByUsers('FrontRowWithJ');
          expect(result).toEqual(3);
        })

        test("expect 27 commits in tested repo given by dates", async () => {
          
          const result = await getTotalCommitsByUsers('Alantrivandrum');
          expect(result).toEqual(1);
        })
        
      })
    
    
   
  
        
        
      })
