import Image from "next/image";
import FootMeasurementForm from "./components/FootMeasurementForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black sm:px-16">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center mb-12">
            <Image
              className="dark:invert mb-6"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <h1 className="text-3xl font-bold text-center text-black dark:text-zinc-50 mb-2">
              FeetScope
            </h1>
            <p className="text-lg text-center text-zinc-600 dark:text-zinc-400 max-w-xl">
              Find your perfect heel height based on foot measurements and experience
            </p>
          </div>
          
          <FootMeasurementForm />
          
          <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
            <p>Upload your foot photo or enter measurements to calculate safe heel heights</p>
          </div>
        </div>
      </main>
    </div>
  );
}
