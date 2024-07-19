import { Toaster } from "sonner";
import HeaderClose from "../../components/UI/HeaderClose";
import CarState from "../../components/UserCar/CarState";

function ProfileView() {
 
    return (
        <main className="w-full h-screen bg-gray-200 gap-12 flex justify-start items-center flex-col overflow-y-scroll pb-12">
            <Toaster/>
            <HeaderClose/>
            <CarState/>
        </main>
    );
}

export default ProfileView;