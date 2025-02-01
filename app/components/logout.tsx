import {signOut} from "@/auth";

export default function Logout() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className="btn btn-primary" type="submit">Sign Out</button>
        </form>
    );
}
