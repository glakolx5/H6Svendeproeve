import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export function HouseCard({datas} : { datas : any}) {
    return (
        <div key={datas.id} className="border-2 p-8 rounded-xl  bg-primary dark:bg-gray-900">
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
    )
}