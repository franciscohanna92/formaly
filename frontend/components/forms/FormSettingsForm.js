import React, { useState } from "react";
import { useRouter } from "next/router";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useForm, Controller } from "react-hook-form";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useUser } from "../../utils/auth/useUser";

function FormSettingsForm({ formId }) {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    watch,
  } = useForm();
  const router = useRouter();
  const { user } = useUser();
  let formDoc, formsCollection;

  formDoc = useDocument(`forms/${formId}`);
  formsCollection = useCollection("forms");

  function onSubmit(data) {
    if (formId) {
      formDoc.update({
        ...formId.data,
        ...data,
        targetEmail: data.settings.email ? data.targetEmail : null,
        recaptchaSecret: data.settings.recaptcha ? data.recaptchaSecret : null
      });
    } else {
      formsCollection
        .add({
          ...data,
          userId: user.id,
        })
        .then((res) => typeof window !== 'undefined' && router.push("/account/forms"))
        .catch((err) => alert(err.message));
    }
  }

  function handleDelete() {
    const yes = confirm(
      "Are you sure you want to delete this form? All the submissions associated with this form will get deleted too. This action can't be reverted."
    );
    if (yes) {
      formDoc.deleteDocument().catch((err) => console.log(err));
      typeof window !== 'undefined' && router.replace("/account/forms");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">
          Form name
        </label>
        <input
          className="form-control"
          name="name"
          defaultValue={formId && formDoc?.data?.name}
          ref={register}
          type="text"
          placeholder="i.e. example.com / Contact Form"
          rules={{ required: true }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">
          Allowed domain
        </label>
        <input
          className="form-control"
          name="domain"
          ref={register}
          defaultValue={formId && formDoc?.data?.domain}
          type="text"
          placeholder="i.e. example.com"
          rules={{ required: true }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="settings.targetEmail">
          Enable Recaptcha v2 veritication?
        </label>

        <Controller
          name="settings.recaptcha"
          defaultValue={formDoc?.data?.settings?.recaptcha || false}
          render={(props) => (
            <select
              name="settings.recaptcha"
              className="form-control"
              {...props}
              onChange={(e) => {
                props.onChange(e.target.value === "true");
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          )}
          control={control}
        />
      </div>

      {watch("settings.recaptcha") && (
        <div className="form-group">
          <label htmlFor="recaptchaSecret">
            Recaptcha v2 Secret
          </label>
          <input
            className="form-control"
            name="recaptchaSecret"
            ref={register}
            type="text"
            rules={{ required: watch("settings.recaptcha") }}
            defaultValue={formId && formDoc?.data?.recaptchaSecret}
            placeholder="xxxxxxxxxxxxxxx-xxxxxxxx-xxxxxxxxxxxxxxx"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="settings.targetEmail">
          Enable email forwarding?
        </label>

        <Controller
          name="settings.email"
          defaultValue={formDoc?.data?.settings?.email || false}
          render={(props) => (
            <select
              name="settings.email"
              className="form-control"
              {...props}
              onChange={(e) => {
                props.onChange(e.target.value === "true");
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          )}
          control={control}
        />
      </div>

      {watch("settings.email") && (
        <div className="form-group">
          <label htmlFor="targetEmail">
            Target Email
          </label>
          <input
            className="form-control"
            name="targetEmail"
            ref={register}
            type="text"
            rules={{ required: watch("settings.recaptcha") }}
            defaultValue={(formId && formDoc?.data?.targetEmail) || user.email}
            placeholder="i.e. hello@example.com"
          />
        </div>
      )}
      <div className="mt-4 d-flex justify-content-between">
        <button
          disabled={!formState.isDirty}
          className="btn btn-primary"
          type="submit"
        >
          {formId ? "Save changes" : "Create"}
        </button>
        {formId && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            Delete form
          </button>
        )}
      </div>
    </form>
  );
}

export default FormSettingsForm;
