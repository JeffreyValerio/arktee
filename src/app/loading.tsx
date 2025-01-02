import { Logo } from "@/components";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="absolute top-0 w-screen z-50 h-screen flex flex-col justify-center items-center bg-black/90">

            <div className="animate-pulse mb-4">
                <Logo />
            </div>

            <p>Cargando...</p>
        </div>
    )
} 