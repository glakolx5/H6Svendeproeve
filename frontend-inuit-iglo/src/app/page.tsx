import Link from "next/link";

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