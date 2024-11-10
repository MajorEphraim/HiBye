import React from "react";
import { HeaderProvider } from "./HeaderContext";
import { AuthProvider } from "./AuthContext";
import { AccountProvider } from "./AccountContext";
import { MessagesProvider } from './MessagesContext'
import { MyChatsProvider } from './MyChatsContext'
import { NewChatsProvider } from './NewChatsContext'
import { RequestsProvider } from './RequestsContext'

const AppProvider = ({children})=>(
  <AuthProvider>
    <HeaderProvider>
        <AccountProvider>
          <MessagesProvider>
            <MyChatsProvider>
              <NewChatsProvider>
                <RequestsProvider>
                  {children}
                </RequestsProvider>
              </NewChatsProvider>
            </MyChatsProvider>
          </MessagesProvider>
        </AccountProvider>
    </HeaderProvider>
  </AuthProvider>

)

export default AppProvider