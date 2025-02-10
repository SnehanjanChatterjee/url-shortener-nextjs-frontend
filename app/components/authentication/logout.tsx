"use client";

import { LogOut } from "lucide-react";
import {Cookies, useCookies} from "next-client-cookies";

export default function Logout() {
    const cookies: Cookies = useCookies();
    const handleLogout = async () => {
        console.log("Inside Logout, clearing cookie for userId: ", cookies.get("userId"));
        cookies.remove("userId"); // Runs in the browser

        // Call the API route instead of signOut()
        await fetch("/api/auth/signout", { method: "POST" });

        // Reload the page to reflect logout
        window.location.href = "/";
    };

    return (
        <div className="w-full">
            <button
                className="flex items-center h-4 p-2 w-full rounded-md"
                onClick={handleLogout}
            >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
            </button>
        </div>
    );
}
