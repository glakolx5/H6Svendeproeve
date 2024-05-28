import { ModeToggle } from "./components/mode-toggle";

import { auth } from "./auth"
import { SignOut } from "./components/auth/sign-out-button";
import { SignIn } from "./components/auth/sign-in-button";

export default async function Header() {

    const session = await auth()

    return (
        <>
            <div>
                <ModeToggle />

                {session ? <SignOut /> : <SignIn />}
            </div>

            <div className="text-white">
                
            </div>
        </>
    )
}