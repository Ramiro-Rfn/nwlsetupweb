import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
    date: Date
}

type HabitsInfo = {
    possibleHabits: {
        id: string,
        title: string,
        created_at: string
    }[];

    completedHabits: string[];
}

export function HabitList({ date }: HabitListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(()=>{
        async function getHabitsList() {
            const response = await api.get('/day', {
                params: {
                    date: date.toISOString(),
                }
            })

            const HabitsList = response.data;

            console.log(HabitsList)

            setHabitsInfo(HabitsList)
        }

        getHabitsList()
    }, [])

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)
        
        const ishabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if(ishabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        }else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })
    }

    const isDateInpast = dayjs(date).endOf('day').isBefore(new Date());
    
    return (
        <div className='mt-6 items-center gap-3'>
            {habitsInfo?.possibleHabits.map((habitInfo)=>{
                return (
                    <Checkbox.Root 
                        key={habitInfo.id}
                        defaultChecked={habitsInfo.completedHabits.includes(habitInfo.id)}
                        disabled={isDateInpast}
                        onCheckedChange={()=> handleToggleHabit(habitInfo.id)}
                        className='flex items-center gap-3 group'
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>

                        <span className='group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 font-semibold text-xl text-white leading-tight'>
                            {habitInfo.title}
                        </span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}