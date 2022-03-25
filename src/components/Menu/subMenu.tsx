import React, {useContext, useState, FunctionComponentElement} from "react";
import classNames from "classnames";
import { MenuContext } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import Icon from "../icon/icon";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    const renderChildren = () => { 
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a menuItem")
            }
        })
        return (
            <ul className={subMenuClasses}>
                { childrenComponent }
            </ul>
        )
    }
    return (
        <li key={index} className={classes}>
            <div className="submenu-title" onClick={ handleClick }>
                {title}
                <Icon icon="angle-down" className = "arrow0icon"></Icon>
            </div>
            { renderChildren() }
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu