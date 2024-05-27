import Link from "next/link";

export default function RegistedPage() {
    return (
        <div>
            <div>
                <Link href={'/'} className="hover:underline">Home</Link>
            </div>
            <div>
                Thanks for registering!
            </div>
        </div>
    )
}