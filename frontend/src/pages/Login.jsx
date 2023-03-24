import { useState, useEffect } from "react"
import { InputField } from "components"
import { Link, useNavigate } from "react-router-dom"
import { axiosRequest } from "api"
import swal from "sweetalert2"
  
export default function Login() {

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
}

  const navigate = useNavigate();

  const [{ email, password, rememberMe }, setState] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    const checkLogin = async () => {
      const response = await axiosRequest.get('/login')
      const { status, data } = response
      if (status === 200) {
        if (data.data) {
          navigate('/Home')
        }
      }
    }
    checkLogin()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const datas = { email, password, rememberMe }
      await axiosRequest.post("/login", datas)
      
      navigate('/Home')
   
    } catch (error) {
      const { status } = error.response

      if (status === 500) {
        swal.fire({
          title: "Oops!! Error 500",
          text: "server not found",
          icon: "warning",
        })
      }

      if (status === 401) {
        swal.fire({
          title: "Oops!!",
          text: "something went wrong, please try again :(",
          icon: "warning",
        })
      }

      if (status === 404) {
        swal.fire({
          title: "Email or password is incorrect!",
          icon: "warning",
        })
      }
    }
  }

  return (
    <div className="flex items-center justify-evenly  m-auto pl-5 pr-5 max-w-[1240px] h-screen">
      <div className="w-[50%] select-none"><img src="./images/logo.png" alt="logo" /></div>
      <div className="flex items-center justify-center w-[50%] h-[80%] p-10 bg-amber-200 rounded-xl">
      <form className="m-w-[50%] w-[400px] h-fit" onSubmit={(event) => onSubmit(event)}>
        <div className="py-8">
          <h1 className="text-4xl font-bold my-2 select-none">
            Study Budy
          </h1>
        </div>

        <div className="mb-6">
          <InputField
            type="text"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            id="exampleFormControlInput2"
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-6">
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            id="exampleFormControlInput2"
            placeholder="Password"
            required
          />
        </div>
        <div className="text-center lg:text-left">
          <button
            type="submit"
            class="bg-white hover:bg-amber-400 max-w-[400px] w-full rounded-md p-4 shadow-md hover:shadow-xl font-bold text-xl"
          >
            Login
          </button>
          <p className=" text-sm font-semibold mt-2 pt-1 mb-0">
            Don't have an account?
            <Link
              to="/SignUp"
              class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out mx-2"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>

      </div>

    </div>   
  )
}
