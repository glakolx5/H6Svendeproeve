import Search from "./components/search";
import { HouseCard } from "./house-card";

export default async function Home({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {

  const data = await getData();


  const query = searchParams?.query || ''

  const searches = await getSearch(query)

 

  return (
    <main className="container mx-auto py-12 space-y-8">
      <div className="grid grid-cols-1 my-10 justify-items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Inuit-Iglo.gl
        </h1>
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold first:mt-3 pt-4">
          Here are some houses or cabins you can rent
        </h2>
        <Search placeholder="Search by town"></Search>
      </div>
      <div className="grid grid-cols-4 gap-8">

        {query ? searches.map((searche: any) => (
          <HouseCard key={searche.id} datas={searche}/>
        )) : data.map((datas: any) => (
          <HouseCard key={datas.id} datas={datas} />))}

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

async function getSearch(query: any) {
  if(!query) return

  const webapi = "http://localhost:5033";
  const endpoint = "/api/House/search/"

  const fulllink = `${webapi}${endpoint}${query}`

  const res = await fetch(fulllink, { cache: 'no-store' });

  console.log(res)
  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json();
}