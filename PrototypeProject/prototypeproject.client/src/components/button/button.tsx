import React from "react";
import { type IconType } from "react-icons/lib";
import "./button.css";
import { Link, type To } from "react-router";

export type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>;
  btnKey?: string | number;
  title?: string;
  variant?: "primary" | "secondary" | "tertiary" | "red" | "nav-item-primary" | "nav-item-secondary" | "no-style";
  children?: React.ReactNode;
  customCss?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties;
  icon?: IconType;
  iconPosition?: "left" | "middle" | "right";
  to?: To;
};

const Button: React.FC<ButtonProps> = ({
  ref,
  btnKey = Math.random().toString(36).substring(2, 15),
  title,
  variant = "primary",
  children,
  customCss = false,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  style = {},
  icon = undefined,
  iconPosition = "left",
  to = undefined,
}) => {
  const GetClassNames = () => {
    var classNames = `evf-button evf-button-${variant}`;
    if (to) classNames += " button-link";

    if (customCss) classNames = className;
    else classNames += ` ${className}`;
    return classNames;
  };

  const IconComponent = icon;
  const LeftIcon =
    IconComponent && iconPosition === "left" ? (
      <span className="icon" style={{ marginRight: 8 }}>
        <IconComponent />
      </span>
    ) : null;
  const RightIcon =
    IconComponent && iconPosition === "right" ? (
      <span className="icon" style={{ marginLeft: 8 }}>
        <IconComponent />
      </span>
    ) : null;

  const MiddleIcon =
    IconComponent && iconPosition === "middle" ? (
      <span className="icon">
        <IconComponent />
      </span>
    ) : null;

  const GetContent = (content: React.ReactNode) => {
    return (
      <>
        {LeftIcon}
        {MiddleIcon ? MiddleIcon : content}
        {RightIcon}
      </>
    );
  };

  return (
    <button ref={ref} key={btnKey} type={type} onClick={to ? undefined : onClick} disabled={disabled} style={style} className={GetClassNames()}>
      {to ? (
        <Link className="reset-link full-link" to={to}>
          {GetContent(
            <>
              {title}
              {children}
            </>,
          )}
        </Link>
      ) : (
        GetContent(
          <>
            {title}
            {children}
          </>,
        )
      )}
    </button>
  );
};

export default Button;
