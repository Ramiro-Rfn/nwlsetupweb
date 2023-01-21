import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm() {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<Number[]>([]);

    function handleToggleWeekDay(weekDay: number) {
        if(weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);

            setWeekDays(weekDaysWithRemovedOne);
        }else {
            const weekDaysWithAddOne = [...weekDays, weekDay];

            setWeekDays(weekDaysWithAddOne);
        }
    }

    async function handleCreateNewHabit(e: FormEvent) {
        e.preventDefault();

        if(!title || weekDays.length === 0){
            return
        }

        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    return (
        <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
             <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input 
                type="text"         
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                autoFocus
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className='p-4 rounded mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none          focus:ring-2 focus:ring-violet-600 focus:ring-offset-zinc-900'
            />

            <label htmlFor="" className="font-semibold leading-tight mt-6">
                Qual a recorrênci?a
            </label>

            <div className='mt-4 flex flex-col gap-2'>
                {availableWeekDays.map((weekDay, index)=>{
                    return (
                        <Checkbox.Root 
                            key={weekDay} 
                            className='flex items-center gap-3 group focus:outline-none'
                            checked={weekDays.includes(index)}
                            onCheckedChange={()=> handleToggleWeekDay(index)}
                        >
                            <div className='h-8 w-8 transition-all rounded-lg flex items-center justify-center  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-zinc-900'>
                                <Checkbox.Indicator>
                                    <Check size={20} className='text-white' />
                                </Checkbox.Indicator>
                            </div>

                            <span className='font-semibold focus:outline-none text-xl text-white leading-tight'>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-violet-600 focus:ring-offset-zinc-900">
                <Check size={20} weight='bold'/>
                Confirmar
            </button>
        </form>
    )
}