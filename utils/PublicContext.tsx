import { Context, ReactNode } from "react";
import { createContext } from "react";

const PublicContext: Context<ReactNode | null> = createContext(null);

export default PublicContext;
