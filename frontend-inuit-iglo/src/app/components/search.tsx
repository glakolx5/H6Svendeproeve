"use client"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "./ui/input"

export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('query', term)
        }
        else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 600)

    return (
        <Input className="w-2/3 text-lg h-12"
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
        />
    )
}