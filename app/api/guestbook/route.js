import { supabase } from "../../../lib/supabase.js";

export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const { name, message } = body;

  if (!name || !message) {
    return Response.json(
      { error: "Harus ada nama dan pesan" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name, message }]);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data });
}
