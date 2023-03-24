import { Component, useEffect, useState } from "react";
import { Check, X, Star } from "react-feather";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "api";
import { StarRating } from "components";
import swal from "sweetalert2";

export default function Test({ subject, topic, context, questions, conID }) {
  const history_url = "/history";
  const validate_url = "/history/validate";

  const [selected, setSelected] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [score, setScore] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isSubmit, setSubmit] = useState(false);
  const [showModal, setModal] = useState(false);
  const navigate = useNavigate();
  const [contextID, setContextID] = useState(conID);

  useEffect(() => {
    const checkExist = async () => {
      try {
        const req = { context, questions };
        const response = await axiosRequest.post(validate_url, req);
        const { status } = response;

        if (status === 200) {
          return;
        }
      } catch (e) {
        const { status } = e.response;

        if (status === 403) {
          swal
            .fire({
              title: "Test already taken!",
              text: "It seems that you have already answered the generated questions.",
              icon: "warning",
              confirmButtonText: "CONFIRM",
            })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/Home", { replace: true });
              }
            });
        }
      }
    };

    if (!contextID) {
      checkExist();
    }
  }, [navigate, contextID]);

  const getLetter = (index) => {
    const letters = ["A", "B", "C", "D"];
    return letters[index];
  };

  const submit = () => {
    if (Object.keys(selected).length === questions.length) {
      setSubmit((prevState) => !prevState);

      let totalScore = 0;
      Object.keys(correct).forEach((key) => {
        if (correct[key]) totalScore += 1;
      });

      const percentage = Math.ceil(
        (totalScore / Object.keys(questions).length) * 100
      );

      setScore(totalScore);
      setPercent(percentage);
      setModal(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCorrect = (event, answer, choice) => {
    const { name } = event.target;
    setCorrect((prevState) => ({
      ...prevState,
      [name]: answer === choice ? true : false,
    }));
  };

  const confirm = async () => {
    setModal(false);

    try {
      const qa = questions.map((question, index) => {
        return {
          question: question.question,
          answer: question.answer,
          choices: question.choices,
          userAnswer: selected[index],
        };
      });

      const req = {
        topic: topic,
        subject: subject,
        context: context,
        score: score,
        questions: qa,
        id: contextID ? contextID : null,
      };
      const response = await axiosRequest.post(history_url, req);
      const { status, data } = response;

      if (status === 201) {
        navigate(`/History/Test?id=${data.data.id}`, { replace: true });
      }
    } catch (e) {}
  };

  const retake = () => {
    const d = {
      data: questions,
      context: context,
      topic: topic,
      subject: subject,
      conID: contextID,
    };
    navigate(0, { state: d, replace: true });
  };

  const generate = () => {
    navigate("/Home", { replace: true });
  };

  const getFeedback = () => {
    switch (true) {
      case percent == 0:
        return "Zero Score!";
      case percent > 0 && percent <= 25:
        return "Fair Score!";
      case percent >= 26 && percent <= 50:
        return "Good Score!";
      case percent >= 51 && percent <= 75:
        return "Very Good Score!";
      case percent >= 76 && percent <= 99:
        return "Excellent Score!";
      case percent == 100:
        return "Perfect Score!";
    }
  };

  return (
    <div className="flex flex-col gap-y-5 items-center">
      {showModal ? (
        <div className="w-full h-full bg-black/25 dark:bg-black/50 fixed top-0 left-0 right-0 z-50 flex flex-col justify-center items-center min-w-[200px]">
          <div className="flex flex-col bg-white dark:bg-zinc-700 rounded-lg text-center">
            <div className="p-3 dark:text-white rounded-lg dark:bg-zinc-800 overflow-hidden">
              <div className="p-5 rounded flex flex-col gap-y-1 items-center">
                <StarRating
                  correctAnswers={score}
                  totalQuestions={Object.keys(questions).length}
                />
                <div className="flex flex-col mt-3 items-center">
                  <p className="text-xl dark:text-white/80 text-black/70" >You've got a</p>
                  <p className="text-5xl font-bold dark:text-white">
                    {/* Call a functin that returns a string feedback based on percentage */}
                    {getFeedback()}
                  </p>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <p className="text-2xl dark:text-white/80 text-black/70  font-bold">
                        {score}
                      </p>{" "}
                    </div>
                    <p className="text-xl dark:text-white/80 text-black/70" > out of</p>
                    <div>
                      <p className="text-2xl dark:text-white/80 text-black/70  font-bold">
                        {Object.keys(questions).length}
                      </p>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row dark:bg-zinc-800 gap-y-2 justify-evenly p-3">
                <button
                  onClick={retake}
                  className="bg-white border shadow-sm hover:shadow-md hover:font-bold rounded px-6 py-3 font-semibold hover:dark:bg-white dark:text-black dark:font-bold dark:bg-white/80"
                >
                  RETAKE
                </button>
                <button
                  onClick={confirm}
                  className="bg-gwhite border shadow-sm hover:shadow-md hover:font-bold rounded px-6 py-3 font-semibold hover:dark:bg-white dark:text-black dark:font-bold dark:bg-white/80"
                >
                  REVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className=" w-full max-w-[900px] flex flex-col gap-y-3 h-fit bg-white  dark:bg-zinc-800/50 rounded-lg p-10 dark:text-white">
        {questions.map((question, index) => {
          return (
            <div key={index} className="flex flex-col gap-y-2 mb-5">
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
                        onChange={(e) => {
                          handleChange(e);
                          handleCorrect(e, question.answer, choice);
                        }}
                        disabled={isSubmit}
                      />

                      <label
                        htmlFor={`c-${index}-${i}`}
                        className={`rounded border dark:border-white/25 flex flex-row justify-between  items-center w-full
                                                ${
                                                  selected[index] === choice &&
                                                  !isSubmit
                                                    ? "bg-blue-700/25 dark:border-blue-700"
                                                    : ""
                                                }
                                                ${
                                                  correct[index] &&
                                                  selected[index] === choice &&
                                                  isSubmit
                                                    ? "bg-green-100 dark:bg-green-700/25"
                                                    : ""
                                                }
                                                ${
                                                  !correct[index] &&
                                                  selected[index] === choice &&
                                                  isSubmit
                                                    ? "bg-red-100 dark:bg-red-700/25"
                                                    : ""
                                                }
                                                ${
                                                  !correct[index] &&
                                                  question.answer === choice &&
                                                  isSubmit
                                                    ? "border-green-300 dark:border-green-700"
                                                    : ""
                                                }
                                                `}
                      >
                        <div className="flex flex-row gap-x-3  ">
                          <p
                            className={`bg-gray-100 dark:bg-zinc-700 py-2 px-5 font-medium
                                                    ${
                                                      selected[index] ===
                                                        choice && !isSubmit
                                                        ? "bg-blue-300 dark:bg-blue-700/50"
                                                        : ""
                                                    }
                                                    ${
                                                      correct[index] &&
                                                      selected[index] ===
                                                        choice &&
                                                      isSubmit
                                                        ? "bg-green-300 dark:bg-green-700/75"
                                                        : ""
                                                    }
                                                    ${
                                                      !correct[index] &&
                                                      selected[index] ===
                                                        choice &&
                                                      isSubmit
                                                        ? "bg-red-300 dark:bg-red-700/50"
                                                        : ""
                                                    }
                                                    ${
                                                      !correct[index] &&
                                                      question.answer ===
                                                        choice &&
                                                      isSubmit
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
                          {isSubmit && selected[index] === choice ? (
                            correct[index] ? (
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
        <div className="mt-5 flex items-center justify-center">
          {!isSubmit ? (
            <button
              className={
                Object.keys(selected).length === questions.length
                  ? `rounded-lg bg-blue-500 text-lg py-3 px-5 text-white hover:bg-blue-600 dark:bg-blue-700`
                  : `rounded-lg border-2 border-black/50 dark:border-white/50 text-lg py-3 px-5 dark:text-white/50 text-black/50 cursor-default`
              }
              onClick={submit}
            >
              SUBMIT ANSWER
            </button>
          ) : (
            <div className="flex flex-col gap-y-3"></div>
          )}
        </div>
      </div>
    </div>
  );
}
