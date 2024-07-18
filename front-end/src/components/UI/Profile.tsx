interface Props{
    username:string, 
    firstName:string, 
    lastName:string, 
    rut:string | number
}

function Profile({username, firstName, lastName, rut}:Props) {
    return (
        <div className="text-black flex items-center border-b justify-between">
            <div className="flex items-center">
                <div className="w-16 rounded-full">
                    <img src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=" alt="profile picture mock" />
                </div>
                <div>
                    <p className="text-blue-500 font-semibold">{username}</p>
                    <p className="text-sm text-gray-700 ">{firstName} {lastName}</p>
                    <small className="text-xs block text-gray-600">{rut}</small>
                </div>
            </div>
            <div>
                <h4 className="font-bold pe-2">23498234</h4>
                <small className="text-xs">Chile</small>
            </div>
        </div>
    );
}

export default Profile;