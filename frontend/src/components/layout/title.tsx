import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Image, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        {!collapsed && (<img src={"./zeal-horizontal-removebg.png"} width={160} alt="zeal-logo-horizontal" />)}
        {collapsed && (<img src={"./zeal-logo-removebg.png"} width={40} alt="zeal-logo" />)}
      </Space>
    </ActiveLink>
  );
};
