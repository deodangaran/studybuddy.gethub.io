import { Test, Header, Footer, Navbar } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate("/404");
    } else {
      setLoaded(true);
    }
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col h-full min-h-screen ">
      <div>
        <Header />
      </div>
      <div className="flex h-full">
        <Navbar />
        <div className="w-screen h-full  p-10 bg-amber-200 dark:bg-zinc-700">
          {isLoaded ? (
            <Test
              subject={location.state.subject}
              topic={location.state.topic}
              context={location.state.context}
              questions={location.state.data}
              conID={location.state.conID}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
