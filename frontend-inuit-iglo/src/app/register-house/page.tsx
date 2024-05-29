import { auth } from "../auth"
import { redirect } from 'next/navigation'

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { createHouse } from "./actions";

export default async function RegisterHouse() {
    
    const session = await auth()

    if (!session) {
        redirect("/")
    }

    return (
        <main>
            <form action={createHouse}>
                <div className='grid grid-cols-1 gap-5'>
                    <Label htmlFor="town">Town:</Label>
                    <Input name="town" className=" text-black" />

                    <Label htmlFor="price">Price:</Label>
                    <Input name="price" className=" text-black" />

                    <Label htmlFor="imageSrc">Image source:</Label>
                    <Input name="imageSrc" className="text-black" />

                    <Label htmlFor="dateFrom">Date From</Label>
                    <Input type='date' name="dateFrom" className="text-black" />

                    <Label htmlFor="dateTo">Date To</Label>
                    <Input type='date' name="dateTo" className="text-black" />

                    <Button className='hover:underline'>Create house</Button>
                </div>
            </form>
        </main>
    )
}