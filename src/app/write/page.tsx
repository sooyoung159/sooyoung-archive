import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { WriteEditor } from "./write-editor";

export default async function WritePage() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "true") {
    redirect("/login");
  }
  return <WriteEditor />;
}
