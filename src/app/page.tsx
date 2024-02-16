"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/Input";
import Card from "@/components/Card";
import Img from "@/components/Image";
import Btn from "@/components/Button";
import Text from "@/components/Text";
import WaveBackground from "@/components/WaveBackground";

import assets from "@/assets";

import { useToast } from "@/providers/ToastProvider";
import { useAppTheme } from "@/providers/MUIProvider";
import { useLogin } from "@/hooks/auth";

import { Grid } from "@mui/material";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

const containerStyles = {
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  const [username, setUserName] = useState("");

  const { mode } = useAppTheme();
  const { handleOpen } = useToast();
  const { loginFn, loginStatus, loginError, loginData } = useLogin();

  const router = useRouter();

  const submit = async () => {
    const payload = username.trim();

    loginFn(payload);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserName(value);
  };

  useEffect(() => {
    const messages = {
      error: "Algo deu errado no login, tente novamente.",
      success: "Bem Vindo de volta, aventureiro(a)",
    };

    if (loginStatus === "idle") return;

    if (isAxiosError(loginError)) {
      messages.error = loginError?.response?.data?.message ?? messages.error;
    }

    if (loginData) {
      messages.success = loginData.message;
    }

    const message = messages[loginStatus as keyof typeof messages];

    if (message) {
      handleOpen({
        severity: loginStatus,
        text: message,
      });
    }
  }, [loginStatus, handleOpen, loginError, loginData]);

  if (loginStatus === "success") {
    return router.push("/selectSheet", { scroll: false });
  }

  return (
    <main id="app">
      <WaveBackground />
      <Grid container style={containerStyles}>
        <Grid item xs={11} sm={8} md={8} lg={3}>
          <Card>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Img
                  src={assets[mode as keyof typeof assets].logo}
                  width={"100%"}
                  height={260}
                  alt="Mighty Blade Logo"
                />
              </Grid>
              <Grid item xs={12}>
                <Text variant="h6" textAlign="center">
                  Gerenciador de fichas ⚔️
                </Text>
              </Grid>
              <Grid item xs={12}>
                <Input
                  value={username}
                  label="Usuário"
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                  disabled={loginStatus === "loading" ? true : undefined}
                />
              </Grid>
              <Grid item xs={12}>
                <Btn size="large" onClick={submit} loading={loginStatus === "loading" ? true : undefined}>
                  Entrar
                </Btn>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}

