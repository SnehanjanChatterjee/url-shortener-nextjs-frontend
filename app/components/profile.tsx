import { auth } from "@/auth";
import Login from "@/app/components/login";
import Logout from "@/app/components/logout";

export default async function Profile() {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="fixed top-4 right-4 z-50">
            {user ? (
                <>
                    <div className="flex items-center gap-3 pr-12">
                        <h1 className="text-l font-bold">
                            Hey, {user.name}, How you doin&#39;? 😎
                        </h1>

                        <details className="dropdown">
                            <summary className="m-0 p-0 list-none cursor-pointer">
                                <img
                                    src={user.image}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2"
                                />
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow-md mt-2 absolute right-0">
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
