import Image from 'next/image'
import Options from "./options"

export default async function Home() {
  return (
    <>
      <Image width="512" height="512" src={require('/public/logo.png')} alt=""/>
      <h1>Welkom bij Do I Code!</h1>
      <p>Verkrijg inzicht over je voortgang middels eenvoudig te begrijpen visualisaties. Het is zo simpel als inloggen met een GitHub-account, en het kiezen van een repository.</p>
      <Options/>
    </>
  )
}