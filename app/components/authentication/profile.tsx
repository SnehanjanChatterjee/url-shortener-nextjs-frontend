import { auth } from "@/auth";
import Login from "@/app/components/authentication/login";
import Logout from "@/app/components/authentication/logout";

export default async function Profile() {
    const session = await auth();
    const user = session?.user;
    // console.log("session: ", session);
    // console.log("user.id: ", user?.id);

    return (
        <div className="fixed top-4 right-4 z-50">
            {user ? (
                <>
                    <div className="flex items-center gap-6 pr-12">
                        <h1 className="text-l font-bold">
                            Hey, {user.name}, How you doin&#39;? 😎
                        </h1>

                        <details className="dropdown">
                            <summary className="m-0 p-0 list-none cursor-pointer">
                                <div className="avatar transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user.image ?? "/default-avatar.png"} alt="User Avatar" />
                                    </div>
                                </div>
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow-md mt-2 absolute right-0">
                                <li>
                                    <Logout />
                                </li>
                            </ul>
                        </details>
                    </div>
                </>
            ) : (
                <Login providerName="google" />
            )}
        </div>
    );
}
