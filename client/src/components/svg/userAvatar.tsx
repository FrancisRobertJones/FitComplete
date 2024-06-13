import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatar() {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src="/placeholder-user.jpg" />
    </Avatar>
  )
}