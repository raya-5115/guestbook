"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      router.push("/login");
    } else {
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/guestbook");
    const { data } = await res.json();
    setMessages(data);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin mau hapus pesan ini?");
    if (!confirmed) return;

    await fetch("/api/guestbook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">👨‍💼 Halaman Admin</h1>
      {messages.length === 0 && (
        <p className="text-gray-500">Belum ada pesan.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 border rounded relative bg-white shadow-sm"
          >
            <p className="font-semibold">{msg.name}</p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
            <button
              onClick={() => handleDelete(msg.id)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          router.push("/login");
        }}
        className="mt-6 text-red-500 underline text-sm"
      >
        Logout
      </button>
    </div>
  );
}
