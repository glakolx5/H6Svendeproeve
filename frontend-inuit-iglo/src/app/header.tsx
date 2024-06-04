import { ModeToggle } from "./components/mode-toggle";
import Image from 'next/image'

import { auth } from "./auth"
import { SignOut } from "./components/auth/sign-out-button";
import { SignIn } from "./components/auth/sign-in-button";
import Link from "next/link";
import { Label } from "./components/ui/label";

export default async function Header() {

    const session = await auth()
    const username = session?.user?.email

    return (
        <div className=" bg-slate-400 py-4 sticky top-0 z-50">
            <div className=" container flex justify-between items-center">
                <div className=" flex items-center gap-12">

                    <Link href={"/"} className="flex items-center gap-2 text-black font-bold text-3xl">
                        <Image src="/logo.png" width={50} height={50} alt="logo" />
                        Inuit-Iglo.gl
                    </Link>

                    <div >
                        {session ? <> </> : <Link href={"/register"} className="flex items-center gap-1 hover:underline font-bold">
                            Register
                        </Link>}
                    </div>

                    <div >
                        {session ? <Link href={"/register-house"} className="flex items-center gap-1 hover:underline font-bold">
                            Register house</Link> : <></>}
                    </div>

                </div>
                <div className="flex items-center gap-4">
                    <Label className="font-semibold">
                        {session?.user?.email}
                    </Label>
                    <div>
                        <ModeToggle />
                    </div>
                    <div>
                        {session ? <SignOut /> : <SignIn />}
                    </div>
                </div>
            </div>
        </div>

    )
}