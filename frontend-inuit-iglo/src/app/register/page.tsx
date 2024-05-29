import { redirect } from 'next/navigation'
import { auth } from "../auth"

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { createUser } from './actions';


export default async function Register() {

    const session = await auth()
    if (session) {
        redirect("/")
    }

    return (
        <main className='container mx-auto py-12 space-y-8'>
            <form action={createUser}>
                <div className='grid grid-cols-1 gap-5'>

                    <Label htmlFor="email" className=' font-bold text-1xl'>Email:</Label>
                    <Input name="email" type='email' className=" text-1xl" />

                    <Label htmlFor="password" className=' font-bold text-1xl'>Password</Label>
                    <Input name="password" type='password' className="text-1xl" />

                    <Label htmlFor="password_confirm" className=' font-bold text-1xl'>Password confirm</Label>
                    <Input name="password_confirm" type='password' className="text-1xl" />

                    <Button className=''>Register</Button>

                </div>
            </form>
        </main>
    )
}