import Link from "next/link";
import Image from 'next/image'
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";

export default async function Home() {

  const data = await getData();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <div className="text-2xl text-">
        welcome to Inuit-Iglo.gl
      </div>
      <div>
        Here are some houses or cabins you can rent
      </div>
      <div className="grid grid-cols-4 gap-8">

        {data.map((datas: any) => (
          <div key={datas.id} className="border-4 p-8 rounded-xl bg-slate-300 dark:bg-gray-900">
            <Link href={datas.id}>

              <div className="flex justify-between mx-4 mb-2">
                <Label className=" font-bold">Town:</Label>
                <Label className=" font-bold">{datas.town}</Label>
              </div>

              <Separator className="my-4"/>

              <div className="flex justify-between mx-4 mb-2">
                <Label className=" font-bold">Price:</Label>
                <Label className=" font-bold">{datas.price}</Label>
              </div>

              <Separator className="my-4"/>

              <div className="flex justify-between mx-4 mb-2">
                <Label className=" font-bold">Date from:</Label>
                <Label className=" font-bold">{new Date(datas.dateFrom).toLocaleString('da-DK', {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric'
                  })}</Label>
              </div>

              <Separator className="my-4"/>

              <div className="flex justify-between mx-4 mb-2">
                <Label className=" font-bold">Date to:</Label>
                <Label className=" font-bold">{new Date(datas.dateTo).toLocaleString('da-DK', {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric'
                  })}</Label>
              </div>

              <Separator className="my-4"/>

              <Image
                src={datas.imageSrc}
                height={500}
                width={500}
                alt="picture of the house"
                className=" rounded-md border-1 shadow-2xl drop-shadow-2xl"
              />
            </Link>
          </div>
        ))}
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