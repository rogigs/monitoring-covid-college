import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ButtonMUI from "~/components/Button";
import * as S from "../../styles";
import RadioMUI from "~/components/Radio";
import { registerHealth } from "~/services/backend";
import DialogMUI from "~/components/Dialog";
import RADIOS from "../../utils";

function QuestItsOk({ setQuestItsOk }) {
  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
    defaultValues: {
      itsOk: "ok",
    },
  });

  const router = useRouter();

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    buttonName: "",
    icon: "",
  });

  const handleCloseModal = () => setModal({ ...modal, open: false });

  const submitData = async () => {
    try {
      await registerHealth([]);

      return router.push("/user/painel-de-registro");
    } catch (error) {
      if (error.message === "Registro já feito hoje.") {
        return setModal({
          open: true,
          title: "Erro ao registrar sintomas",
          message: "O registro já foi feito hoje, tente novamente amanhã.",
          buttonName: "Concluir",
          icon: "warning",
        });
      }

      return setModal({
        open: true,
        title: "Erro ao registrar sintomas",
        message:
          "Não foi possível cadastrar o sintoma, por favor tente novamente.",
        buttonName: "Tentar novamente",
        icon: "danger",
      });
    }
  };

  const onSubmit = (data) => {
    const formattedData = data.itsOk === "ok";

    setQuestItsOk(formattedData);

    return formattedData && submitData();
  };

  return (
    <S.Box>
      <DialogMUI
        open={modal?.open}
        onClose={handleCloseModal}
        buttonName={modal?.buttonName}
        title={modal?.title}
        icon={modal?.icon}
      >
        <p>{modal?.message}</p>
      </DialogMUI>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">Como você está se sentindo hoje?</h1>
        <S.BoxRadios>
          <S.WrapperField>
            <Controller
              name="itsOk"
              control={control}
              render={({ field }) => (
                <RadioMUI
                  row
                  radios={RADIOS.RADIOS_QUEST_ITS_OK}
                  field={field}
                />
              )}
            />
          </S.WrapperField>
        </S.BoxRadios>
        <S.WrapperButton>
          <ButtonMUI type="submit">Registrar</ButtonMUI>
        </S.WrapperButton>
      </form>
    </S.Box>
  );
}

QuestItsOk.propTypes = {
  setQuestItsOk: PropTypes.func.isRequired,
};

export default QuestItsOk;
