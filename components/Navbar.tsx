import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow border border-slate-300 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={180} height={30} />
        </Link>
        <div className="flex gap-5 items-center text-black">
          {session && session?.user ? (
            <>
              <Link href="/article/create" className="flex gap-2">
                <BadgePlus className="size-6" />
                <span className="max-sm:hidden">Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex gap-2">
                  <LogOut className="size-6 text-red-500" />
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
