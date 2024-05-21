import Link from "next/link";
import Image from 'next/image'

export default async function Home() {
  const data = await getData();
  
  return (
    <main className="flex justify-center items-center">
      <div className="">
        <div className=" underline">
          Hello world!
        </div>

        <Link href={'/register-house'} className=" hover:underline">
          Register house
        </Link>
        <h1 className="">
          Home webapi fetch
        </h1>


        <div className="">
          <div className="pt-10">
            __ dynamic starts here __
          </div>
          <div className="pt-12"></div>
          <ul>
            {data.map((datas: any) => (

              <li key={datas.id} className="py-5">
                <Link href={datas.id}>
                  <div className=" border-2 rounded-md">
                    <div className="m-10">
                      <div className="">
                        Town : {datas.town}
                      </div>
                      <div>
                        Price : {datas.price}
                      </div>
                    </div>
                    <div className="m-10">
                      <Image
                        src={datas.imageSrc}
                        width={500}
                        height={500}
                        alt="picture of the house"
                      />
                    </div>

                  </div>
                </Link>
              </li>


            ))}

          </ul>

        </div>
      </div>
    </main>
  );
}

async function getData() {
  const webapi = process.env.WEB_API_HOST;
  const endpoint = process.env.ENDPOINT_HOUSE;

  const fulllink = `${webapi}${endpoint}`
  const res = await fetch(fulllink, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json();
}