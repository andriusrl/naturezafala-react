//hook personalizado que mapeia tipo do state

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;