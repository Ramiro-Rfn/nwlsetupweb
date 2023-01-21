import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
    date: Date;
    completed?: number;
    amount?: number ;
}

export function HabitDay({ completed=0, amount=0, date }: HabitDayProps) {
    const completedPrecentage = amount > 0 ? Math.round((completed/amount) * 100): 0;

    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    return (
        <Popover.Root>
            <Popover.Trigger 
                className={clsx("w-10 h-10  rounded-lg", {
                    'bg-zinc-900 border-2 border-zinc-800': completedPrecentage === 0,
                    'bg-violet-900 border-violet-700': completedPrecentage > 0 && completedPrecentage < 20,
                    'bg-violet-800 border-violet-600': completedPrecentage >= 20 && completedPrecentage < 40,
                    'bg-violet-700 border-violet-500': completedPrecentage >= 40 && completedPrecentage < 60,
                    'bg-violet-600 border-violet-400': completedPrecentage >= 60 && completedPrecentage < 80,
                    'bg-violet-500 border-violet-300': completedPrecentage >= 80
                })}
            
            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px]  p-6 rounded-xl flex bg-zinc-900 flex-col'>
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={60}/>

                    <HabitList date={date}/>
                    
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}