import Logo from "@/components/shared/logo";
import UserInfo from "@/components/dashboard/sidebar/user-info";
import { currentUser } from "@clerk/nextjs/server";
import SidebarNavAdmin from "./nav-admin";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = async ({isAdmin }: SidebarProps) => {
  const user = await currentUser(); // Ensure async call

  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
      <Logo width="100%" height="180px" />
      <span className="mt-3" />
      {user && <UserInfo user={user} />}
      {isAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />  }
      
    </div>
  );
};

export default Sidebar;
