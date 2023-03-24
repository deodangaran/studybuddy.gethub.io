import React from "react"

export default function Table({ data }) {
    const getDate = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: "numeric" };
        const newDate = new Date(date).toLocaleDateString('en-US', options)
        return <p>{newDate}</p>
    }

    return (
        <div className="w-full select-none mx-auto">
            <div className="flex flex-col">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="">
                            <table className="min-w-full divide-y-2 divide-gray-300 dark:divide-zinc-600 table-fixed">
                                <thead className="bg-white dark:bg-zinc-800/75 dark:text-white/75 text-base">
                                    <tr>
                                        <th scope="col" className="py-3 px-6 font-bold tracking-wider text-left uppercase ">
                                            Subject
                                        </th>
                                        <th scope="col" className="py-3 px-6 font-bold tracking-wider text-left uppercase">
                                            Topic
                                        </th>
                                        <th scope="col" className="py-3 px-6 font-bold tracking-wider text-left uppercase">
                                            Score
                                        </th>
                                        <th scope="col" className="py-3 px-6 font-bold tracking-wider text-left uppercase">
                                            Date
                                        </th>
                                        <th scope="col" className="p-4">
                                            <span className="sr-only">Preview</span>
                                        </th>
                                    </tr>
                                </thead>
                                {data ?
                                    <tbody className="bg-white dark:bg-zinc-800/75 dark:text-white/80 text-black/50 text-sm">
                                        {data.map((context) => {
                                            return (
                                                <tr key={context.id} className="border-t border-gray-100 dark:border-zinc-700">
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap uppercase">{context.subject}</td>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap uppercase">{context.topic}</td>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap">{context.score}/{context.total}</td>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap">{getDate(context.dateCreated)}</td>
                                                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                                                        <a href={`/History/Test?id=${context.id}`} className="text-green-600 hover:dark:bg-green-400 hover:bg-green-300 bg-green-200 dark:bg-green-300 dark:text-green-800 rounded-full pt-1 pb-1 pl-3 pr-3">View</a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    : null}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
