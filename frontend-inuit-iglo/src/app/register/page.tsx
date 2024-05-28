import { redirect } from 'next/navigation'
import Link from "next/link";

export default function Register() {
    return (
        <main>
            <div>
                Register house page
            </div>

            <div>
                <Link href={'/'} className="hover:underline">Home</Link>
            </div>

            <div>
                <form action={async (formData: FormData) => {
                    "use server";

                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;
                    const password_confirm = formData.get("password_confirm") as string;



                    var data = {
                        email: email,
                        password: password,
                        password_confirm: password_confirm
                    }



                    if (data["password"] !== data["password_confirm"]) {
                        console.log("not same password")
                    }
                    else {

                        const JSONData = JSON.stringify({ email, password });

                        console.log(JSONData)
                        const fulllink = 'http://localhost:5033/register'
                        const response = await fetch(fulllink,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSONData

                            }
                        );

                        const result = response.status
                        console.log(result)
                        if (result != 200) {
                            console.log("error in the registering")
                        }
                        if (result == 400) {
                            response.json().then(body => console.log(body))

                        }
                        else {

                            console.log("registering complete")
                            redirect("/register/registered")
                        }

                    }

                }}>

                    <div className='grid grid-cols-1 gap-5'>
                        <label htmlFor="email">Email:</label>
                        <input name="email" type='email' className=" text-black" />

                        <label htmlFor="password">Password</label>
                        <input name="password" type='password' className=" text-black" />

                        <label htmlFor="password_confirm">Password confirm</label>
                        <input name="password_confirm" type='password' className="text-black" />

                        <button className='hover:underline'>Register</button>
                    </div>

                </form>
            </div>
        </main>
    )
}