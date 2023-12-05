import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/route"

import Link from "next/link";

export default async function Details({owner, repo}: {owner: string, repo: string}) {
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
    return (
      <p>Er is een fout opgetreden bij het ophalen van je repositories. Controller de <Link href="https://www.githubstatus.com/">GitHub server status</Link> en probeer het later opnieuw.</p>
    )
  }

  const data = await response.json();
  console.log(data);

  return (
    <>
      <li>
        <ul>Naam: {data.name}</ul>
        <ul>Owner: {data.owner.login}</ul>
        { data.description && <ul>Description: {data.description}</ul> }
      </li>
    </>
  )
}