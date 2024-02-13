"use client";

import NavTitle from "@/components/AppBar";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";

import { ReactNode, useState } from "react";

export default function CharacterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [navBarOpen, setNavBarOpen] = useState(false);

  const handleNavBar = (val: boolean) => {
    setNavBarOpen(val);
  };

  return (
    <Card>
      <NavTitle openMenu={handleNavBar} />
      <NavBar open={navBarOpen} closeMenu={handleNavBar} />
      {children}
    </Card>
  );
}
