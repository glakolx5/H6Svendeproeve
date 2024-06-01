"use client"
import { usePathname, useSearchParams , useRouter} from "next/navigation"

import { Input } from "./ui/input"
import { Label } from "./ui/label" 

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams)

        if(term){
            params.set('query', term)
        }
        else{
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <Label htmlFor="search">
                Search
            </Label>
            <Input 
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }} 
                defaultValue={searchParams.get('query')?.toString()}
                />
            <div>
                Icon
            </div>
        </div>
    )
}