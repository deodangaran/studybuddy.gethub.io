import { useState, useEffect } from "react";
import { axiosRequest } from "api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar, Header } from "components";
import { Check, X, Star } from "react-feather";

export default function TestHistory() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [height, setHeight] = useState("150px");
  const navigate = useNavigate();

  const url = `/history/test?id=${searchParams.get("id")}`;

  const [questions, setQuestions] = useState([]);

  const handleResize = (event) => {
    setHeight(event.target.scrollHeight);
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await axiosRequest.get(url);
        const { status, data } = response;

        if (status === 200) {
          setData(data.data);
          setQuestions(data.data.questions);
        }
      } catch (e) {
        const { status } = e.response;
        if (status === 404 || status == 401) {
          // code when no context is found
          navigate("/404");
        }
      }
    };

    getHistoryData();
  }, [navigate, url]);

  const getLetter = (index) => {
    const letters = ["A", "B", "C", "D"];
    return letters[index];
  };

  const retake = () => {
    const d = {
      data: questions,
      context: data.context,
      topic: data.topic,
      subject: data.subject,
      conID: data.id,
    };
    navigate("/Test", { state: d, replace: true });
  };

  return (
    <div className="flex flex-col min-h-full">
      <div>
        <Header />
      </div>
      <div className="flex h-full">
        <Navbar />
        <div className="w-screen overflow-y min-h-screen h-full  bg-amber-200 dark:bg-zinc-700 outline-none p-10 pr-10 ">
          {data ? (
            <>
              <div className="flex flex-col m-8 mt-5 gap-y-10 items-center ">
                <div className=" flex flex-col w-full h-fit space-y-5 items-center">
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row gap-x-4 items-end">
                      <div className="flex flex-row bg-white shadow-inner items-center rounded-md overflow-hidden w-fit dark:bg-zinc-800/50">
                        <div className="bg-gray-200 dark:bg-zinc-800 h-full flex items-center p-2 px-3">
                          <p className="text-base dark:text-white/80 uppercase opacity-60">
                            Subject
                          </p>
                        </div>
                        <p className="p-2 pr-4 pl-4 text-base text-gray-700 dark:text-white/90 uppercase font-medium">
                          {data.subject}
                        </p>
                      </div>
                      <div className="flex flex-row bg-white shadow-inner items-center rounded-md overflow-hidden w-fit dark:bg-zinc-800/50">
                        <div className="bg-gray-200 dark:bg-zinc-800 h-full flex items-center p-2 px-3">
                          <p className="text-base dark:text-white/80 uppercase opacity-60">
                            Topic
                          </p>
                        </div>
                        <p className="p-2 pr-4 pl-4 text-base text-gray-700 dark:text-white/90 uppercase font-medium ">
                          {data.topic}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-x-3 justify-end w-30">
                      <div className="flex flex-col">
                        <div className="flex flex-row shadow-inner bg-white items-center rounded-md overflow-hidden dark:bg-zinc-800/50">
                          <div className="bg-gray-200 h-full flex items-center p-2 px-3 dark:bg-zinc-800">
                            <p className="text-base uppercase dark:text-white/80 opacity-60">
                              Score
                            </p>
                          </div>
                          <div className="w-full items-center justify-center flex">
                            <p className="px-3 py-2 text-base text-gray-700 dark:text-white/90 font-bold">
                              {data.score}/{questions.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={retake}
                        className="bg-green-300 text-green-700 dark:bg-yellow-600 dark:text-white rounded-lg px-5 py-2 font-bold shadow"
                      >
                        Retake Test
                      </button>
                    </div>
                  </div>
                  <textarea
                    name="context"
                    onClick={handleResize}
                    style={{ height: height }}
                    value={data.context}
                    className="shadow-inner resize-none overflow-hidden outline-gray-300 rounded-lg block dark:bg-zinc-800/50 dark:text-white p-4 w-full text-sm "
                    placeholder="Input your context here..."
                  ></textarea>
                </div>
              </div>
              <p className="font-medium mx-8 dark:text-white">
                MULTIPLE CHOICE TEST{" "}
              </p>
              <div className="flex flex-col  mx-8 mt-2 gap-y-3 h-fit bg-white dark:bg-zinc-800/50 rounded-lg p-10 dark:text-white">
                {questions.map((question, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-y-5">
                      <p className="font-medium">
                        {index + 1}. {question.question}
                      </p>
                      <div className="flex flex-col ml-2 items-start gap-y-2">
                        {question.choices.map((choice, i) => {
                          return (
                            <div key={i} className="w-full flex flex-row">
                              <input
                                id={`c-${index}-${i}`}
                                type="radio"
                                name={index}
                                value={choice}
                                className="hidden peer"
                                disabled
                              />

                              <label
                                htmlFor={`c-${index}-${i}`}
                                className={`rounded border dark:border-white/25 flex flex-row justify-between  items-center w-full
                                                ${
                                                  question.userAnswer ===
                                                    choice &&
                                                  question.answer ===
                                                    question.userAnswer
                                                    ? "bg-green-100 dark:bg-green-700/25"
                                                    : question.userAnswer ===
                                                      choice
                                                    ? "bg-red-100 dark:bg-red-700/25"
                                                    : ""
                                                }
                                                ${
                                                  question.userAnswer !==
                                                    choice &&
                                                  question.answer === choice
                                                    ? "border-green-300 dark:border-green-700"
                                                    : ""
                                                }
                                                `}
                              >
                                <div className="flex flex-row gap-x-3">
                                  <p
                                    className={`bg-gray-100 dark:bg-zinc-700 py-2 px-5 font-medium
                                                    ${
                                                      question.userAnswer ===
                                                        choice &&
                                                      question.answer ===
                                                        question.userAnswer
                                                        ? "bg-green-300 dark:bg-green-700/75"
                                                        : question.userAnswer ===
                                                          choice
                                                        ? "bg-red-300 dark:bg-red-700/50"
                                                        : ""
                                                    }
                                                    ${
                                                      question.answer ===
                                                        choice &&
                                                      question.userAnswer !==
                                                        choice
                                                        ? "bg-green-300 dark:bg-green-700/75"
                                                        : ""
                                                    }
                                                    `}
                                  >
                                    {getLetter(i)}
                                  </p>
                                  <p className="py-2 ">{choice}</p>
                                </div>
                                <div className="p-2">
                                  {question.userAnswer === choice ? (
                                    question.answer === question.userAnswer ? (
                                      <Check className="w-5" />
                                    ) : (
                                      <X className="w-5" />
                                    )
                                  ) : null}
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
