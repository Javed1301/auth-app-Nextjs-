export default async function UserProfile({ params }: { params: { id: string } }) {
    const paramsId = params.id;
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <hr className="w-1/2 mb-4" />
            <h3 className="text-lg">req param: <span className="font-mono">{paramsId}</span></h3>
        </div>
    )
}