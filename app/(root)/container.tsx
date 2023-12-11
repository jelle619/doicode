
import Link from "next/link";

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            backdrop-blur-xl
            bg-white/80
            gap-4
            p-4
            max-h-[100svh]
            lg:w-1/2
            lg:rounded-lg
            lg:p-8
            ">
                {children}
            </div>
        </div>
    )
}