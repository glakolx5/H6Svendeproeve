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
        <main className="container mx-auto py-12 space-y-8">
            <form action={createHouse}>
                <div className='grid grid-cols-1 gap-5'>

                    <Label htmlFor="town" className="font-bold text-1xl">Town:</Label>
                    <Input name="town" className=" text-1xl" />

                    <Label htmlFor="price" className="font-bold text-1xl">Price:</Label>
                    <Input name="price" className="text-1xl" />

                    <Label htmlFor="imageSrc" className="font-bold text-1xl">Image source:</Label>
                    <Input name="imageSrc" className="text-1xl" />

                    <Label htmlFor="dateFrom" className="font-bold text-1xl">Date From</Label>
                    <Input type='date' name="dateFrom" className="text-1xl" />

                    <Label htmlFor="dateTo" className="font-bold text-1xl">Date To</Label>
                    <Input type='date' name="dateTo" className="text-1xl" />

                    <Button className='hover:underline'>Create house</Button>

                </div>
            </form>
        </main>
    )
}