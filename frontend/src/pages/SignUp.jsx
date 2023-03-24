import { useState } from "react";
import { axiosRequest } from "api";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// components
import { InputField, Back } from "components";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
};

export default function Register() {
  const [{ firstName, lastName, email, password, confirm_password }, setState] =
    useState(initialState);

  const navigate = useNavigate();
  const [error, setError] = useState();

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(initialState);

    if (password !== confirm_password) {
      swal
        .fire({
          title: error,
          text: 'Password Does not match',
          icon: "error",
        })
        .then((result) => {
          if (result.isConfirmed) {
            return;
          }
        });
    } else {
      try {
        const datas = {
          firstName,
          lastName,
          email,
          password,
        };

        const response = await axiosRequest.post("/signup", datas);

        const { status } = response;

        if (status === 201) {
          swal
            .fire({
              title: "Successfully Signup",
              text: "click ok to continue",
              icon: "success",
            })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/Home");
              }
            });
        }
      } catch (error) {
        const { status } = error.response;

        if (status === 500) {
          swal.fire({
            title: "Oops!! Error 500",
            text: "server not found",
            icon: "warning",
          });
        }

        if (status === 404) {
          swal.fire({
            title: "Oops!!",
            text: "something went wrong, please try again :(",
            icon: "warning",
          });
        }

        if (status === 409) {
          swal.fire({
            title: "Error",
            text: "Email already taken!",
            icon: "warning",
          });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-evenly m-auto pl-5 pr-5 max-w-[1240px] h-screen">
      <div className="w-[50%]">
        <img src="./images/logo.png" alt="logo" />
      </div>

      <div className="flex items-center justify-center w-[50%] h-[80%] p-10 bg-amber-200 rounded-xl">
        <form
          className="m-w-[50%] w-[400px] h-fit"
          onSubmit={(event) => onSubmit(event)}
        >
          <div className="py-8">
            <h1 className="text-4xl font-bold my-2">Register Account</h1>
            <p className="text-gray-400 w-80"></p>
          </div>

          <div class="mb-6 grid grid-cols-2 gap-2">
            <InputField
              type="text"
              name="firstName"
              value={firstName}
              onChange={(event) => onChange(event)}
              placeholder="Firstname"
              required
            />
            <InputField
              type="text"
              name="lastName"
              value={lastName}
              onChange={(event) => onChange(event)}
              placeholder="Lastname"
              required
            />
          </div>

          <div className="mb-6">
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={(event) => onChange(event)}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="mb-6">
            <InputField
              type="password"
              name="password"
              value={password}
              onChange={(event) => onChange(event)}
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-600 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-6">
            <InputField
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={(event) => onChange(event)}
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-600 focus:outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div class="text-center lg:text-left">
            <button
              type="submit"
              class="bg-white  hover:bg-amber-400 max-w-[400px] w-full rounded-md p-4 shadow-md hover:shadow-xl font-bold text-xl"
            >
              Sign Up
            </button>
            <Back to="/" />
          </div>
        </form>
      </div>
    </div>
  );
}
