import React, { useState } from "react";
import { useRouter } from "next/router";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useForm, Controller } from "react-hook-form";
import { useCollection } from "@nandorojo/swr-firestore";
import { useUser } from "../../../utils/auth/useUser";

import AccountLayout from "../../../layout/account/AccountLayout";
import FormSettingsForm from "../../../components/forms/FormSettingsForm";

function CreateForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const { user } = useUser()

  const { add } = useCollection("forms", { listen: true });

  const onSubmit = (data) => {
    console.log(data)
    add({
      ...data,
      userId: user.id,
      settings: {
        async: true,
        email: true,
        recaptcha: true,
        webhook: true
      }
    })
      .then((res) => typeof window !== 'undefined' && router.push("/account/forms"))
      .catch((err) => alert(err.message));
  };

  return (
    <AccountLayout title="Create form">
      <div className="px-4 mt-4">
      <FormSettingsForm />
      </div>
    </AccountLayout>
  );
}

export default CreateForm;
