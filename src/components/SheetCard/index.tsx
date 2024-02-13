import { ISheetCardChar } from "@/types/sheets";

import { CardActionArea, Grid, Rating } from "@mui/material";

import Card from "../Card";
import Img from "../Image";
import Text from "../Text";
import RatingStars from "../RatingStars";
import { useRouter } from "next/navigation";

export default function SheetCard({ character }: { character: ISheetCardChar }) {
  const router = useRouter();

  return (
    <Card cardProps={{ elevation: 7 }}>
      <CardActionArea onClick={() => router.push(`/character/${character.id}`)}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={1}>
            <Img
              src=""
              width="100%"
              height="auto"
              alt="Character Pic"
              style={{ border: "3px solid gray", borderRadius: "9999px" }}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Text>
                  <b>Nome:</b> {character.name}
                </Text>
              </Grid>
              <Grid item xs={12} md={6}>
                <Text>
                  <b>Raça:</b> {character.race}
                </Text>
              </Grid>
              <Grid item xs={12} md={6}>
                <Text>
                  <b>Classe:</b> {character.class}
                </Text>
              </Grid>
              <Grid item xs={12} md={6}>
                <Text>
                  <b>Idade:</b> {character.age}
                </Text>
              </Grid>
              <Grid item xs={12} md={6}>
                <Text>
                  <b>Experiencia:</b>
                </Text>
                <RatingStars value={Number(character.experience)} color="#FFD700" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
