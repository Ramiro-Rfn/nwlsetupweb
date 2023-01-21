import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-date-for-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDateSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length;
 
type Summary = {
    id: string,
    date: string,
    amount: number,
    completed: number
}

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary[]>([]);

    useEffect(()=> {
      async function getSummary() {
        const response = await api.get('summary');
        const summary = response.data;

        setSummary(summary)
      }
      
      getSummary()
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, index)=>{
                    return (
                        <div key={`${weekDay}-${index}`}  className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map((date)=>{
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })
                    
                    return (
                        <HabitDay 
                            amount={dayInSummary?.amount} 
                            date={date}
                            defaultCompleted={dayInSummary?.completed} 
                            key={date.toString()}
                        />
                    )
                })}

                {
                    amountOfDaysToFill>0 && Array.from({length: amountOfDaysToFill})
                    .map((_,index)=> {
                        return <div key={index} className="w-10 h-10 bg-zinc-900 border-2 opacity-40 cursor-not-allowed border-zinc-800 rounded-lg"/>
                    })
                }

            </div>
        </div>
    )
}