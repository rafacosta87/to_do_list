
import { Trash2, Check, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

function Tarefa({ done, text, createdAt, onDelete, onToggleState }) {
  const [timeAgo, setTimeAgo] = useState(0)

  const displayTime = useMemo(() => {
    const hours = parseInt(timeAgo / 3600)                               //Transformando segundos em horas. timeAgo vem em segundos , ai fazemos a divisão para descobrir as horas. Lembrando que a função parseInt é para transformar o numero em inteiro caso ele venha com virgula(float).
    const minutes = parseInt((timeAgo % 3600) / 60)                      //Pegamos o resto da divisão de timeAgo por 3600, que são os segundos transformados em horas, e o que sobrar dividimos por sessenta para descobrir os minutos. E o que sobrar desta divisão são os segundos. Lembrando que a função parseInt é para transformar o numero em inteiro caso ele venha com virgula(float).
    if (hours > 0) {                                                     //aqui ira imprimir uma msg respetiva caso horas for maior que zero ou minutos, caso contrario segundos.
      return `${hours} hora(s)`
    } else if (minutes > 0) {
      return `${minutes} minuto(s)`
    } else {
      return "poucos segundos"
    }
  }, [timeAgo])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo((new Date() - createdAt) / 1000)                          //Dividi por 1000 o resultado, pois este valor vem em milésimos de segundos e queremos transformae em segundos. Lembrando que, cada milésimo de segundo equivale a 1 segundo.Passando o resultado para timeAgo(l 6)
    }, 1000)                                                               //essa função é executada a cada segundo
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