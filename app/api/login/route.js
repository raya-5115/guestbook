export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return Response.json({ success: true });
  }
  return Response.json(
    { success: false, message: "Login gagal!" },
    { status: 401 }
  );
}
