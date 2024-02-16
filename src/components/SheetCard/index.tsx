import { ISheetCardChar } from "@/types/sheets";

import { CardActionArea, Grid, IconButton, Rating } from "@mui/material";

import Card from "../Card";
import Img from "../Image";
import Text from "../Text";
import RatingStars from "../RatingStars";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import { useDeleteSheet } from "@/hooks/sheets/";

export default function SheetCard({ character }: { character: ISheetCardChar }) {
  const router = useRouter();
  const { deleteSheetFn } = useDeleteSheet();

  console.log({ character });

  return (
    <Card cardProps={{ elevation: 7, sx: { position: "relative" } }}>
      <CardActionArea onClick={() => router.push(`/character/${character.id}`)}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={1}>
            <Img
              src={character.src}
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
      <Grid item sx={{ position: "absolute", top: "0.5%", right: 0 }}>
        <IconButton onClick={() => deleteSheetFn({ id: character.id })}>
          <MdClose size={20} />
        </IconButton>
      </Grid>
    </Card>
  );
}
