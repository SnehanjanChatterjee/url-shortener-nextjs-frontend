"use client";

import { LogOut } from "lucide-react";

export default function Logout() {
    const handleLogout = async () => {
        console.log("Inside LogOut, clearing localStorage for userId: ", localStorage.getItem("userId"));
        localStorage.removeItem("userId"); // Runs in the browser

        // Call the API route instead of signOut()
        await fetch("/api/auth/signout", { method: "POST" });

        // Reload the page to reflect logout
        window.location.href = "/";
    };

    return (
        <button
            className="flex items-center h-4 p-2 w-full rounded-md"
            onClick={handleLogout}
        >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
        </button>
    );
}
