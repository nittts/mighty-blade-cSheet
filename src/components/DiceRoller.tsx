"use client";

import { Box, Button, ButtonGroup, Card, Grid, Input, Popper, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import CardComponent from "./Card";
import {
  GiD10,
  GiD12,
  GiD4,
  GiDiceEightFacesEight,
  GiDiceTwentyFacesTwenty,
  GiPerspectiveDiceSixFacesOne,
  GiRollingDices,
} from "react-icons/gi";
import { useWindowSize } from "usehooks-ts";

const generateRandom = (dice: number, ammount: number) => {
  const gen = (max: number) => Math.floor(Math.random() * max + 1);

  return Array.from(new Array(ammount)).map(() => gen(dice));
};

function DiceRoller() {
  const [results, setResults] = useState<{ dice: number; result: number[]; amm: number }>({
    dice: 4,
    amm: 1,
    result: [],
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { width } = useWindowSize();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>, dice: number) => {
    setResults({ ...results, dice: dice });

    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closePop = () => setAnchorEl(null);

  const clearRes = () => {
    setResults({ ...results, result: [] });
  };

  const dices = [
    {
      title: "D4",
      icon: <GiD4 size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D6",
      icon: <GiPerspectiveDiceSixFacesOne size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D8",
      icon: <GiDiceEightFacesEight size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D10",
      icon: <GiD10 size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D12",
      icon: <GiD12 size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D20",
      icon: <GiDiceTwentyFacesTwenty size={30} style={{ marginBottom: "-0.5em" }} />,
    },
    {
      title: "D100",
      icon: <GiRollingDices size={30} style={{ marginBottom: "-0.5em" }} />,
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={1.5}>
        <Card elevation={6} sx={{ maxWidth: ["auto", "auto", "80px", "80px"] }}>
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: ["row", "row", "column", "column"],
            }}
            spacing={0}
          >
            {dices.map((dice) => (
              <Grid item xs={3} md={12} key={dice.title}>
                <Tooltip title={dice.title}>
                  <Button
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      margin: 0,
                      height: "60px",
                    }}
                    onClick={(e) => handleClick(e, Number(dice.title.replace("D", "")))}
                  >
                    {dice.icon}
                    <span style={{ fontSize: "0.9em" }}>{dice.title}</span>
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={10}>
        <CardComponent cardProps={{ elevation: 6 }}>
          {results.result.length > 0 && (
            <CardComponent>
              <Typography textAlign="center" sx={{ marginBottom: 2 }}>
                Resultado
              </Typography>
              <Grid
                container
                spacing={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {results.result.map((d, indx) => (
                  <Grid
                    key={`res-${indx}`}
                    item
                    xs={results.result.length > 6 ? 4 : 2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      filter: "drop-shadow(0px 0px 3px #90caf9)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        background: "#0b0b0b",
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      }}
                    >
                      <Typography sx={{ color: "#90caf9", fontSize: "2em" }}>{d}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography textAlign="center" sx={{ marginTop: 2 }}>{`Soma total: ${results.result.reduce(
                (a, d) => (a += d),
                0
              )}`}</Typography>
            </CardComponent>
          )}
        </CardComponent>
      </Grid>

      <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 9 }}>
        <CardComponent cardProps={{ elevation: 10 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md="auto">
              <ButtonGroup
                orientation={width <= 500 ? "vertical" : "horizontal"}
                disableElevation
                fullWidth
                style={{ display: "flex" }}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 20].map((amm) => (
                  <Button
                    variant={results.amm === amm ? "contained" : "outlined"}
                    key={`g-${amm}`}
                    onClick={() => setResults({ ...results, amm, result: [] })}
                  >
                    {amm}
                  </Button>
                ))}
                <Button variant={![1, 2, 3, 4, 5, 6, 8, 10, 12, 20].includes(results.amm) ? "contained" : "outlined"}>
                  <Input
                    type="number"
                    value={results.amm}
                    sx={{
                      width: "35px",
                      background: "transparent",
                      border: "none",

                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                        display: "none",
                      },
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                    }}
                    onChange={(e) => setResults({ ...results, amm: Number(e.target.value) })}
                  />
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} md="auto">
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  clearRes();
                  setResults({ ...results, result: generateRandom(results.dice, results.amm) });
                  closePop();
                }}
              >
                Rolar
              </Button>
            </Grid>
          </Grid>
        </CardComponent>
      </Popper>
    </Grid>
  );
}

export default DiceRoller;
