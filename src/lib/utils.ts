import { __VARS } from "@/app/const/vars"
import { mergePropsMain } from "@/components/shared/room/sessions/room-audio-renderer/use-media-track-by-source-or-name/merge-props"
import { ScheduleType } from "@/types/calendar"
import { UserMinimalType } from "@/types/user"
import { TrackReferenceOrPlaceholder } from "@livekit/components-react"
import { Node } from "@xyflow/react"
import { type ClassValue, clsx } from "clsx"
import { Track } from "livekit-client"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const querystring = require("querystring")
const getQueryParams = (obj: object) => querystring.stringify(obj)

export function urlWithQueryParams(url: string, object: any) {
  if (typeof object !== "object") return ""

  if (!url) return ""

  const params = getQueryParams(object)

  return `${url}?${params}`
}

export const isScreenShareExist = (tracks: TrackReferenceOrPlaceholder[]) => {
  let hasShareScreen = false
  let shareScreenTrack = []

  for (let track of tracks) {
    if (track.source === Track.Source.ScreenShare) {
      hasShareScreen = true
      shareScreenTrack.push(track)
    }
  }
  return {
    hasShareScreen,
    shareScreenTrack: shareScreenTrack?.[0] || null,
  }
}

export const getUserFullname = (user: any) => {
  let fullName = user?.username

  if (user?.name) fullName = user?.name

  return fullName
}

export function isProp<
  U extends HTMLElement,
  T extends React.HTMLAttributes<U>
>(prop: T | undefined): prop is T {
  return prop !== undefined
}

export function mergeProps<
  U extends HTMLElement,
  T extends Array<React.HTMLAttributes<U> | undefined>
>(...props: T) {
  return mergePropsMain(...(props.filter(isProp) as any))
}

const DEFAULT_X = 0
const DEFAULT_Y = 0

export function doCirclesMeet(
  circle1?: UserMinimalType,
  circle2?: UserMinimalType
) {
  if (!circle2 || !circle1)
    return {
      distance: undefined,
      meet: false,
      volumePercentage: 0,
    }

  const radius = 46 // radius of each circle
  const radiusHearing = __VARS.voiceAreaRadius - 50

  const userCoordinate1 = circle1.coordinates?.split(",")?.map((x) => +x) ?? [
    DEFAULT_X,
    DEFAULT_Y,
  ]
  const user1Position = { x: userCoordinate1[0], y: userCoordinate1[1] }
  const userCoordinate2 = circle2.coordinates?.split(",")?.map((x) => +x) ?? [
    DEFAULT_X,
    DEFAULT_Y,
  ]
  const user2Position = { x: userCoordinate2[0], y: userCoordinate2[1] }

  // Calculate the distance between the centers of the circles
  const distance = Math.sqrt(
    Math.pow(user1Position.x - user2Position.x, 2) +
      Math.pow(user1Position.y - user2Position.y, 2) // Fixed y-coordinate difference calculation
  )

  // Check if the distance is less than or equal to the sum of the radii
  const meet = distance <= 2 * radius + radiusHearing

  const percentage = !meet
    ? 0
    : 100 - Math.min((distance / radiusHearing) * 100, 100)

  return { meet, distance, volumePercentage: percentage }
}

export function convertMinutesToHHMMSS(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes % 60)
  const secs = Math.floor((minutes * 60) % 60)

  const formattedHours = String(hours).padStart(2, "0")
  const formattedMinutes = String(mins).padStart(2, "0")
  const formattedSeconds = String(secs).padStart(2, "0")

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const getMiddleIndex = (length: number) => Math.floor((length - 1) / 2)

export const getFocusedMessage = ({
  message,
  targetIndex,
  changingClass,
  removeTimeout = 1500,
}: {
  message: HTMLDivElement
  targetIndex: number
  removeTimeout?: number
  changingClass: string[]
}): { focusHandler: () => void | undefined } => {
  if (message === undefined || targetIndex < 0)
    return { focusHandler: () => {} }

  const findFocusedMessage = () => {
    const nodes = message.childNodes as NodeListOf<HTMLDivElement>
    setTimeout(() => {
      for (let item of nodes) {
        const datesetIndex = item.dataset?.index
        if (datesetIndex === undefined) return
        if (Number(datesetIndex) === Number(targetIndex)) {
          changingClass.map((clss) => {
            return item.classList.add(clss)
          })
          setTimeout(() => {
            changingClass.map((clss) => {
              return item.classList.remove(clss)
            })
          }, removeTimeout)
        }
      }
    }, 500)
  }

  return { focusHandler: findFocusedMessage }
}

export function getDay(index: number) {
  const days: { [key: number]: string } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }
  return days[index]
}

