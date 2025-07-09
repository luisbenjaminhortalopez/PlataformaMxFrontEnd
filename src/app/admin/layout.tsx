import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLayout as Layout } from "@admin/components";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Readonly<Props>) => {
  const isAuthenticated = (await cookies()).get("isAuthenticated")?.value;
  console.log("AdminLayout - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated || isAuthenticated !== "true") {
    return redirect("/login");
  }

  return <Layout>{children}</Layout>;
};

export default AdminLayout;
