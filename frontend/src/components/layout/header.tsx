import React, { useContext } from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core";
import {
   Layout as AntdLayout,
   Avatar,
   Space,
   Switch,
   Typography,
   theme,
} from "antd";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
   id: number;
   name: string;
   avatar: string;
};
export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
   sticky,
}) => {
   const { token } = useToken();

   const authProvider = useActiveAuthProvider();
   const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
   });
   const { mode, setMode } = useContext(ColorModeContext);

   const shouldRenderHeader = user && (user.name || user.avatar);

   if (!shouldRenderHeader) {
      return null;
   }

   const headerStyles: React.CSSProperties = {
      backgroundColor: token.colorBgElevated,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "0px 24px",
      height: "64px",
   };

   if (sticky) {
      headerStyles.position = "sticky";
      headerStyles.top = 0;
      headerStyles.zIndex = 1;
   }

   return (
      <AntdLayout.Header style={headerStyles}>
         <Space>
            <Switch
               checkedChildren="🌛"
               unCheckedChildren="🔆"
               onChange={() => setMode(mode === "light" ? "dark" : "light")}
               defaultChecked={mode === "dark"}
            />
            <Space size="middle">
               {user?.name && <Text strong>{user.name}</Text>}
               {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
            </Space>
         </Space>
      </AntdLayout.Header>
   );
};
