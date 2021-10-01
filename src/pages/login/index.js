import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import TextFieldMUI from "../../components/TextField";
import ButtonMUI from "../../components/Button";
import CheckboxMUI from "../../components/Checkbox";

import * as S from "./styles";

const Login = () => {
  const { handleSubmit, control, watch } = useForm({
    mode: "onSubmit",
    defaultValues: {
      user: "",
      password: "",
      keepMeConnected: false,
    },
  });

  const { user, password } = watch();
  const isDisabled = user === "" || password === "";

  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    return router.push("/dashboard");
  };

  return (
    <S.Box>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="centralize">COVID Monitoring</h1>
        <S.WrapperField>
          <Controller
            name="user"
            control={control}
            render={({ field }) => <TextFieldMUI label="Usuario" {...field} />}
          />
        </S.WrapperField>
        <S.WrapperField>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextFieldMUI type="password" label="Senha" {...field} />
            )}
          />
        </S.WrapperField>
        <Controller
          name="keepMeConnected"
          control={control}
          render={({ field }) => (
            <CheckboxMUI label="Manter-me conectado" {...field} />
          )}
        />
        <S.WrapperButton>
          <ButtonMUI type="submit" disabled={isDisabled}>
            Entrar
          </ButtonMUI>
        </S.WrapperButton>
      </form>
    </S.Box>
  );
};

export default Login;
