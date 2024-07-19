import { Toaster } from "sonner";
import Dashboard from "../../Layouts/Dashbord";
import VisualCars from "../../components/Cars/VisualCars";

function PendingCars() {
    return (
        <Dashboard>
            <Toaster/>
            <VisualCars/>
        </Dashboard>
    );
}

export default PendingCars;