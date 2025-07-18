import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto px-5">
        <div className="flex h-[80px] items-center gap-4">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-foreground hover:text-muted-foreground flex items-center gap-2.5 text-lg font-medium transition-colors"
            >
              <Image src="/logo.png" alt="MusicGPT" width={32} height={32} />
              <div className="flex items-center gap-2">
                MusicGPT
                <div className="rounded-md border border-white px-2 py-0.5 text-xs">
                  Demo
                </div>
              </div>
            </Link>
          </div>

          <nav className="menu-lists flex text-base font-medium text-white">
            <Link
              href="/"
              className="active rounded-md px-4 py-2 text-base leading-6 font-medium tracking-wider opacity-50 transition-colors hover:opacity-100"
            >
              Create
            </Link>
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-base leading-6 font-medium tracking-wider opacity-50 transition-colors hover:opacity-100"
            >
              Discover
            </Link>
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-base leading-6 font-medium tracking-wider opacity-50 transition-colors hover:opacity-100"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
