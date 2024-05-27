"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
export default function Page() {

    const router = useRouter()
    

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        

        const response = await fetch('http://localhost:5033/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        

        if (response.ok) {
            console.log("you are now logged in")
            response.json().then(body => console.log(body))
           
            //router.push("/register-house")
        }
        else if (response.status == 401) {
            console.log("unauthorized")
        }
        else {
            console.log("you are not logged in")
        }


    }
    return (
        <>
            <div>
                <Link href={'/'} className="hover:underline">Home</Link>
            </div>
            <form onSubmit={handleSubmit} className="text-black">
                <input type="email" name="email" placeholder="Email" required></input>
                <input type="password" name="password" placeholder="Password" required></input>
                <button type="submit" className="text-white">Login</button>
            </form>
        </>
    )
}