
//pergunta o papel flex-wrao breack normal no código , pq funciona da mesma maneira sem eles. E se eles precisam atuar em conjunto
import { Trash2, Check, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

function Tarefa({ done, text, createdAt, onDelete, onToggleState }) {
  const [timeAgo, setTimeAgo] = useState(0)
  const displayTime = useMemo(() => {
    const hours = parseInt(timeAgo / 3600)

    const minutes = parseInt((timeAgo % 3600) / 60)
    if (hours > 0) {
      return `${hours} hora(s)`
    } else if (minutes > 0) {
      return `${minutes} minuto(s)`
    } else {
      return "poucos segundos"
    }
  }, [timeAgo])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo((new Date() - createdAt) / 1000)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>


      <li
        className=
        "flex justify-center items-center border border-gray-500 p-4 rounded-xl w-full hover:shadow-md "
      >
        <div className="flex flex-col gap-2 text-left w-full flex-wrap">

          <p className="font-bold text-xl break-normal"
            style={{ textDecoration: done ? "line-through" : "unset", color: done ? "gray" : "black" }}>
            {text}
          </p>
          <span className="text-sm text-gray-600 text-[12px]">
            Criado há {displayTime}                                                  

          </span>
        </div>

        <div className='flex flex-row items-center w-full justify-end' >
          <Trash2
            height={35}
            width={35}
            className=" cursor-pointer rounded-full hover:bg-gray-100 p-[10px] text-gray-500 active:text-gray-700"
            onClick={onDelete}
          />
          {
            done ?
              <Check
                height={30}
                width={30}
                className='cursor-pointer rounded-full hover:bg-gray-100 p-[10px] text-green-500 active:text-green-700'
                style={{ padding: '5px' }}
                onClick={onToggleState}

              />
              :
              <X
                height={30}
                width={30}
                className='cursor-pointer rounded-full hover:bg-gray-100 p-[10px] text-red-500 active:text-red-700'
                style={{ padding: '5px' }}
                onClick={onToggleState}
              />
          }
        </div>
      </li>

    </>
  )
}

export default Tarefa