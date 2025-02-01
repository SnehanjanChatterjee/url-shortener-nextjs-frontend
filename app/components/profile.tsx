import { auth } from "@/auth"
import Login from "@/app/components/login";
import Logout from "@/app/components/logout";

export default async function Profile() {
    const session = await auth();
    console.log("session: ", session)
    const user = session?.user;

    return (
        <div className="fixed top-4 right-4 z-50">
            {user ? (
                <>
                    <h1>Hello</h1>
                    <h2>Name: {user.name}</h2>
                    <h3>Email: {user.email}</h3>
                    <h3>Image: </h3> <img src={user.image} />
                    <Logout />
                </>
            ) : (
                <Login providerName="google" />
            )}
        </div>
    );
}