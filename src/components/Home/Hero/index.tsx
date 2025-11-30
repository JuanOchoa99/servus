"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BuyCrypto from "./buy-form";
import SellCrypto from "./sell-form";
import dynamic from "next/dynamic";
const CardSlider = dynamic(() => import("./slider"), { ssr: false, loading: () => <div className="h-24" /> });
import { technologyShowcase } from "@/app/api/data";
import { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {
  const [isBuying, setIsBuyingOpen] = useState(false);
  const [isSelling, setIsSellingOpen] = useState(false);
  const BuyRef = useRef<HTMLDivElement>(null);
  const SellRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (BuyRef.current && !BuyRef.current.contains(event.target as Node)) {
        setIsBuyingOpen(false);
      }
      if (SellRef.current && !SellRef.current.contains(event.target as Node)) {
        setIsSellingOpen(false);
      }
    },
    [BuyRef, SellRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    document.body.style.overflow = isBuying || isSelling ? "hidden" : "";
  }, [isBuying, isSelling]);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-5 pt-40 pb-20 overflow-x-hidden overflow-y-visible z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4 max-w-full">
        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12 md:pl-8 px-4">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-4 md:mb-5 md:mt-24 mt-8">
              <p className="text-white sm:text-28 text-16 mb-2">
                Your business to another <span className="text-primary">level.</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-36 md:text-54 lg:text-start text-center text-white mb-6 md:mb-10 leading-tight">
              Development of 
              <span className="text-primary"> mobile</span> applications and 
              <span className="text-primary"> web</span> platforms with the exact functionalities your business needs. 
            </h1>
            <div className="flex items-center md:justify-start justify-center gap-8 mb-6 md:mb-0">
              <button
                className="bg-transparent border border-primary rounded-lg text-18 md:text-21 font-medium hover:bg-primary hover:text-darkmode text-primary py-2 px-6 md:px-7"
                onClick={() => setIsSellingOpen(true)}
              >
                Contact us
              </button>
            </div>
            <div className="flex items-center md:justify-start justify-center gap-6 md:gap-12 md:mt-12 mt-8">
              <Link href="#" className="hover:scale-110 duration-300">
                <Image
                  src={`${getImagePrefix()}images/playstore.png`}
                  alt="Play Store"
                  width={240}
                  height={70}
                  className="w-32 md:w-auto h-auto"
                  loading="lazy"
                />
              </Link>
              <Link href="#" className="hover:scale-110 duration-300">
                <Image
                  src= {`${getImagePrefix()}images/applestore.svg`}
                  alt="App Store"
                  width={240}
                  height={70}
                  className="w-32 md:w-auto h-auto"
                  loading="lazy"
                />
              </Link>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64">
              <Image
                src= {`${getImagePrefix()}images/principal.svg`}
                alt="Banner"
                width={1150}
                height={1150}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
        <div className="lg:mt-8 md:mt-12 mt-16 relative z-10">
          <CardSlider items={technologyShowcase} autoplaySpeed={1600} slidesToShow={4} />
        </div>
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>

      {/* Modals for Buy and Sell */}
      {isBuying && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={BuyRef}
            className="relative w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 z-999 text-center bg-dark_grey bg-opacity-90 backdrop-blur-md"
          >
            <button
              onClick={() => setIsBuyingOpen(false)}
              className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
              aria-label="Close Buy Modal"
            >
              <Icon
                icon="tabler:currency-xrp"
                className="text-white hover:text-primary text-24 inline-block me-2"
              />
            </button>
            <BuyCrypto />
          </div>
        </div>
      )}
      {isSelling && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={SellRef}
            className="relative w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 z-999 text-center bg-dark_grey bg-opacity-90 backdrop-blur-md"
          >
            <button
              onClick={() => setIsSellingOpen(false)}
              className="absolute top-0 right-0 mr-8 mt-8 dark:invert"
              aria-label="Close Sell Modal"
            >
              <Icon
                icon="tabler:currency-xrp"
                className="text-white hover:text-primary text-24 inline-block me-2"
              />
            </button>
            <SellCrypto />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
