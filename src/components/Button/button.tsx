import classNames from "classnames";
import React  from "react";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
interface BaaseButtonProps {
    className ?: string;
    disabled?: boolean;
    size ?: ButtonSize;
    btnType ?: ButtonType;
    children: React.ReactNode;
    href?: string
}
type NativeButtonProps = BaaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
    const { 
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn', className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    if(btnType === ButtonType.Link && href) {
        return (
            <a
                href={href}
                className={classes}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}
export default Button
