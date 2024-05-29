import Link from "next/link";
import Image from 'next/image'


export default async function Home() {

  const data = await getData();

  return (
    <main className="container mx-auto py-12 space-y-8">
        <div className="pt-10">
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
                      <div>
                        Date from : {new Date(datas.dateFrom).toLocaleString('da-DK', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="">
                        Date to: {new Date(datas.dateTo).toLocaleString('da-DK', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="m-10">
                      <Image
                        src={datas.imageSrc}
                        height={500}
                        width={500}
                        alt="picture of the house"
                      />
                    </div>

                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
    </main>
  );
}

async function getData() {
  const webapi = "http://localhost:5033";
  const endpoint = "/api/House";

  const fulllink = `${webapi}${endpoint}`
  const res = await fetch(fulllink, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json();
}