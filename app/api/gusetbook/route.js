import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .order('created_at', {ascending : false})

    if (error) return Response.json({ errror: error.message }, { status: 500 })
      return Response.json({data})
}

export async function POST(req) {
  const body = await req.json()
  const { name, message } = body

  if (!name || !message) {
    return Response.json({ errror: "Harus ada nama dan pesan" }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('message')
    .insert([{name, message}])
  
  if (error) return Response.json({ errror: error.message }, { status: 500 })
    return Response.json({data})

}