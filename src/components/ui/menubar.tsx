"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "@/lib/utils"

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("z-50", className)}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarPortal = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Portal>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Portal
    // ref={ref}
    className={cn("z-50 flex space-x-4 bg-gray-100 p-2 rounded-md shadow-md", className)}
    {...props}
  />
))
MenubarPortal.displayName = MenubarPrimitive.Portal.displayName

const MenubarMenu = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Menu>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>
>(({ ...props }, ref) => (
  <MenubarPrimitive.Menu
    // ref={ref}
    // className={cn("relative", className)}
    {...props}
  />
))
MenubarMenu.displayName = MenubarPrimitive.Menu.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn("cursor-pointer", className)}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Content
    ref={ref}
    className={cn("min-w-24 bg-white rounded-2xl shadow-lg", className)}
    {...props}
  />
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-4 py-2 text-sm font-semibold text-gray-900", className)}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn("px-2 py-1 transition-all hover:bg-gray-100 hover:border-none rounded-md cursor-pointer", className)}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarGroup = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Group
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
MenubarGroup.displayName = MenubarPrimitive.Group.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn("px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer", className)}
    {...props}
  />
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.RadioGroup
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
MenubarRadioGroup.displayName = MenubarPrimitive.RadioGroup.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn("px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer", className)}
    {...props}
  />
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarItemIndicator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.ItemIndicator
    ref={ref}
    className={cn("absolute left-0 top-0 w-2 h-2 bg-blue-500 rounded-full", className)}
    {...props}
  />
))
MenubarItemIndicator.displayName = MenubarPrimitive.ItemIndicator.displayName

// const MenubarSub = React.forwardRef<
//   React.ElementRef<typeof MenubarPrimitive.Sub>,
//   React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>
// >(({  ...props }, ref) => (
//   <MenubarPrimitive.Sub
//     // ref={ref}
//     // className={cn("relative", className)}
//     {...props}
//   />
// ))
// MenubarSub.displayName = MenubarPrimitive.Sub.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn("px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer", className)}
    {...props}
  />
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn("absolute left-full top-0 mt-2 w-48 bg-white rounded-md shadow-lg", className)}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-gray-300", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarArrow = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Arrow
    ref={ref}
    className={cn("absolute top-0 left-0 w-2 h-2 bg-blue-500", className)}
    {...props}
  />
))
MenubarArrow.displayName = MenubarPrimitive.Arrow.displayName

export { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarPortal, 
  MenubarContent, 
  MenubarLabel, 
  MenubarItem, 
  MenubarGroup, 
  MenubarCheckboxItem, 
  MenubarRadioGroup, 
  MenubarRadioItem, 
  MenubarItemIndicator, 
//   MenubarSub, 
  MenubarSubTrigger, 
  MenubarSubContent, 
  MenubarSeparator, 
  MenubarArrow 
}
