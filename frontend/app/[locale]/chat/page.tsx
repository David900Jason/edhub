"use client";

import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Message = {
    username: string;
    room: string;
    message: string;
    timestamp?: string;
};

export default function ChatPage() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("Anonymous");
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [room, setRoom] = useState("general");
    const [user] = useSessionStorage("user_profile", null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Load username from session
    useEffect(() => {
        if (user && user.full_name) setUsername(user.full_name);
        else setUsername("Anonymous");
    }, [user]);

    // Listen for typing events
    useEffect(() => {
        if (!socket) return;

        socket.on("typing", ({ username: userTyping, isTyping }) => {
            setTypingUsers((prev) => {
                if (isTyping && !prev.includes(userTyping))
                    return [...prev, userTyping];
                if (!isTyping) return prev.filter((u) => u !== userTyping);
                return prev;
            });
        });

        return () => {
            socket.off("typing");
        };
    }, [socket]);

    // Socket connection
    useEffect(() => {
        const socketIo = io("http://localhost:8001");
        setSocket(socketIo);

        socketIo.emit("join_room", room);

        socketIo.on("chat_history", (msgs: Message[]) => setMessages(msgs));
        socketIo.on("chat_message", (msg: Message) =>
            setMessages((prev) => [...prev, msg]),
        );

        return () => {
            socketIo.disconnect();
        };
    }, []);

    // Join new room
    useEffect(() => {
        if (socket) {
            socket.emit("join_room", room);
        }
    }, [room, socket]);

    const sendMessage = () => {
        if (!input.trim() || !socket) return;
        socket.emit("chat_message", { username, room, message: input });
        setInput("");
    };

    // Emit typing
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        if (socket) {
            socket.emit("typing", {
                username,
                room,
                isTyping: e.target.value.length > 0,
            });
        }

        
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl text-blue-700">
                        Multi-Room Chat
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="mt-1 h-6 text-sm text-gray-500">
                        {typingUsers.length > 0 && (
                            <span>
                                {typingUsers.join(", ")}{" "}
                                {typingUsers.length > 1 ? "are" : "is"}{" "}
                                typing...
                            </span>
                        )}
                    </div>

                    {/* Room selector */}
                    <div>
                        <Select
                            value={room}
                            onValueChange={(val) => setRoom(val)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="tech">Tech</SelectItem>
                                <SelectItem value="random">Random</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Chat messages */}
                    <ScrollArea className="flex h-72 flex-col space-y-2 rounded-lg border border-gray-200 p-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`rounded p-2 ${
                                    msg.username === username
                                        ? "self-end bg-blue-100 text-blue-900"
                                        : "bg-gray-200"
                                }`}
                            >
                                <span className="font-semibold">
                                    {msg.username}
                                </span>
                                <span className="ml-2 text-xs text-gray-500">
                                    [
                                    {msg.timestamp
                                        ? new Date(
                                              msg.timestamp,
                                          ).toLocaleTimeString()
                                        : "--:--"}
                                    ]
                                </span>
                                <span className="ml-2">{msg.message}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    {/* Input + send button */}
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={handleTyping}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Type your message..."
                        />
                        <Button
                            onClick={sendMessage}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Send
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
