import { redirect } from "next/navigation";
import { getQueryClient } from "@/trpc/server";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Lock, Rocket, Share, Users, Zap } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";


// =============================================================================
// LANDING PAGE - Public entry point
// =============================================================================
//
// WHY: The main landing page that redirects authenticated users to /home.
// Unauthenticated users see the public landing content.
//
// AUTH CHECK:
//   - getSession() checks if user is logged in
//   - If authenticated, redirect to /home immediately
//   - If not, show the landing page
//
// PATTERN:
//   - Same structure as protected pages for consistency
//   - HydrationBoundary, ErrorBoundary, Suspense
//   - Easy to add prefetched data if needed
// =============================================================================

const LandingPage = async () => {
  const session = await getSession();

  if (session) redirect("/home");


  return (
    <div className="bg-linear-to-br from-blue-50 min-h-screen to-indigo-50 via-white">
      <header className="backdrop-blur-sm bg-white/80 border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between mx-auto p-4">
          <div className="font-bold text-2xl text-blue-600">
            DevBin
          </div>
          <div className="flex gap-4 items-center">
            <Link href="demo">
              <Button variant="outline" className="cursor-pointer">View Demo</Button>
            </Link>
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-blue-50 border-blue-200 mb-4 text-blue-700" variant="outline">
            <Rocket className="text-red-500" />
            The Fasest way to share code and text
          </Badge>

          <h1 className="font-bold leading-tight mb-6 md:text-6xl text-gray-900 text-5xl">
            Share Code & Text
            <span className="block text-blue-600">Instanly & Securely</span>
          </h1>

          <p className="leading-relaxed max-w-2xl mx-auto mb-8 text-gray-600 text-xl">
            Create shareable code snippets, or share notes, <br />
            and links with your friends and team instantly and securely. <br />
            With syntax highlighting and themes, it's the perfect way to share your code.
          </p>

          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/login">
              <Button className="px-8 py-6 text-lg" size="lg" >
                Start Sharing Now
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-gray-500 text-sm">
            Free to use - No credit card required - Github & Google Login
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to share code
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with developers in mind, but perfect for anyone who needs to share text quickly and securely
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="size-6 text-blue-600" />
              </div>
              <CardTitle>Syntax Highlighting</CardTitle>
              <CardDescription>
                Support for 20+ programming languages with beautiful syntax highlighting for better readiblity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Share className="size-6 text-green-600" />
              </div>
              <CardTitle>Instant Sharing</CardTitle>
              <CardDescription>
                Get a shareable link instantly. Copy to clipboard with one click and share anywhere.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="size-6 text-purple-600" />
              </div>
              <CardTitle>Privacy Controls</CardTitle>
              <CardDescription>
                Set your pastes to public or private. Control who can access your shared content
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="size-6 text-orange-600" />
              </div>
              <CardTitle>Auto Expiration</CardTitle>
              <CardDescription>
                Set Expiration times for sensitive content. Pastes can auto-delete after 1 hour to 30 days.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="size-6 text-teal-600" />
              </div>
              <CardTitle>User Dashboard</CardTitle>
              <CardDescription>
                Manage all your pastes in one place. Edit, delete, and track your shared content.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="size-6 text-red-600" />
              </div>
              <CardTitle>Raw Text View</CardTitle>
              <CardDescription>
                Switch between highlighted and raw text view. Perfect for copying plain text without formatting.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">

          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>

            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">

              {/* Step 1 */}
              <div className="text-center">
                <div
                  className="
              w-16 h-16
              bg-blue-600 text-white
              rounded-full
              flex items-center justify-center
              text-2xl font-bold
              mx-auto mb-4
            "
                >
                  1
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Paste Your Content
                </h3>

                <p className="text-gray-600">
                  Write or paste your code, text, or notes into our editor.
                  Choose your programming language for syntax highlighting.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div
                  className="
              w-16 h-16
              bg-blue-600 text-white
              rounded-full
              flex items-center justify-center
              text-2xl font-bold
              mx-auto mb-4
            "
                >
                  2
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Configure Settings
                </h3>

                <p className="text-gray-600">
                  Set privacy level, expiration time, and add an optional title.
                  Customize how your paste will be shared.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div
                  className="
              w-16 h-16
              bg-blue-600 text-white
              rounded-full
              flex items-center justify-center
              text-2xl font-bold
              mx-auto mb-4
            "
                >
                  3
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  Share & Collaborate
                </h3>

                <p className="text-gray-600">
                  Instantly share your paste with a unique link and collaborate
                  with others seamlessly from anywhere.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to start sharing?
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who trust Paste, Link, & Send
            for their daily sharing needs.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/login">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
              >
                Get Started for Free

                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-500">

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />

              <span>Free Forever</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />

              <span>No Setup Required</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />

              <span>Secure & Private</span>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">

          <div className="text-center">

            <div className="text-2xl font-bold text-blue-600 mb-4">
              DevBin
            </div>

            <p className="text-sm text-gray-500">
              &copy; 2026 DevBin. All rights reserved. Made with ❤️ by Yuvraj Satyapal
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
