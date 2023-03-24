import { Header, Navbar } from "components";
import { useEffect } from 'react'
import { axiosRequest } from "api";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate()
  useEffect(() => {
    const checkLogin = async () => {
      const response = await axiosRequest.get('/login')
      const { status, data } = response
      if (status === 200) {
        if (!data.data) {
          navigate('/')
        }
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="grid-container bg-slate-50  ">
      <Header />
      <div className="m-auto h-full flex justify-between">
        <Navbar />
        <div className="flex select-none dark:bg-zinc-700 justify-center w-full h-full bg-amber-200  ">
          <div className="flex m-10 flex-col mt-10 mb-10 dark:bg-zinc-800 gap-10 w- bg-white p-10 pr-20 pl-20 h-fit justify-between shadow-md rounded-xl">
            <div className="flex flex-col space-y-2 bg-white shadow-sm dark:bg-zinc-800/50 p-4 border dark:border-gray-700 dark:text-white rounded-xl opacity-80">
              <h1 className="font-bold bg-gray-200 p-2 rounded-md dark:bg-zinc-700/50 dark:text-white">ABOUT US</h1>
              <span className="p-3">
                {" "}
                Study Buddy is a web application that uses natural language
                processing to help students study more effectively. It can be
                used for reviewing for exams or for general self-improvement.
                The app provides immediate feedback on answers, allowing users
                to improve their studying. Some students prefer to study alone
                while others prefer to study in groups. Study Buddy can help
                both types of students improve their performance.{" "}
              </span>
            </div>

            <div className="flex flex-col space-y-2 bg-white shadow-sm p-4 border rounded-xl opacity-80 dark:bg-zinc-800 dark:border-gray-700 dark:text-white ">
              <h1 className="font-bold bg-gray-200 rounded-md dark:bg-zinc-700/50 p-2">FAQ’s</h1>
              <div className="p-3 flex flex-col gap-3">
                <div>
                  <h3 className="font-semibold">1. What is Study Buddy? </h3>
                  <ul className="flex items-baseline gap-2 pl-5">
                    <li>
                      <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                    </li>
                    <li>
                      <span>
                        Study Buddy is a web app that can help you review alone
                        without study partner.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">
                    2. How does Study Buddy Work?{" "}
                  </h3>
                  <ul className="flex items-baseline gap-2 pl-5">
                    <li>
                      <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                    </li>
                    <li>
                      {" "}
                      <span>
                        Study Buddy is fine-tune from T5 model, a language model
                        that trained to produce text.
                      </span>
                    </li>
                  </ul>
                  <ul className="flex items-baseline gap-2 pl-5">
                    <li>
                      <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                    </li>
                    <li>
                      {" "}
                      <span>
                        {" "}
                        It was optimized to produce question to later on answer
                        by a user using T5 model or text-to-text transform
                        transformer.{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">3. Can I see my history? </h3>
                  <ul className="flex items-baseline gap-2 pl-5">
                    <li>
                      <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                    </li>
                    <li>
                      <span>
                        You can see your history on the history page and review
                        your progress afterwards.{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1 bg-white shadow-sm p-4 border rounded-xl opacity-80 dark:bg-zinc-800 dark:border-gray-700 dark:text-white ">
              <h1 className="font-bold bg-gray-200 p-2 rounded-md dark:bg-zinc-700/50">
                FOR MORE INFO CONTACT US:
              </h1>
              <ul class="flex items-baseline gap-2 pl-5">
                <li>
                   <div class="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                 </li>
                 <li>
                    <a href="https://www.facebook.com/deo.dangaran.1">
                    <i class="fab fa-facebook"></i>
                    </a>
                   <span>deo.dangaran@students.isatu.edu.ph</span>
                </li>
              </ul>
              <ul className="flex items-baseline gap-2 pl-5">
                <li>
                  <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                </li>
                <li>
                  <span>jordiadelacruz8@gmail.com </span>
                </li>
              </ul>
              <ul className="flex items-baseline gap-2 pl-5">
                <li>
                  <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                </li>
                <li>
                  <span>serranoriajaphne@gmail.com </span>
                </li>
              </ul>
              <ul className="flex items-baseline gap-2 pl-5">
                <li>
                  <div className="w-2 h-2 bg-black rounded-full justify-self-start dark:bg-white"></div>
                </li>
                <li>
                  <span>paulyn.nocidad@students.isatu.edu.ph</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
