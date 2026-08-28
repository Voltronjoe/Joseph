import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Send, User, Bot, AlertCircle, Info, ThumbsUp, ThumbsDown, Copy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  sources?: string[];
  timestamp: string;
}

export function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("q");
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, [location.search]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.chat(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.content,
        sources: response.sources,
        timestamp: response.timestamp,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950 md:mx-auto md:max-w-4xl md:border-x md:border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 px-4 backdrop-blur-md">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">New Conversation</h2>
        <div className="flex gap-2">
          <button className="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Bot className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">How I fit help you today?</h3>
            <p className="mt-2 max-w-sm text-sm">Ask about places, verified news, or general Nigerian knowledge.</p>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    msg.role === "user" ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" : "bg-emerald-600 text-white"
                  )}>
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "flex max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3",
                    msg.role === "user" 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                      : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm"
                  )}>
                    <div className="prose prose-slate prose-sm leading-relaxed">
                      {msg.content}
                    </div>
                    
                    {/* Sources Indicator */}
                    {msg.role === "ai" && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1 rounded-xl bg-slate-50 dark:bg-slate-900 p-2 text-xs text-slate-600 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-800">
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Info className="h-3.5 w-3.5" />
                          Sources
                        </div>
                        <ul className="list-inside list-disc">
                          {msg.sources.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* AI Actions */}
                    {msg.role === "ai" && (
                      <div className="mt-1 flex items-center gap-1 text-slate-400">
                        <button className="rounded p-1 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400" title="Copy">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400" title="Helpful">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button className="rounded p-1 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400" title="Not helpful">
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl bg-white dark:bg-slate-950 px-4 py-4 ring-1 ring-slate-200 dark:ring-slate-800">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-end overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-emerald-500"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
              }
            }}
            placeholder="Ask a question..."
            className="max-h-32 min-h-[56px] w-full resize-none bg-transparent py-4 pl-4 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 text-center text-xs text-slate-400">
          NaijaMind AI can make mistakes. Verify important information.
        </div>
      </div>
    </div>
  );
}
