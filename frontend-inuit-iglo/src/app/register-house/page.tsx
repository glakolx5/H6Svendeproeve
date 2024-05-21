
import { redirect } from 'next/navigation'
import Link from "next/link";

export default function RegisterHouse() {
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
                    const town = formData.get("town") as string;
                    const price = formData.get("price") as string;
                    const imageSrc = formData.get("imageSrc") as string;

                    const data = {
                        town: town,
                        price: price,
                        imageSrc: imageSrc
                    }

                    const JSONData = JSON.stringify(data);

                    const webapi = process.env.WEB_API_HOST;
                    const endpoint = process.env.ENDPOINT_HOUSE;

                    const fulllink = `${webapi}${endpoint}`

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

                    if (result != 200) {
                        console.log("error in the posting images")
                    }
                    else {
                        console.log("register house complete")
                        redirect("/")
                    }
                }}>
                    <div className='grid grid-cols-1 gap-5'>
                        <label htmlFor="town">Town:</label>
                        <input name="town" className=" text-black" />
                        <label htmlFor="price">Price:</label>
                        <input name="price" className=" text-black" />
                        <label htmlFor="imageSrc">Image source:</label>
                        <input name="imageSrc" className="text-black" />
                        <button className='hover:underline'>Create house</button>
                    </div>
                </form>
            </div>
        </main>
    )
}