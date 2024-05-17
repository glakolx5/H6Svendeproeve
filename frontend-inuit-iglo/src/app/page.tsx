import Link from "next/link";
import Image from 'next/image'

export default async function Home() {
  const data = await getData();
  return (
    <main>
      <div className=" underline">
        Hello world!
      </div>

      <Link href={'/register-house'} className=" hover:underline">
        Register house
      </Link>

      <div>
        <h1>
          Home webapi fetch
        </h1>
        <div>
          <Image
            src='http://localhost:4646/images/2024/05/17/884-1270x1270.jpg'
            width={500}
            height={500}
            alt="picture of the house"
          />

          <Image
            src='http://localhost:4646/images/2024/05/17/853-536x354.jpg'
            width={500}
            height={500}
            alt="picture of the house"
          />
        </div>

        <ul>
          {data.map((datas: any) => (
            <li key={datas.id} className=" py-6">
              <div className="">
                Town : {datas.town}
              </div>
              <div>
                Price : {datas.price}
              </div>
            </li>
          ))}
        </ul>
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