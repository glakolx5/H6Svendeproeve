import Link from "next/link";
import Image from 'next/image'
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";

export default async function Home() {

  const data = await getData();

  return (
    <main className="container mx-auto py-12 space-y-8">

      <div className="grid grid-cols-1 my-10 justify-items-center">

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Inuit-Iglo.gl
        </h1>

        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold first:mt-3 pt-4">
          Here are some houses or cabins you can rent
        </h2>

      </div>

      <div className="grid grid-cols-4 gap-8">

        {data.map((datas: any) => (
          <div key={datas.id} className="border-4 p-8 rounded-xl bg-slate-300 dark:bg-gray-900">
            <Link href={datas.id}>

              <div className="flex justify-between mx-4 mb-2">
                <Label className="text-lg font-bold">Town:</Label>
                <Label className="text-lg font-bold">{datas.town}</Label>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mx-4 mb-2">
                <Label className="text-lg font-bold">Price:</Label>
                <Label className="text-lg font-bold">{datas.price}</Label>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mx-4 mb-2 ">

                <Label className="text-sm font-bold">from {new Date(datas.dateFrom).toLocaleString('da-DK', {
                  //year: '2-digit',
                  month: 'short',
                  day: 'numeric'
                })}</Label>

                <Label className=" text-sm font-bold ">to {new Date(datas.dateTo).toLocaleString('da-DK', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric'
                })}</Label>
              </div>

              <Separator className="my-4" />

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