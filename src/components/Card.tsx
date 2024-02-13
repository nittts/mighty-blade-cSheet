import { Card, CardContent, CardContentProps, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface ICardProps {
  cardProps?: CardProps;
  cardContentProps?: CardContentProps;
  children: ReactNode;
}

export default function CardComponent({ cardContentProps, cardProps, children }: ICardProps) {
  return (
    <Card style={{ width: "100%", height: "100%" }} {...cardProps}>
      <CardContent {...cardContentProps}>{children}</CardContent>
    </Card>
  );
}
