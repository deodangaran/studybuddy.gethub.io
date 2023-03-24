import { ContextForm, Header, Navbar } from "components";
import { useEffect } from "react";
import { axiosRequest } from "api";
import { useNavigate } from "react-router-dom";

export default function Home() {
 
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      const response = await axiosRequest.get("/login");
      const { status, data } = response;
      if (status === 200) {
        if (!data.data) {
          navigate("/");
        }
      }
    };
    checkLogin();
  }, []);

  return (
      <div className="flex flex-col h-screen">
        <div>
          <Header />
        </div>
        <div className="flex h-full">
          <Navbar />
          <div className="w-screen h-full bg-amber-200 dark:bg-zinc-700">
            <ContextForm />
          </div>
        </div>
      </div>
  );
}
