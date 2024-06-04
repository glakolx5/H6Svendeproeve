
import { Suspense } from "react";
import Search from "./components/search";
import { HouseCard } from "./house-card";
import WelcomeItem from "./welcome-item";

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
      <WelcomeItem />

      <div className="grid justify-items-center cols-y-1">
        <Search placeholder="Search by town"></Search>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <Suspense fallback={"loading ..."}>
          {
            query
              ?
              searches.map((searche: any) => (
                <HouseCard key={searche.id} datas={searche} />))
              :
              data.map((datas: any) => (
                <HouseCard key={datas.id} datas={datas} />))
          }
        </Suspense>
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
  if (!query) return

  const webapi = "http://localhost:5033";
  const endpoint = "/api/House/search/"

  const fulllink = `${webapi}${endpoint}${query}`

  const res = await fetch(fulllink, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('failed to fetch data')
  }

  return res.json();
}


