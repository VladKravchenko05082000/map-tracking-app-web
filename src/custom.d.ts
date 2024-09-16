import { ThemeOptions } from "@mui/material/styles";


type CustomColorsType = {
  main: string;
  secondary: string;
};

type CenterDivType = {
  display: "flex";
  flexDirection: "column";
  alignItems: "center";
  justifyContent: "center";
  height: string;
};

declare module "@mui/material/styles" {
  interface Theme {
    customColors: CustomColorsType;
    customComponents: {
      centerDiv: CenterDivType;
    };
  }

  interface ThemeOptions {
    customColors?: Partial<CustomColorsType>;
    customComponents: {
      centerDiv?: CenterDivType;
    };
  }
}
