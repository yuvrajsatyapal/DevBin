"use client"

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const demoPaste = {
    id: "demo",
    title: "React Component for API Calls",
    content: `import { useState, useEffect } from 'react';

const DemoPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                const result = await res.json();
                setData(result.slice(0, 5));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                API Data
            </h1>

            <div className="space-y-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="border p-4 rounded-lg"
                    >
                        <h2 className="font-semibold">
                            {item.title}
                        </h2>

                        <p className="text-sm text-gray-600">
                            {item.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemoPage;
`, 
    language : "JavaScript",
    isPublic : true,
    createdAt : new Date(Date.now() - 2 * 60 * 60 * 1000),
    user : {
        id: "demo-user",
        name: "Demo User"
    }
};

export default function DemoPageContents() {
    const [showRaw, setShowRaw] = useState<boolean>(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

    const handleCopyToClipBoard = async () => {
    try {
        await navigator.clipboard.writeText(demoPaste.content);

        console.log("copied");

        setCopiedToClipboard(true);

        toast.success("Copied to clipboard!");

        setTimeout(() => {
            setCopiedToClipboard(false);
        }, 2500);

    } catch (error) {
        console.error(error);

        toast.error("Failed to copy to clipboard");
    }
};

    return(
        <div className="bg-gray-50/50 min-h-screen">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="container flex items-center justify-between mx-auto p-4">
                    <Link className="font-bold text-blue-600 text-xl" href="/">
                        DevBin
                    </Link>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-50 border-yellow-50 text-yellow-700" variant="outline">
                            Demo Mode
                        </Badge>
                        
                        <Button asChild variant="outline">
                            <Link href="/login">
                                Sign Up to Create Your Own
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Demo Notice */}
            <div className="bg-blue-50 border-b border-blue-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex gap-2 items-center justify-center text-blue-800 text-sm">
                        <span>
                            This is a live demo of Paste, Link, & Send! Try the features below
                        </span>

                        <Link
                            className="font-medium underline"
                            href="/login"
                        >
                            Sign up to create your own pastes
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <Card className="max-w-4xl mx-auto w-full">
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                                <CardTitle className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center">
                                    <span className="wrap-break-words">
                                        {/* TODO Put title here */}
                                        {demoPaste.title}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">{demoPaste.language}</Badge>
                                        <Badge>Public</Badge>
                                        <Badge variant="destructive">Demo</Badge>
                                    </div>
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    CreateBy {demoPaste.user.name} - {" "}
                                    {formatDistanceToNow(demoPaste.createdAt, {addSuffix: true})}
                                    " - "
                                    <span className="text-green-600">Never Expires</span>
                                </CardDescription>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                className="sm:text-sm text-xs disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                disabled={copiedToClipboard}
                                onClick={handleCopyToClipBoard}
                                size="sm"
                                variant="outline"
                                >
                                    {copiedToClipboard ? "Copied" : "Copy Code"}
                                </Button>
                                <Button
                                className="sm:text-sm text-xs cursor-pointer"
                                onClick={() => setShowRaw(!showRaw)}
                                size="sm"
                                variant="outline"
                                >
                                    {showRaw ? "Highlighted" : "Raw Text"}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator/>

                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="relative">
                            {showRaw ? (
                                <pre className="bg-gray-50 border font-mono overflow-x-auto px-4 rounded-xl text-sm">
                                    <code>{demoPaste.content}</code>

                                </pre>
                            ) : (
                                <div className="border overflow-x-auto rounded-lg">
                                    <SyntaxHighlighter
                                        customStyle={{
                                            borderRadius: "0.5rem",
                                            margin: 0,
                                        }}
                                        language={demoPaste.language}
                                        style={vscDarkPlus}
                                        showLineNumbers
                                        wrapLongLines={false}
                                    >
                                        {demoPaste.content}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                            </div>

                            {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">

                            <div>
                                <strong>Characters:</strong> {demoPaste.content.length.toLocaleString()}
                            </div>

                            <div>
                                <strong>Lines:</strong> {demoPaste.content.split("\n").length.toLocaleString()}
                            </div>

                            <div>
                                <strong>Language:</strong> {demoPaste.language}
                            </div>

                        </div>

                        {/* Demo Features Showcase */}
                        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">

                            <h3 className="text-lg font-semibold text-blue-900 mb-3">
                                ✨ What you just experienced:
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">

                                <div className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>
                                        <strong>Syntax Highlighting:</strong> Beautiful code formatting for {demoPaste.language.toUpperCase()}
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>
                                        <strong>Copy to Clipboard:</strong> One-click copying functionality
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>
                                        <strong>Raw Text Toggle:</strong> Switch between highlighted and plain text
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>
                                        <strong>Responsive Design:</strong> Works perfectly on mobile and desktop
                                    </span>
                                </div>

                                <div className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>
                                        <strong>Clean URLs:</strong> Shareable links for easy collaboration
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">

                            <h3 className="text-xl font-bold mb-2">
                                Ready to create your own pastes?
                            </h3>

                            <p className="mb-4 opacity-90">
                                Sign up now to start sharing your code, notes, and text with the world!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">

                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/login">
                                        Sign Up for Free
                                    </Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                >
                                    <Link href="/">
                                        Back to Home
                                    </Link>
                                </Button>

                            </div>

                        </div>
                        </div>

                    </CardContent>

                </Card>
            </main>
            
        </div>
    );
}
