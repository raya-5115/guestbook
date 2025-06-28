"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    const res = await fetch("/api/guestbook");
    const { data } = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    setName("");
    setMessage("");
    fetchMessages();
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">📖 GuestBook</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Pesanmu..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </form>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <p className="font-semibold">{msg.name}</p>
            <p>{msg.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
