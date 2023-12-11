import Link from "next/link";

export default function Details({data}: {data: any}) {
  
  return (
    <>
      <ul>
        <li>Repository: {data["name"]}</li>
        <li>Owner {data["owner"]["login"]}</li>
        <li>Visibility: {data["private"] ? "Private" : "Public"}</li>
        <li>Issues: {data["open_issues_count"]}</li>
      </ul>
    </>
  )
}