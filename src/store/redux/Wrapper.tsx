"use client"

import { Provider } from "react-redux"
import { persistor, reduxStore } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import FullLoading from "@/components/shared/full-loading"
import { ReactNode } from "react"

interface Props {}

const ReduxWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<FullLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper
