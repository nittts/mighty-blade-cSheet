import DiceRoller from "@/components/DiceRoller";
import { PageProps } from "@/types/page";
import React from "react";

function DicePage({ params }: PageProps) {
  return (
    <div>
      <DiceRoller />
    </div>
  );
}

export default DicePage;
