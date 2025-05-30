import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Slider } from "../../components/main/Slider";
import { Quick } from "../../components/main/Quick";
import { Best } from "../../components/main/Best";
import { Latest } from "../../components/main/Latest";
import { Info } from "../../components/main/Info";

export const MainPage = () => {
  return (
    <MainLayout>
      <Slider />
      <Best />
      <Quick />
      <Latest />
      <Info />
    </MainLayout>
  );
};
