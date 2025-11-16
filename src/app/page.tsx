import React from "react";
import Hero from "@/components/Home/Hero";
import Work from "@/components/Home/work";
import Platform from "@/components/Home/platform";
import Portfolio from "@/components/Home/portfolio";
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
