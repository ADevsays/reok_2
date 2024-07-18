import HeaderClose from "../../components/UI/HeaderClose";
import ContainerPlans from "../../components/UserCar/ContainerPlans";

function BuyPlan() {
    return (
        <main className="w-full h-screen bg-gray-200 gap-24 flex justify-start items-center flex-col">
            <HeaderClose/>
            <ContainerPlans/>
        </main>
    );
}

export default BuyPlan;