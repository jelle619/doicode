import Link from "next/link";

export default function Details({data}: {data: any}) {
  
  return (
    <>
      <li>
        <ul>Repository: {data["name"]}</ul>
        <ul>Owner {data["owner"]["login"]}</ul>
        <ul>Visibility: {data["private"] ? "Private" : "Public"}</ul>
        <ul>Issues: {data["open_issues_count"]}</ul>
      </li>
    </>
  )
}