import {signIn} from "@/auth";
import {LogIn} from "lucide-react";
import {LoginProps} from "@/app/interfaces/UrlShortenerInterfaces";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Login({providerName}: LoginProps) {
    return (
        <form
            action={async () => {
                "use server"
                // await signIn(providerName)
                await signIn() // If you don't give the provider name, AuthJS will route to default sign in page that will have the list of all providers added in auth.ts
            }}
        >
            <button
                type="submit"
                className="btn btn-primary flex items-center gap-2 px-4 py-2"
            >
                <LogIn className="h-4 w-4" />
                Sign In
            </button>
        </form>
    );
}
