import DashboardBox from "@/components/DashboardBox"
import HomeSidebar from "../home-sidebar"
import SystemsSidebar from "../systems-sidebar"

const SideBar = () => {
    return (
    <>
        <DashboardBox sx={{ width: 'min-content', mb: '0.5rem'}}>
            <HomeSidebar />
        </DashboardBox>
        <DashboardBox sx={{ width: 'min-content'}}>
            <SystemsSidebar />
        </DashboardBox>
    </>
    );
};

export default SideBar;