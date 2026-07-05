import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 items-center justify-center text-zinc-500 dark:text-zinc-400">
      Connecté en tant que {user?.email} — reste du dashboard à venir.
    </div>
  );
}
