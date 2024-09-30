import { _BUS } from "@/app/const/bus"
import { __VARS } from "@/app/const/vars"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type InitialStateType = {
  sounds: {
    userJoinLeft: boolean
    messageIncoming: boolean
  }
}

const initialState: InitialStateType = {
  sounds: {
    userJoinLeft: false,
    messageIncoming: false,
  },
}

const settingSlice = createSlice({
  name: "setting-slice",
  initialState: initialState,
  reducers: {
    toggleSoundSetting: (
      state,
      action: PayloadAction<{ key: keyof InitialStateType["sounds"] }>
    ) => {
      state.sounds[action.payload.key] = !state.sounds[action.payload.key]
    },
  },
})

export const { toggleSoundSetting: toggleSoundSettingAction } =
  settingSlice.actions

export default settingSlice.reducer
