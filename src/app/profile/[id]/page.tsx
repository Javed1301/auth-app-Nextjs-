export default function UserProfile({params}:any){
    return(
        <div className="flex justify-center align-middle flex-col">
            <h2>Profile</h2>
            <hr />
            <h3>req param {params.id}</h3>

        </div>
    )
}