import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

type IRatingProps = {
  value: number;
  text?: string;
  color?: string;
};

export default function RatingStars({ value, text, color }: IRatingProps) {
  console.log(5 - Math.ceil(value));

  return (
    <div className="rating">
      <span>
        {[...Array(Math.floor(value))].map((key, idx) => (
          <MdStar key={idx} style={{ color }} />
        ))}

        {value - Math.floor(value) > 0 && <MdStarHalf style={{ color }} />}

        {[...Array(Math.abs(5 - Math.ceil(value)))].map((key, idx) => (
          <MdStarBorder key={`${idx}+${5 - idx}`} style={{ color }} />
        ))}
      </span>
      <span>{text && text}</span>
    </div>
  );
}
