import { Typography, TypographyProps } from "@mui/material";

export default function Text(props: TypographyProps) {
  const { children } = props;

  return <Typography {...props}>{children}</Typography>;
}
