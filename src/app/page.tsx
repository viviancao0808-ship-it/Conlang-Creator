import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-xl w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Conlang Creator</h1>
        <p className="mb-8 text-center text-lg text-gray-700">
          Use AI to help you design your own language for fun with family and friends!<br />
          Click start to begin your conlang journey.
        </p>
        <Link href="/create" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Start
        </Link>
      </div>
    </main>
  );
}
