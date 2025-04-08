import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { MessageCircle, Send, Bot, Clock } from "lucide-react";

const LiveSupport = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatContainerRef = useRef(null);

    // Scroll chat to bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const scrollContainer = chatContainerRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    };

    // Auto-scroll when messages change
    useEffect(() => {
        if (messages.length > 0) {
            // Use setTimeout to ensure DOM has updated
            setTimeout(scrollToBottom, 100);
        }
    }, [messages]);

    // Simulate checking business hours
    useEffect(() => {
        const hour = new Date().getHours();
        setIsOnline(hour >= 9 && hour < 18); // 9 AM to 6 PM
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setNewMessage("");

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                text: isOnline
                    ? "Thank you for your message. An agent will be with you shortly."
                    : "We're currently offline. Please leave a message and we'll get back to you during business hours.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <Card className="overflow-hidden border-border/40">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <h3 className="font-medium">Live Support</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2 h-2 rounded-full ${
                                isOnline ? "bg-green-500" : "bg-yellow-500"
                            }`}
                        />
                        <span className="text-sm text-muted-foreground">
                            {isOnline ? "Online" : "Away"}
                        </span>
                    </div>
                </div>

                {!isChatOpen ? (
                    <div className="text-center py-8">
                        <Bot className="w-12 h-12 mx-auto text-primary/50 mb-4" />
                        <h4 className="font-medium mb-2">Need immediate assistance?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            {isOnline
                                ? "Our support team is online and ready to help!"
                                : "Leave a message and we'll get back to you during business hours."}
                        </p>
                        <Button onClick={() => setIsChatOpen(true)}>Start Chat</Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div 
                            ref={chatContainerRef}
                            className="h-[300px] overflow-y-auto pr-2 scroll-smooth"
                        >
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 mb-4 ${
                                            message.sender === "user" ? "flex-row-reverse" : ""
                                        }`}
                                    >
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage
                                                src={
                                                    message.sender === "user"
                                                        ? "/avatars/user.png"
                                                        : "/avatars/support.png"
                                                }
                                            />
                                            <AvatarFallback>
                                                {message.sender === "user" ? "U" : "S"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`rounded-lg p-3 max-w-[80%] ${
                                                message.sender === "user"
                                                    ? "bg-slate-900 text-white"
                                                    : "bg-slate-100 text-slate-900"
                                            }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                            <span className="text-xs opacity-70 mt-1 block">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>

                        {!isOnline && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>We'll respond during business hours (9 AM - 6 PM)</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LiveSupport; 