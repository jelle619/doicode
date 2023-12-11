import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/authoptions"

import Navigation from "../../../navigation"
import Details from "./details"
import Chart from "./chart"

async function fetchRepository(owner: string, repo: string) {
  const session = await getServerSession(authOptions);

  // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
  const response = await fetch("https://api.github.com/repos/" + owner + "/" + repo, {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json'
    },
  });

  if (!response.ok) {
    // error handling
  }

  const data = await response.json();
  
  return data;
}

async function fetchIssues(owner: string, repo: string) {
  const session = await getServerSession(authOptions);

  // https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
  const response = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/issues?state=all", {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json'
    },
  });

  if (!response.ok) {
    // error handling
  }

  const data = await response.json();

  return data;
}

export default async function Repository({ params }: { params: { owner: string, repo: string } }) {
  const repositoryData = await fetchRepository(params.owner, params.repo);
  const issuesData = await fetchIssues(params.owner, params.repo);
  return (
    <>
      <Navigation />
      <Details data={repositoryData} />
      <Chart data={issuesData} />
    </>
  )
}