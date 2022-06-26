import { createContext } from "react";

interface ContexProps{
    isMenuOpen: boolean
    toggleSideMenu: ()=> void
}

export const UiContext = createContext({} as ContexProps)