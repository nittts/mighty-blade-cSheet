import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mighty Blade Character Sheet",
  description: "Registro automático de fichas Mighty Blade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

