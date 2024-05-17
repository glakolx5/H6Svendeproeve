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

                    const data = {
                        town : town,
                        price : price,
                    }

                    const JSONData = JSON.stringify(data); 
                    console.log(JSONData);

                    const webapi = process.env.WEB_API_HOST;
                    const endpoint = process.env.ENDPOINT_HOUSE;
                  
                    const fulllink = `${webapi}${endpoint}`

                    const response = await fetch(fulllink, 
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                            },
                            body: JSONData
                        
                        }
                    );

                    const result = response.status
                    console.log(result)
                    return result;
                }}>
                    <input name="town" className=" text-black"/>
                    <input name="price" className=" text-black"/>
                    <button>Create house</button>
                </form>
            </div>
        </main>
    )
}