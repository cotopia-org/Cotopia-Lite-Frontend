"use client"

import { Fragment, ReactNode, useRef } from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu"

export type ContextItemType = {
  title: string
  icon?: ReactNode
  onClick?: () => void
  linkEl?: (el: ReactNode) => void
  className?: string
  hasDivider?: boolean
  children?: ContextItemType[]
}

type ContextMenuProps = {
  items: ContextItemType[]
  beforeNode?: ReactNode
  trigger: ReactNode
  triggerClss?: string
  width?: number
  className?: string
}

const ContextItemWrapper = ({
  item,
  className = "",
}: {
  item: ContextItemType
  className?: string
}) => {
  let title = item.title
  let icon = item.icon

  const itemRef = useRef<HTMLDivElement | null>(null)
  let clss = className
  clss += " capitalize"

  let iconContent = null
  if (!!icon) iconContent = <ContextMenuShortcut>{icon}</ContextMenuShortcut>

  const clickItemHandler = () => {
    if (!!item.onClick) return item.onClick()
    if (!!item.linkEl) return item.linkEl(itemRef.current as ReactNode)
  }
  return (
    <ContextMenuItem onSelect={clickItemHandler} ref={itemRef} className={clss}>
      {title}
      {iconContent}
    </ContextMenuItem>
  )
}

const CotopiaContextMenu = ({
  items,
  trigger,
  triggerClss,
  width = 200,
  beforeNode,
}: ContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerClss}>{trigger}</ContextMenuTrigger>
      <ContextMenuContent style={{ width }}>
        {beforeNode && beforeNode}
        {items.map((item, k) => {
          let clss = item?.className || ""

          let content = <ContextItemWrapper item={item} className={clss} />

          if (!!item?.children) {
            content = (
              <ContextMenuSub>
                <ContextMenuSubTrigger>{item.title}</ContextMenuSubTrigger>
                <ContextMenuSubContent style={{ width }}>
                  {item.children.map((child, k) => {
                    return (
                      <Fragment key={k + 1}>
                        <ContextItemWrapper
                          item={child}
                          className={child?.className || ""}
                        />
                        {child?.hasDivider && <ContextMenuSeparator />}
                      </Fragment>
                    )
                  })}
                </ContextMenuSubContent>
              </ContextMenuSub>
            )
          }
          return (
            <Fragment key={k + 1}>
              {content}
              {item?.hasDivider && <ContextMenuSeparator />}
            </Fragment>
          )
        })}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default CotopiaContextMenu
