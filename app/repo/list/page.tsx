import Navigation from "../../navigation"
import List from "./list"

export default async function Repository() {
  return (
    <>
      <Navigation />
      <h1>Repositorylijst</h1>
      <List />
    </>
  )
}