import { Toaster } from "sonner";
import Dashboard from "../../Layouts/Dashbord";
import BodyDashboard from "../../components/Employee/BodyDashboard";

function DashboardEmployee() {
    return (
        <Dashboard>
            <Toaster/>
            <BodyDashboard/>
        </Dashboard>
    );
}

export default DashboardEmployee;