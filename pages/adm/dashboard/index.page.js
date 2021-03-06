import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import ButtonMUI from "~/components/Button";
import * as S from "./styles";
import TitleHeader from "~/components/TitleHeader";

function Dashboard() {
  const [role, setRole] = useState();

  useEffect(() => {
    setRole(localStorage.getItem("permission"));
  }, []);

  const router = useRouter();

  const onClickRegister = () => router.push("/adm/registro");
  const onClickViewMore = () => router.push("/adm/usuarios-cadastrados");
  const onClickSympton = () => router.push("/adm/sintomas");
  const onClickFrquency = () => router.push("/adm/frequencia");
  const onClickStateHealth = () => router.push("/adm/estados-de-saude");

  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <TitleHeader title="Dashboard" icon={false} />
      </div>
      <S.Box>
        <p>Realizar registros de:</p>
        {role === "9" && (
          <S.WrapperButton>
            <ButtonMUI onClick={onClickRegister}>Usuários</ButtonMUI>
            <ButtonMUI onClick={onClickSympton}>Sintomas</ButtonMUI>
          </S.WrapperButton>
        )}
      </S.Box>
      <S.Box>
        <p>Ver históricos de:</p>
        <S.WrapperButton>
          <ButtonMUI onClick={onClickFrquency}>
            Frequência de usuários
          </ButtonMUI>
          <ButtonMUI onClick={onClickViewMore}>Registro de usuários</ButtonMUI>
        </S.WrapperButton>
      </S.Box>
      <S.Box>
        <p>Relatórios de:</p>
        <S.WrapperButton>
          <ButtonMUI onClick={onClickStateHealth}>Estados de saúde</ButtonMUI>
        </S.WrapperButton>
      </S.Box>
    </>
  );
}

export default Dashboard;
