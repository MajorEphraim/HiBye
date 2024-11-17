import React from "react";
import { HeaderProvider } from "./HeaderContext";
import { AuthProvider } from "./AuthContext";
import { AccountProvider } from "./AccountContext";
import { MyChatsProvider } from './MyChatsContext'
import { NewChatsProvider } from './NewChatsContext'
import { RequestsProvider } from './RequestsContext'
import { ChatHeaderProvider } from './ChatHeaderContext'

const AppProvider = ({children})=>(
  <AuthProvider>
    <HeaderProvider>
      <AccountProvider>
        <MyChatsProvider>
          <RequestsProvider>
            <NewChatsProvider>
              <ChatHeaderProvider>
                {children}
              </ChatHeaderProvider>
             </NewChatsProvider>
          </RequestsProvider>
        </MyChatsProvider>
      </AccountProvider>
    </HeaderProvider>
  </AuthProvider>

) 

export default AppProvider
