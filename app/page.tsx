import UrlShortener from "./components/url-shortener";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    return (
        <div className="grid grid-rows-[1fr_auto_auto] items-start justify-items-center min-h-[50vh] p-4 pt-8 gap-4 sm:p-12 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
              {session ? (
                  <UrlShortener />
              ) : (
                  <div className="text-center w-full">
                      <h2 className="text-2xl font-bold  animate-bounce">
                          {/*Log in to shorten your URLs! 🚀*/}
                          Could you BE any more ready to shorten some links? 😎
                      </h2>
                      <p className="mt-2 text-xl animate-pulse">
                          {/*Don&#39;t miss out on the fun, log in and get started!*/}
                          We’ll be there for you… just click login! 🚀
                      </p>
                  </div>
              )}
          </main>
        </div>
    );
}
