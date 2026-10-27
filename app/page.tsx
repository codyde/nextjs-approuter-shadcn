import { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const links = [
  {
    title: "Railway Docs",
    description: "Domains, variables, scaling, and more for this service.",
    href: "https://docs.railway.com/guides/nextjs",
  },
  {
    title: "Next.js Docs",
    description: "App Router, Cache Components, and Route Handlers.",
    href: "https://nextjs.org/docs",
  },
  {
    title: "shadcn/ui",
    description: "Add components with npx shadcn@latest add <name>.",
    href: "https://ui.shadcn.com/docs/components",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16 sm:py-24">
      <header className="flex flex-col gap-6">
        <Image
          src="/railway-logo-dark.png"
          alt="Railway"
          width={56}
          height={56}
          className="invert"
          priority
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Next.js on Railway
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Your app is live. Edit{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              app/page.tsx
            </code>{" "}
            and push to deploy a new version.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Next.js 16</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="secondary">Tailwind CSS 4</Badge>
          <Badge variant="secondary">shadcn/ui</Badge>
        </div>
      </header>

      <Suspense fallback={<DeploymentCardSkeleton />}>
        <DeploymentCard />
      </Suspense>

      <section className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <Card key={link.href} className="gap-3 py-5">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center justify-between">
                {link.title}
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <Button asChild variant="outline" size="sm">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  Open
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

// Rendered per request (streamed in after the static shell) so it reflects the
// deployment that is actually serving traffic.
async function DeploymentCard() {
  await connection();

  const rows = [
    ["Service", process.env.RAILWAY_SERVICE_NAME],
    ["Environment", process.env.RAILWAY_ENVIRONMENT_NAME],
    ["Region", process.env.RAILWAY_REPLICA_REGION],
    ["Commit", process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7)],
    ["Deployment", process.env.RAILWAY_DEPLOYMENT_ID?.slice(0, 8)],
  ] as const;
  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT_ID);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${onRailway ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          {onRailway ? "Running on Railway" : "Running locally"}
        </CardTitle>
        <CardDescription>
          {onRailway
            ? "Read from Railway-provided variables at request time."
            : "Deploy to Railway to see live deployment details here."}
        </CardDescription>
      </CardHeader>
      {onRailway && (
        <CardContent>
          <Separator className="mb-4" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-5">
            {rows.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="truncate font-mono">{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      )}
    </Card>
  );
}

function DeploymentCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded bg-muted" />
      </CardHeader>
    </Card>
  );
}
