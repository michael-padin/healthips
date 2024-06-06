import { Timestamp } from "firebase/firestore"

export const timestampToDate = ({
  seconds,
  nanoseconds,
}: {
  seconds: number
  nanoseconds: number
}) => {
  const timestamp = new Timestamp(seconds, nanoseconds)

  const date = timestamp.toDate()

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}
