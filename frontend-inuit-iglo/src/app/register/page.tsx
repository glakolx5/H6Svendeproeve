import { redirect } from 'next/navigation'
import Link from "next/link";

import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { createUser } from './actions';


export default function Register() {
    return (
        <main>
            <form action={createUser}>
                <div className='grid grid-cols-1 gap-5'>

                    <Label htmlFor="email">Email:</Label>
                    <Input name="email" type='email' className=" text-black" />

                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type='password' className=" text-black" />

                    <Label htmlFor="password_confirm">Password confirm</Label>
                    <Input name="password_confirm" type='password' className="text-black" />

                    <Button className=''>Register</Button>

                </div>
            </form>
        </main>
    )
}