export function convertCoordinateString(coords: string) {
  if (!coords) return

  if (!coords.includes(",")) return

  const coordsObject = coords.split(",")

  return {
    x: coordsObject[0] ? +coordsObject[0] : 0,
    y: coordsObject[1] ? +coordsObject[1] : 0,
  }
}

type Item = {
  id: string | number
  [key: string]: any // Other properties
}

export function uniqueById(items: Item[]): Item[] {
  const uniqueItems = items.reduce((acc, item) => {
    acc.set(item.id, item)
    return acc
  }, new Map<string | number, Item>())

  return Array.from(uniqueItems.values())
}

export const limitChar = (inputString: string, maxLength: number) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength) + "..."
  }
  return inputString
}

export const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const timeStringToMoment = (time: string) => {
  const timesArray = time.split(":")

  const hour = timesArray[0]
  const minutues = timesArray[1]

  const momentDate = moment()

  momentDate.set({
    hours: +hour,
    minutes: +minutues,
  })

  return momentDate
}

export const estimateTotalHoursBySchedules = (schedules: ScheduleType[]) => {
  let hours = 0

  if (schedules.length === 0) return 0

  for (let schedule of schedules) {
    for (let scheduleDay of schedule.days) {
      for (let time of scheduleDay.times) {
        const startMoment = timeStringToMoment(time.start)
        const endMoment = timeStringToMoment(time.end)

        const diffMinutes = endMoment.diff(startMoment, "minutes")
        const diffHours = Math.round(diffMinutes / 60)

        hours += diffHours
      }
    }
  }

  return hours
}

export const thunkResHandler = (
  thunkRes: Promise<any>,
  thunkKey: string,
  onSuccess: (res: any) => void,
  onError: (res: any) => void
): void => {
  thunkRes.then((res) => {
    if (res.type === `${thunkKey}/fulfilled`) {
      onSuccess(res)
    } else if (res.type === `${thunkKey}/rejected`) {
      onError(res)
    }
  })
}

export const checkNodesCollision = (myNode: Node, targetNode: Node) => {
  //get target node position
  let target_x = targetNode?.position?.x
  let target_y = targetNode?.position?.y

  console.log(targetNode, "TARGETNODE")
  const target_position = target_x && target_y
  //get my node position

  let my_node_x = myNode.position.x
  let my_node_y = myNode.position.y

  const my_node_position = my_node_x && my_node_y

  let COLLISION_MARGIN = __VARS.collisionMargin
  //find center of target node
  let target_measure_w = targetNode?.measured?.width
  let target_measure_h = targetNode?.measured?.height
  let my_node_measure_w = myNode?.measured?.width
  let my_node_measure_h = myNode?.measured?.height

  if (!target_measure_w || !target_measure_h)
    return { x_position: target_x, y_position: target_y }
  if (!my_node_measure_w || !my_node_measure_h)
    return { x_position: my_node_x, y_position: my_node_y }

  let target_radius = target_measure_w / 2
  let my_node_radius = my_node_measure_w / 2

  const center_x = target_x + target_measure_w / 2
  const center_y = target_y + target_measure_h / 2

  const my_center_x = my_node_x + my_node_measure_w / 2
  const my_center_y = my_node_y + my_node_measure_h / 2

  let total_radius = target_radius + my_node_radius
  let distance = total_radius

  let has_collied = false

  if (my_node_position && target_position) {
    distance = Math.sqrt(
      Math.pow(center_x - my_center_x, 2) + Math.pow(center_y - my_center_y, 2)
    )
  }

  if (target_measure_w) {
    COLLISION_MARGIN = target_measure_w
  }

  let top_dir = false
  let bottom_dir = false
  let left_dir = false
  let right_dir = false

  if (my_node_x <= target_x + target_measure_w) {
    right_dir = true
  } else {
    right_dir = false
  }
  if (my_node_x + my_node_measure_w > target_x) {
    left_dir = true
  } else {
    left_dir = false
  }
  if (my_node_y <= target_y + target_measure_h) {
    bottom_dir = true
  } else {
    bottom_dir = false
  }
  if (my_node_y + my_node_measure_h > target_y) {
    top_dir = true
  }

  let final_x = target_x
  let final_y = target_y

  if (right_dir) {
    final_x = target_x + COLLISION_MARGIN
    final_y = my_node_y
  }
  if (left_dir) {
    final_x = target_x - my_node_measure_w
    final_y = my_node_y
  }
  if (bottom_dir) {
    final_x = my_node_x
    final_y = target_y + my_node_y
  }
  if (top_dir) {
    final_x = my_node_x
    final_y = target_y - my_node_measure_h
  }

  if (distance <= total_radius) {
    has_collied = true
  }

  return { x_position: final_x, y_position: final_y, distance, has_collied }
}
