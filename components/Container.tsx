import React, { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Container: React.FC<ContainerProps> = ({
  as: Element = "div",
  children,
  className = "",
  ...rest
}) => {
  return (
    <Element {...rest} className={`px-5 py-5 m-auto ${className}`}>
      {children}
    </Element>
  );
};
