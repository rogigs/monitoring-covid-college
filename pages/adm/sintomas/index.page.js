import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextFieldMUI from "~/components/TextField";
import { createSymptom } from "~/services/backend";
import DialogMUI from "~/components/Dialog";
import ButtonMUI from "~/components/Button";
import * as S from "./styles";
import TableSymptom from "./components/TableSymptom";
import TitleHeader from "~/components/TitleHeader";

function Symptoms() {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    buttonName: "",
    icon: "",
  });

  const handleCloseModal = () => setModal({ ...modal, open: false });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      symptom: "",
    },
    resolver: yupResolver(
      yup
        .object({
          symptom: yup.string().required("Preencha o campo com o sintoma"),
        })
        .required()
    ),
  });

  const resetForm = () => reset();
  const onSubmit = async (data) => {
    try {
      await createSymptom(data);
      resetForm();

      return setModal({
        open: true,
        title: "Sintoma cadastrado",
        message: "Parabéns, o sintoma foi cadastrado com sucesso",
        buttonName: "Concluir",
        icon: "success",
      });
    } catch (error) {
      if (error.message === "Sintoma já existente.") {
        return setModal({
          open: true,
          title: "Erro ao registrar sintoma",
          message: "Você está tentando cadastrar um sintoma que já existe",
          buttonName: "Tentar novamente",
          icon: "warning",
        });
      }

      return setModal({
        open: true,
        title: "Erro ao registrar sintoma",
        message:
          "Não foi possível cadastrar o sintoma, por favor tente novamente",
        buttonName: "Tentar novamente",
        icon: "danger",
      });
    }
  };

  return (
    <>
      <DialogMUI
        open={modal?.open}
        onClose={handleCloseModal}
        buttonName={modal?.buttonName}
        title={modal?.title}
        icon={modal?.icon}
      >
        <p>{modal?.message}</p>
      </DialogMUI>
      <TitleHeader title="Registro de sintoma" />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <S.WrapperField>
          <Controller
            name="symptom"
            control={control}
            render={({ field }) => (
              <TextFieldMUI
                label="Sintoma"
                error={errors?.symptom}
                helperText={errors?.symptom?.message}
                {...field}
              />
            )}
          />
        </S.WrapperField>
        <S.WrapperButton>
          <ButtonMUI type="submit" loading={isSubmitting}>
            Cadastrar
          </ButtonMUI>
        </S.WrapperButton>
      </form>
      <TableSymptom />
    </>
  );
}

export default Symptoms;
