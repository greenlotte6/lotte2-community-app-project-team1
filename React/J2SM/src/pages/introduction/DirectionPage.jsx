import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubLayout } from "../../layouts/SubLayout";

export const DirectionPage = () => {
  return (
    <MainLayout>
      <SubLayout>
        <p>
          <strong>팜스토리</strong>
          <br />
          주소: 경기도 이천시 잘한다구 신난다동 123
          <br />
          전화: 01-234-5678
          <br />
        </p>
        <p>
          <strong>찾아오시는길</strong>
          <br />

          <div
            id="daumRoughmapContainer1668214668575"
            class="root_daum_roughmap root_daum_roughmap_landing"
          ></div>
        </p>

        <script
          charset="UTF-8"
          class="daum_roughmap_loader_script"
          src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"
        ></script>
      </SubLayout>
    </MainLayout>
  );
};
