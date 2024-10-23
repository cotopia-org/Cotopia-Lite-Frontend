import { colors } from "@/app/const/vars"
import MoreHorizontal from "@/components/icons/more-horiz"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaPopover from "@/components/shared-ui/c-popover"
import React from "react"

interface Props {}

const WorkspaceActions = (props: Props) => {
  return (
    <CotopiaIconButton
      onClick={(e) => e.stopPropagation()}
      type="button"
      className="!bg-transparent hover:!bg-black/[0.10] w-6 h-6"
    >
      <MoreHorizontal size={16} color={colors.grayscale.grayscaleSubtitle} />
    </CotopiaIconButton>
  )

  return (
    <CotopiaPopover
      trigger={
        <CotopiaIconButton
          type="button"
          className="!bg-transparent hover:!bg-black/[0.10] w-6 h-6"
        >
          <MoreHorizontal
            size={16}
            color={colors.grayscale.grayscaleSubtitle}
          />
        </CotopiaIconButton>
      }
      contentClassName="w-auto p-1"
    >
      <>workspace options</>
    </CotopiaPopover>
  )
}

export default WorkspaceActions
