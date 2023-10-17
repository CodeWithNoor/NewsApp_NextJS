
const getdata = async () => {
    const res = await fetch("http://localhost:3000/api/users/login")
    const data = await res.json()
    return data.users
}

const forgot = async() => {
    const userData = await getdata()
    console.log(userData)
    return (
        <>
            <div className="container">
                {userData.map((item, id) => (
                    <div key={id}>
                        <h1>{item._id}</h1>
                        <h1>{item.email}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default forgot