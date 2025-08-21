//não conseguimos deletar com filter

import { useState } from "react"
import './index.css'
import Tarefa from "./components/Tarefa"
import { X } from "lucide-react"

function App() {
  const [tarefas, setTarefas] = useState([])
  const [tarefa, setTarefa] = useState("")
  const [erro, setErro] = useState(null)

  const adicionarTarefa = () => {
    if(tarefa.trim() == '')  { 
      setErro("Campo Obrigatório")
      return 
    }
    if(tarefas.filter(t => t.texto == tarefa ).length > 0 ) {
      setErro("Tarefa ja existe")
      return
    }

      setTarefas([...tarefas, { texto: tarefa, createdAt: new Date(), done: false }])
      setTarefa("")                                                                             
     
  }

  const deletarTarefa = (id) => {
    const array = [...tarefas]
    array.splice(id, 1)
    setTarefas(array)
  }

  const alternarEstado = (id) => {
    const array = [...tarefas]
    array[id].done = !array[id].done
    setTarefas(array)
  }

  const limparTarefas = () => {
    if (window.confirm("Tem certeza que deseja apagar todas as tarefas?")) {                   //msg de alerta antes de deletar
      setTarefas([])                                                                           //deletando todas as tarefas
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 justify-center items-center h-screen '>
        {tarefas.length > 0 ? (<h1 className="text-3xl">Lista De Tarefas</h1>) : null}

        <ul className="flex flex-col gap-2">
          {tarefas.map((tarefa, id) =>
            <Tarefa
              key={id}
              text={tarefa.texto}
              createdAt={tarefa.createdAt}
              done={tarefa.done}
              onDelete={() => deletarTarefa(id)}
              onToggleState={() => alternarEstado(id)} />
          )}
        </ul>

        <div className="flex flex-row gap-2 ">
          <input
            type="text"
            className="border border-gray-400 rounded-xl  px-[20px] py-[5px]  placeholder hover:shadow-md"
            value={tarefa}
            onChange={e => setTarefa(e.target.value)}
            placeholder="Digite uma tarefa"
            onKeyDown={(e) => {                                                         /* para ao digitarmos o valor no input , apertar a tecla enter , e salvar a tarefa*/
              if (e.code == "Enter") {
                adicionarTarefa()
              }
            }
            }
          />

          <button
            className=
            "bg-green-500 p-2.5 rounded-xl hover:bg-green-600 active:bg-green-700 text-white px-[20px] py-[5px] font-bold cursor-pointer hover:shadow-md"
            onClick={adicionarTarefa}
          >
            Adicionar
          </button>
          <button
            className=
            "bg-red-600 p-2.5 rounded-xl hover:bg-red-700 active:bg-red-800 text-white px-[30px] py-[5px] font-bold cursor-pointer hover:shadow-md"
            onClick={limparTarefas}>
            Limpar
          </button>
        </div>

        {erro &&
          <div className="flex flex-row gap-2">
            <span className="text-red-500 ">{erro}</span>
            <X
            onClick={() => {setErro(null)}}
            className="cursor-pointer p-1 rounded-full hover:bg-gray-100"/>
          </div>
        }
      </div>
    </>
  )
}

export default App