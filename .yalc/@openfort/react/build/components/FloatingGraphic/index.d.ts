import React from "react";
type LogoGraphicProps = {
    size?: string;
    logo: React.ReactNode;
};
export declare const LogoGraphic: ({ size, logo }: LogoGraphicProps) => import("react/jsx-runtime").JSX.Element;
export declare const FloatingGraphic: ({ height, logoCenter, logoTopRight, logoTopLeft, logoBottomRight, logoBottomLeft }: {
    height?: string;
    logoCenter: LogoGraphicProps;
    logoTopRight?: LogoGraphicProps;
    logoTopLeft?: LogoGraphicProps;
    logoBottomRight?: LogoGraphicProps;
    logoBottomLeft?: LogoGraphicProps;
}) => import("react/jsx-runtime").JSX.Element;
export {};
