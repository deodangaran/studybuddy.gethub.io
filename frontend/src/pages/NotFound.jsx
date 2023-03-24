import { useNavigate } from "react-router-dom"
import { Header, Footer } from "components"

export default function NotFound() {
    const navigate = useNavigate()
    const back = () => {
        navigate('/Home')
    }

    return (
        <div className="grid-container w-screen h-screen bg-slate-50">
            <Header />
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-amber-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-600 md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <button onClick={back} className="inline-flex text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Back to Homepage</button>
                </div>
            </div>
        </div>
    )
}
