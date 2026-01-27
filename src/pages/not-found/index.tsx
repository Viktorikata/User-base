import React from "react";
import { Result } from "antd";

export function NotFoundPage() {
  return (
    <div style={{ padding: 24 }}>
      <Result status="404" title="404" subTitle="Страница не найдена" />
    </div>
  );
}
