import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to search page which doesn't require initial database access
  redirect("/search")
}
