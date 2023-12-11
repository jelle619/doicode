import Image from 'next/image'
import Link from 'next/link';

import { MdHome, MdList } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/authoptions"

export default async function Navigation() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <span className="text-xl">Do I Code</span>
        </div>

        <div className="navbar-center text-sm breadcrumbs">
          <ul>
            <li>
              <Link className="inline-flex gap-1 items-center" href="/">
                <MdHome />
                Home
              </Link>
            </li>
            <li>
              <Link className="inline-flex gap-1 items-center" href="/repo/list">
                <MdList />
                Repositorylijst
              </Link>
            </li>
            <li>
              <span className="inline-flex gap-1 items-center">
                <RiGitRepositoryFill />
                Naam
              </span>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="ml-auto btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full relative">
                <Image fill={true} alt={session.user.name} src={session.user.image} />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><Link href="https://github.com/settings">Instellingen</Link></li>
              <li><Link href="">Uitloggen</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}