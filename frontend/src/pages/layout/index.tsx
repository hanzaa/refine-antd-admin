import { ThemedLayoutV2 } from "../../components/layout";
import { ReactNode } from "react";
import { ThemedHeaderV2 } from "../../components/layout/header";
import { ThemedSiderV2 } from "../../components/layout/sider";

export const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <ThemedLayoutV2
         Header={() => <ThemedHeaderV2 sticky />}
         Sider={() => <ThemedSiderV2 fixed />}
      >
         {children}
      </ThemedLayoutV2>
   );
};
