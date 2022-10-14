import React from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../types/Theme";
import { Dispatch } from "@reduxjs/toolkit";
import { setTheme } from "../../state/slice";
import { ITEMS_BG_COLOR } from "../../utils/styleConstants";

export const SettingsPanel = (): JSX.Element => {
  // @ts-ignore
  const {theme} = useSelector(state => state.theme)
  const [isOn, setIsOn] = React.useState<boolean>(theme === Theme.DARK)
  const dispatch: Dispatch = useDispatch()
  const handle = (is: boolean) => {
    setIsOn(is)
    dispatch(setTheme(is ? Theme.DARK : Theme.LIGHT))
  }

  const labelColor: string = theme === Theme.DARK ? ITEMS_BG_COLOR : 'black'

  return (
    <ToggleSwitch
      isOn={isOn}
      onColor={ITEMS_BG_COLOR}
      offColor={'black'}
      circleColor={theme === Theme.DARK ? 'black' : ITEMS_BG_COLOR}
      label="Dark theme"
      labelStyle={{ color: labelColor, fontWeight: "300", fontSize: 25}}
      size="medium"
      onToggle={isOn => handle(isOn)}
    />
  )
}
