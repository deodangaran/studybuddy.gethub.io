import { Header, Navbar } from "components";
import { useEffect } from 'react'
import { axiosRequest } from "api";
import { useNavigate } from "react-router-dom";

export default function Topics() {
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


  const TopicLink = ({ topic }) => (
    <a
      target="_blank"
      href={topic.url}
      className="flex uppercase dark:bg-zinc-600 dark:text-white bg-gray-200 items-center justify-between min-w-fit text-base h-20 rounded-xl shadow text-gray-600 font-semibold px-5 py-2.5 dark:hover:bg-gray-700 hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-400 focus:ring-amber-400"
    >
      {topic.title}
      <div className=" flex rounded-lg overflow-hidden h-full min-w-fit items-center shadow-md border dark:border-none"><img className=" w-[100px] h-full rounded-md" src={topic.logoUrl} /></div>
    </a>
  );

  const topicLinks = [
    {
      title: "History of Computer",
      url: "https://www.toppr.com/guides/computer-aptitude-and-knowledge/basics-of-computers/history-of-computers/#:~:text=Early%20History%20of%20Computer,-Since%20the%20evolution&text=One%20of%20the%20earliest%20and,was%20a%20general%2Dpurpose%20computer",
      logoUrl: "../images/pc.png",
    },
    {
      title: "Data Science",
      url: "https://www.ibm.com/cloud/learn/data-science-introduction",
      logoUrl: "../images/data.jpg",
    },
    {
      title: "Machine Learning",
      url: "https://www.ibm.com/cloud/learn/machine-learning",
      logoUrl: "../images/ml.jpg",
    },
    {
      title: "Introduction to Web Development",
      url: "https://www.theodinproject.com/lessons/foundations-introduction-to-web-development",
      logoUrl: "../images/web.jpg",
    },
    {
      title: "Mobile Application Development",
      url: "https://www.ibm.com/cloud/learn/mobile-application-development-explained",
      logoUrl: "../images/mobile.jpg",
    },
    {
      title: "Film 101",
      url: "https://www.masterclass.com/articles/film-101-what-is-cinematography-and-what-does-a-cinematographer-do",
      logoUrl: "../images/film.jpg",
    },
    {
      title: "Natural Language Processing",
      url: "https://monkeylearn.com/blog/what-is-natural-language-processing/?fbclid=IwAR0oat74xjIG-oDZByCgQfBRfHmTjalvI5UScxI80573G7hZbcv_QC-XOs0",
      logoUrl: "../images/NLP.png",
    },
    {
      title: "History of Programming Language",
      url: "https://devskiller.com/history-of-programming-languages/?fbclid=IwAR3vAmGyx6TndwXqQf4UOpKrqXkOSCklERazYnVfHyzDrYHYoJl4Min4-jY",
      logoUrl: "../images/hPL.jpg",
    },
    {
      title: "Database",
      url: "https://appinventiv.com/blog/top-web-app-database-list/",
      logoUrl: "../images/Db.jpg",
    },
    {
      title: "Computer Languages",
      url: "https://www.computerscience.org/resources/computer-programming-languages/",
      logoUrl: "../images/languages.png",
    },
  ];

  return (
    <div className="grid-container w-fill bg-slate-50">
      <Header />
      <div className="m-auto h-full flex justify-between">
        <Navbar />
        <div className="flex w-full p-2 h-full justify-center bg-amber-200 dark:bg-zinc-700">
          <div className="flex flex-col mt-10 mb-10 gap-10 w-3/4 bg-white dark:bg-zinc-800/50 p-10 pr-20 pl-20 h-fit justify-between shadow-md rounded-xl">
            <div className="flex justify-evenly">
              <div className="w-full select-none p-8 min-w-fit ">
                <ul className="flex select-none flex-col gap-8">
                  {topicLinks.map((topic) => (
                    <TopicLink topic={topic} key={topic.title} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
