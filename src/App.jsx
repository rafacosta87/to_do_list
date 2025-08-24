
import { useEffect, useState } from "react"
import './index.css'
import Tarefa from "./components/Tarefa"
import { X } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [tarefas, setTarefas] = useState(JSON.parse(localStorage.getItem("tarefas")))        //estado inicial , pegando as tarefas salvas no localStorage. O JSON.parse , transforma as tarefas em string novamente , pois na linha 20 tivemos que transformalas em JSON para salvalas no localStorage
  const [tarefa, setTarefa] = useState("")
  const [erro, setErro] = useState(null)


  useEffect(() => {                                                                              //salvando as tarefas no localStorage
    if (tarefas) {                                                                                 //se receber tarefas , ira transformalas em JSON e salvalas no localStorage
      localStorage.setItem("tarefas", JSON.stringify(tarefas))
    }
  }, [tarefas])

  const adicionarTarefa = () => {
    if (tarefa.trim() == '') {                                                                //se tarefa for string vazia, ou apemas espaços em branco , entrara no erro abaixo. lembrando que a função do trim e tirar o espaços em brancos
      setErro("Campo Obrigatório")
      return
    }
    if (tarefas.filter(t => t.texto == tarefa).length > 0) {                                  //verificando se ja tem a tarefa no array, caso exista dara erro   
      setErro("Tarefa ja existe")
      return
    }

    setTarefas([...tarefas, { texto: tarefa, createdAt: new Date(), done: false }])
    setTarefa("")                                                                             //limpando o input, para receber a próxima tarefa                           
    toast(`Tarefa ${tarefa} adicionada`)
  }

  const deletarTarefa = (id) => {
    const array = [...tarefas]
    array.splice(id, 1)
    setTarefas(array)
    toast(`Tarefa ${array[id].texto} deletada`)
  }

  const alternarEstado = (id) => {
    const array = [...tarefas]
    array[id].done = !array[id].done
    console.log(array[id])
    setTarefas(array)
    if ( array[id].done  == false) {
      toast.error(`Tarefa ${array[id].texto} voltou a ser pendente`)
    }
    if ( array[id].done  == true) {
      toast.success(`Tarefa ${array[id].texto} foi concluida`)
    }

  }

  const limparTarefas = () => {
    if (window.confirm("Tem certeza que deseja apagar todas as tarefas?")) {                                                                  //msg de alerta antes de deletar
      setTarefas([])                                                                                                                          //deletando todas as tarefas
    }
    toast(`Lista de tarefas foi limpa`)
  }

  return (
    <>
      <div className='flex flex-col gap-4 justify-between items-center h-screen overflow-hidden m-4'>
        <div className="flex flex-col gap-4 justify-center flex-1 items-center overflow-auto w-full">

          {tarefas.length > 0 ? (<h1 className="text-3xl">Lista De Tarefas</h1>) : (<h1 className="text-2xl">Lista de tarefas vazia.</h1>)}

          <ul className="flex flex-col gap-2  overflow-auto w-full max-w-[500px]">                                                              {/*responsividade da largura do input . E também p scroll*/}
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
        </div>


        <div className="flex flex-col w-full max-w-[500px] gap-2 justify-center items-center sm:flex-row ">
          <input
            type="text"
            className="flex w-full sm:w-[270] px-[20px] py-[5px] border border-gray-400 rounded-xl  placeholder hover:shadow-md"
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
          <div className="flex flex-row w-full justify-end items-center sm:justify-center gap-2 ">

            <button
              className=
              "bg-green-500 rounded-xl hover:bg-green-600 active:bg-green-700 text-white px-[20px] py-[5px] font-bold cursor-pointer hover:shadow-md"
              onClick={adicionarTarefa}
            >
              Adicionar
            </button>
            <button
              className=
              "bg-red-600 rounded-xl hover:bg-red-700 active:bg-red-800 text-white px-[30px] py-[5px] font-bold cursor-pointer hover:shadow-md"
              onClick={limparTarefas}>
              Limpar
            </button>
          </div>
        </div>

        {erro &&
          <div className="flex flex-row gap-2">
            <span className="text-red-500 text-[12px]">{erro}</span>
            <X
              onClick={() => { setErro(null) }}
              className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100" />
          </div>
        }

          <ToastContainer />
    

      </div>

    </>
  )
}

export default App