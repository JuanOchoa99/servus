import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero";
const Work = dynamic(() => import("@/components/Home/work"), { ssr: false, loading: () => <div className="h-24" /> });
const Platform = dynamic(() => import("@/components/Home/platform"), { ssr: false, loading: () => <div className="h-24" /> });
const Portfolio = dynamic(() => import("@/components/Home/portfolio"), { ssr: false, loading: () => <div className="h-24" /> });
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Servus",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Platform />
      <Portfolio />
    </main>
  );
}
