import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

const navItems = ["Atelier", "Studio", "Bibliothèque", "Compte"];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <aside className="flex w-60 flex-col bg-zinc-900 px-4 py-6 text-zinc-100">
        <span className="mb-8 px-2 text-lg font-semibold text-white">
          AI Image SaaS
        </span>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <span
              key={item}
              className="cursor-default rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-zinc-800 pt-4">
          <span className="truncate px-3 text-xs text-zinc-500">
            {user.email}
          </span>
          <form action={logout}>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white">
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="flex flex-1 flex-col bg-zinc-50 p-8 dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
