import { auth, signIn, signOut} from "@/auth"

export default async function SignIn() {
    const session = await auth();
    console.log("session: ", session)
    const user = session?.user;
    return user ? (
            <>
                <h1>Hello</h1>
                <h2>Name: {user.name}</h2>
                <h3>Email: {user.email}</h3>
                <h3>Image: </h3> <img src={user.image} />
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <button className="btn btn-primary" type="submit">Sign Out</button>
                </form>
            </>
        ) : (
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button className="btn btn-primary" type="submit">Sign in with Google</button>
            </form>
        )
}