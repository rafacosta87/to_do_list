//tivemos dificuldade em deixar um elemento na ponta esquerda e outro na ponta direita
import {Trash2, Check, X} from 'lucide-react'
 
function Tarefa({ done, text, createdAt, onDelete, onToggleState }) {

  return (
    <>


      <li
        className=
        "flex justify-between items-center border border-gray-500 p-4 rounded-xl w-[500px] hover:shadow-md overflow-hidden"
      >
        <div className="flex flex-col gap-2 text-left w-full flex-wrap">

          <p className="font-bold text-xl break-normal"
            style={{textDecoration: done ? "line-through" : "unset"  , color: done ?  "gray" : "black"  }}>
            {text}
          </p>
          <span className="text-sm text-gray-600 ">
            {createdAt.toLocaleString()}                                                  {/*convertendo o createdAt para string*/}

          </span>
        </div>
        
<div className='flex flex-row items-center' >
        <Trash2
        height={35}
        width={35}
        className=" cursor-pointer rounded-full hover:bg-gray-200 p-[10px] text-gray-500 active:text-gray-700"
        onClick={onDelete}
        />
        {
          done ?
          <Check
          height={30}
          width={30}
          className='cursor-pointer rounded-full hover:bg-gray-200 p-[10px] text-green-500 active:text-green-700'
          style={{ padding: '5px' }}
          onClick={onToggleState}
          
          />
          :
          <X
          height={30}
          width={30}
          className='cursor-pointer rounded-full hover:bg-gray-200 p-[10px] text-red-500 active:text-red-700'
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