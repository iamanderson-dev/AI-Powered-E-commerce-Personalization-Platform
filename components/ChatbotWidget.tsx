"use client";

import { useState, useRef, useEffect } from "react";

const QUICK_ACTIONS = [
	{ label: "Track my order", value: "Track my order" },
	{ label: "Refund", value: "Refund" },
	{ label: "Help with checkout", value: "Help with checkout" },
];

/**
 * ChatbotWidget component - Interactive chatbot for customer support
 * Features: Minimizable chat window, message history, typing indicators, quick responses
 */
export default function ChatbotWidget() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ sender: "bot", text: "Hi! How can I help you today?" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const chatEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	// Fetch full chat history if sessionId changes
	useEffect(() => {
		if (!sessionId) return;
		(async () => {
			try {
				const res = await fetch(`/api/chat/session?id=${sessionId}`);
				const data = await res.json();
				if (data.messages) setMessages(data.messages);
			} catch {}
		})();
	}, [sessionId]);

	const sendMessage = async (text: string) => {
		setMessages((msgs) => [...msgs, { sender: "user", text }]);
		setLoading(true);
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: text, sessionId }),
			});
			const data = await res.json();
			setMessages((msgs) => [...msgs, { sender: "bot", text: data.response }]);
			if (data.sessionId) setSessionId(data.sessionId);
		} catch (err) {
			setMessages((msgs) => [
				...msgs,
				{ sender: "bot", text: "Sorry, something went wrong." },
			]);
		}
		setLoading(false);
	};

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		sendMessage(input.trim());
		setInput("");
	};

	return (
		<>
			{/* Floating Chat Icon */}
			<div
				className="fixed bottom-6 right-6 z-50 cursor-pointer bg-primary-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-primary-700"
				onClick={() => setOpen((o) => !o)}
				aria-label="Open chat"
			>
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
			</div>
			{/* Chat Window */}
			{open && (
				<div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
					<div className="bg-primary-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
						<span>Customer Support</span>
						<button
							onClick={() => setOpen(false)}
							className="text-white hover:text-gray-200"
						>
							×
						</button>
					</div>
					<div
						className="flex-1 px-4 py-3 overflow-y-auto"
						style={{ maxHeight: 320 }}
					>
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`mb-2 flex ${
									msg.sender === "user" ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
										msg.sender === "user"
											? "bg-primary-100 text-primary-900"
											: "bg-gray-100 text-gray-900"
									}`}
								>
									{msg.text}
								</div>
							</div>
						))}
						<div ref={chatEndRef} />
					</div>
					<div className="px-4 py-3 border-t bg-gray-50">
						<form onSubmit={handleSend} className="flex gap-2">
							<input
								className="input flex-1"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type your message..."
								disabled={loading}
							/>
							<button
								type="submit"
								className="btn-primary"
								disabled={loading || !input.trim()}
							>
								Send
							</button>
						</form>
						<div className="mt-2 flex gap-2 flex-wrap">
							{QUICK_ACTIONS.map((action) => (
								<button
									key={action.value}
									className="btn btn-xs btn-outline"
									onClick={() => sendMessage(action.value)}
									disabled={loading}
								>
									{action.label}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

