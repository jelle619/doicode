import Details from "./details"

export default function Repository({ params }: { params: { owner: string, repo: string } }) {
  return (
    <>
      <Details owner={params.owner} repo={params.repo} />
    </>
  )
}