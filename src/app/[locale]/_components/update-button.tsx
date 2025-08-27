"use client";

import { Button } from "@/components";
import { appStateSelector } from "@/stores/app-state/slice";
import { updateAppPokemonThunk } from "@/stores/thunks";
import { useAppDispatch, useAppSelector } from "@/stores/with-types";
import { useTranslations } from "next-intl";

export function UpdateButton() {
  const isAppUpdating = useAppSelector(appStateSelector.selectIsUpdating);
  const dispatch = useAppDispatch();
  const t = useTranslations("main-page.user-toolbar");

  return (
    <Button
      disabled={isAppUpdating}
      onClick={() => dispatch(updateAppPokemonThunk())}
    >
      {t("update-button-text")}
    </Button>
  );
}
