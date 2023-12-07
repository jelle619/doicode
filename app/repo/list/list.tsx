import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/authoptions"

import Link from "next/link";

export default async function List() {
  const session = await getServerSession(authOptions);
  
  // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
  const response = await fetch("https://api.github.com/user/repos?sort=updated", {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json'
    },
  });

  if (!response.ok) {
    return (
      <p>Er is een fout opgetreden bij het ophalen van je repositories. Controlleer de <Link href="https://www.githubstatus.com/">GitHub server status</Link> en probeer het later opnieuw.</p>
    )
  }

  const data = await response.json();

  return (
    <>
      <li>
        {data.map((repository: any) =>
          (<ul key={repository["id"]}><Link href={"/repo/" + repository["full_name"]}>{repository["name"]}</Link></ul>)
        )}
      </li>
    </>
  )
}