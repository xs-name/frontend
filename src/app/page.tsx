/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import AuthPage from "@/components/AuthPage.component";
import Nav from "@/components/Nav";
import { useState } from "react";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  return (
    <main>
      {isAuthorized?
      <div>
        <Nav />
      </div>
      : AuthPage()}
    </main>
  );
}
