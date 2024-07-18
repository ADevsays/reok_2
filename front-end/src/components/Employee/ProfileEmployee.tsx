interface Props{
    username:string, 
}

function ProfileEmployee({username}:Props) {
    return (
        <div className="text-black flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 rounded-full">
                    <img src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=" alt="ProfileEmployee picture mock" />
                </div>
                <div>
                    <p className="text-blue-500 font-semibold">{username}</p>
                    <small className="text-xs block text-gray-600">Empleado</small>
                </div>
            </div>
        </div>
    );
}

export default ProfileEmployee;