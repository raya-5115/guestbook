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

  // Jika tidak ada pesan, return error
  if (!message || message.trim() === "") {
    return Response.json(
      { error: "Pesan tidak boleh kosong" },
      { status: 400 }
    );
  }

  // Jika tidak ada nama atau nama kosong, gunakan "Anonym"
  const finalName = !name || name.trim() === "" ? "Anonym" : name.trim();

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name: finalName, message: message.trim() }]);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data }, { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
