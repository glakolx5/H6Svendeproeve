import { auth } from "../../auth"
import { redirect } from "next/navigation";

export default async function RegistedPage() {
    const session = await auth()
    if (session) {
        redirect("/")
    }
    return (
        <main className='container mx-auto py-12 space-y-8'>
            <div className="grid justify-items-center cols-y-1">
                <h2 className="scroll-m-20  pb-2 text-3xl font-semibold first:mt-3 pt-4">
                    Thank you for registering
                </h2>
            </div>
        </main>
    )
}