"use client";

import { Button } from "@/components";
import { appLoadingSlice } from "@/stores/app-loading/slice";
import { updateAppPokemonThunk } from "@/stores/thunks";
import { useAppDispatch, useAppSelector } from "@/stores/with-types";
import { useTranslations } from "next-intl";

export function UpdateButton() {
  const isAppLoading = useAppSelector(
    appLoadingSlice.selectors.selectIsLoading,
  );
  const dispatch = useAppDispatch();
  const t = useTranslations("main-page.user-toolbar");

  return (
    <Button
      disabled={isAppLoading}
      onClick={() => dispatch(updateAppPokemonThunk())}
    >
      {t("update-button-text")}
    </Button>
  );
}
