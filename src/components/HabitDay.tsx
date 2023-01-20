import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps {
    date: Date;
    completed?: number;
    amount?: number ;
}

export function HabitDay({ completed=0, amount=0 }: HabitDayProps) {
    const completedPrecentage = amount > 0 ? Math.round((completed/amount) * 100): 0;

    console.log('completedPercentege',completedPrecentage, amount, completed)

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
                    <span className='font-semibold text-zinc-400'>Terça-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <ProgressBar progress={60}/>

                    <div className='mt-6 items-center gap-3'>
                        <Checkbox.Root className='flex items-center gap-3 group'>
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                                <Checkbox.Indicator>
                                    <Check size={20} className='text-white' />
                                </Checkbox.Indicator>
                            </div>

                            <span className='group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 font-semibold text-xl text-white leading-tight'>
                                Berber 2L de água
                            </span>
                        </Checkbox.Root>
                    </div>                    
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}