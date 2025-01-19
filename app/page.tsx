import UrlShortener from "./components/url-shortener";


export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto_auto] items-start justify-items-center min-h-[50vh] p-4 pt-8 gap-4 sm:p-12 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <UrlShortener></UrlShortener>
      </main>
    </div>
  );
}
