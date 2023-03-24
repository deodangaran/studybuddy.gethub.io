import { Header, Navbar, Table } from "components"
import { useState, useEffect } from "react"
import { axiosRequest } from "api"
import { useNavigate } from "react-router-dom"

export default function History() {
    const url = "/history"

    const [data, setData] = useState(0);

    useEffect(() => {
        const showData = async () => {
            const response = await axiosRequest.get(url)
            const { status, data } = response

            if (status === 200) {
                setData(data.data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)))
            }
        }
        showData();
    }, []);

    const navigate = useNavigate()
    useEffect(() => {
        const checkLogin = async () => {
            const response = await axiosRequest.get('/login')
            const { status, data } = response
            if (status === 200) {
                if (!data.data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))) {
                    navigate('/')
                }
            }
        }
        checkLogin()
    }, [])

    return (
        <div className="flex flex-col h-full min-h-full">
            <div>
                <Header />
            </div>
            <div className="flex h-full min-h-screen">
                <Navbar />
                <div className="w-screen overflow-y bg-amber-200 dark:bg-zinc-700 outline-none p-10 pr-10 ">
                    <Table data={data} />
                </div>
            </div>
        </div>
    )
}