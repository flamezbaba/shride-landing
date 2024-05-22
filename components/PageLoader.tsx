"use client";

import { Router } from "next/router";
// import { } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("router changed");
    // setIsLoading(true);
    // Router.
    Router.events.on("routeChangeStart", (url) => {
      console.log("s", url);
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      console.log("c", url);
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      console.log("e", url);
      setIsLoading(false);
    });

  }, [Router]);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,.8)] fixed z-[9999] top-0">
          <div className="w-10 h-10">
            <div className="spinner"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
