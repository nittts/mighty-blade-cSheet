import { Rating } from "@mui/material";

type IRatingProps = {
  value: number;
  text?: string;
  color?: string;
};

export default function RatingStars({ value, text, color }: IRatingProps) {
  return (
    <div className="rating">
      <span>
        <Rating value={value} readOnly />
      </span>
      <span>{text && text}</span>
    </div>
  );
}
