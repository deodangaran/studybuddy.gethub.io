import{ useState } from "react";
import { axiosRequest } from "api";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const initialState = {
  context: "",
  topic: "",
  subject: "",
};

export default function ContextForm() {
  const [{ context, topic, subject }, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState('400px');

  const url = "/generate";

  const navigate = useNavigate();

  const generate = async () => {
    if (!topic || !subject) {
      swal.fire({
        title: "Please enter subject and topic!",
        icon: "warning",
      });
      return;
    }

    try {
      const datas = { context };
      setLoading(true);

      const response = await axiosRequest.post(url, datas);

      setLoading(false);

      const { status, data } = response;

      if (status === 200) {
        navigate("/Test", {
          state: {
            data: data.data,
            context: context,
            topic: topic.toUpperCase(),
            subject: subject.toUpperCase(),
          },
        });
      }
      if (status === 204) {
        swal.fire({
          title: "Invalid Context!",
          text: "Please input a valid context and try again...",
          icon: "warning",
        });
        setLoading(false);
      }
    } catch (e) {
      const { data } = e.response;
      swal.fire({
        title: "Error!",
        text: "An error has occurred while generating questions and answers for the current context. Please try other context. If error still persists, contact the programmers.",
        icon: "error",
      });
      setLoading(false);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResize = (event) => {
    setHeight(event.target.scrollHeight);
  }

  return (
    <div className="flex flex-col m-8 gap-y-10 items-center ">
      <div className=" flex flex-col w-full  space-y-5 items-center">
        <div className="flex space-x-4 w-full">
          <input type='text'
            name="subject"
            value={subject.toUpperCase()}
            onChange={(event) => onChange(event)}
            placeholder="Subject"
            className="font-medium p-2 focus:outline focus:outline-offset-2 focus:outline-white/50 shadow-inner rounded-lg dark:bg-zinc-800/50 dark:text-white placeholder:dark:text-white/50"
          ></input>
          <input type='text'
            name="topic"
            value={topic.toUpperCase()}
            onChange={(event) => onChange(event)}
            placeholder="Topic"
            className="font-medium p-2 focus:outline focus:outline-offset-2 focus:outline-white/50 shadow-inner rounded-lg dark:bg-zinc-800/50 dark:text-white placeholder:dark:text-white/50"
          ></input>
        </div>
        <textarea
          name="context"
          onChange={(event) => onChange(event)}
          onClick={handleResize} 
          style={{ height: height }}
          value={context}
          rows="18"
          className="focus:outline focus:outline-offset-2 focus:outline-white/50 text-xl shadow-inner  rounded-lg block resize-none p-4 w-full h-96 dark:bg-zinc-800/50 dark:text-white placeholder:dark:text-white/50"
          placeholder="Input your context here..."
        ></textarea>
        <button
          onClick={generate}
          className="p-4 bg-white dark:bg-zinc-800 dark:text-white w-fit rounded-lg drop-shadow-md"
        >
          {loading ? (
            <span>
              <i className="flex items-center" />
              <svg
                role="status"
                className="inline items-center mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Generating...
            </span>
          ) : (
            <span>Generate Question</span>
          )}
        </button>
      </div>
    </div>
  );
}
