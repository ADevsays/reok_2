import { Toaster } from "sonner";
import AsideEmployee from "../components/Employee/AsideEmployee";
import ProfileEmployee from "../components/Employee/ProfileEmployee";
import useUser from "../store/loggin";

function Dashboard({children}:{children:React.ReactNode}) {
    const { user } = useUser();
    return (
        <main className="w-full h-screen bg-gray-300 gap-24 overflow-y-scroll">
            <header className="w-full flex items-center justify-end p-3 bg-[#f8f4f3]">
                {user && <ProfileEmployee username={user?.username} />}
            </header>
            <Toaster richColors/>
            <AsideEmployee />
            {children}
        </main>
    );
}

export default Dashboard;