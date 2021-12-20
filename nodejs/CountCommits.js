
const Octokit= require("@octokit/core");

function CommitListComponent() {
  const [commits, setCommits] = useState([]);
  const octokit = new Octokit({ auth: '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' });


  await octokit.request('GET /repos/{tomztz}/{Java-projects}/commits', {
    owner: 'tomztz',
    repo: 'Java-projects'
  });

  useEffect(() => {
    const owner = 'tomztz',
                 repo = 'Java-Projects',
           perPage = 5;

    const fiveMostRecentCommits = await octokit.request(
        `GET /repos/{tomztz}/{Java-Projects}/commits`, { owner, repo, per_page: perPage }
    );

    setCommits(fiveMostRecentCommits);
  }, [])

    return (
      <ul>
        {commits.map(commit => (
          <li key={commit.id}>
            {commit.author.name}: {commit.message}
          </li>
        ))}
      </ul>
    );
}