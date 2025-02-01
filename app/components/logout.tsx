import { signOut } from "@/auth";
import { LogOut } from "lucide-react"; // Lucide sign-out icon

export default function Logout() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button
                className="flex items-center p-2 w-full rounded-md"
                type="submit"
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
            </button>
        </form>
    );
}
