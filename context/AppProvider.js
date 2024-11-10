import React from "react";
import { HeaderProvider } from "./HeaderContext";
import { AuthProvider } from "./AuthContext";
import { AccountProvider } from "./AccountContext";

const AppProvider = ({children})=>(
  <AuthProvider>
    <HeaderProvider>
        <AccountProvider>
            {children}
        </AccountProvider>
    </HeaderProvider>
  </AuthProvider>

)

export default AppProvider
