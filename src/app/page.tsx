import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div className="flex flex-col">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="mt-4 font-bold text-4xl tracking-tight">
          Create Next App
        </h1>
      </div>
    </div>
  );
}
