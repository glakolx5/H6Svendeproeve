import Image from "next/image"

export default async function HouseItem({ params }: { params: { id: string } }) {

    const data = await getData(params.id);

    return (
        <main className="container mx-auto py-12 space-y-8">
            <div>
                <div>
                    id {params.id}
                </div>
                <div className="grid grid-cols-1 border-2 rounded-md">
                    <div className="m-10">
                        <div>
                            {data.id}
                        </div>
                        <div>
                            {data.town}
                        </div>
                        <div>
                            {data.price}
                        </div>
                        <Image src={data.imageSrc}
                            alt="image of house"
                            height={500}
                            width={500}
                        />

                    </div>
                </div>
            </div>
        </main>
    )
}

async function getData(id: any) {
    const webapi = "http://localhost:5033"
    const endpoint = "/api/House";

    const fulllink = `${webapi}${endpoint}/${id}`
    const res = await fetch(fulllink, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('failed to fetch data in id search')
    }
    return res.json();
}