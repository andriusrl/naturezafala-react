import React from "react";
import Map from "../../shared/components/Map";
import MarkPng from "../../assets/mark.png";
import { useEffect } from "react";
import api from "../../config/axios/api";

export default function Home() {

  const [menuMarkStatus, setMenuMarkStatus] = React.useState(true)
  const [pollutionTypeList, setPollutionTypeList] = React.useState()

  const handleMarkPoint = () => {
    setMenuMarkStatus(!menuMarkStatus)
  }


  const getPollutionType = async () => {
    const response = await api.get('/pollutiontype')

    setPollutionTypeList(response.data)

  }

  useEffect(() => {
    getPollutionType();
  }, [])

  return (
    <div>

      {!menuMarkStatus && <Map />}

      {menuMarkStatus && pollutionTypeList && <div className="space-y-4">

        <h1 className="w-fit mx-auto text-2xl font-bold text-gray-600">Selecione o tipo de poluição:</h1>
        {pollutionTypeList.map((pollutionType: { id: number, name: string, description: string }) => {
          return <div key={pollutionType.id} className="mx-auto h-12 bg-green-600 border border-slate-400 rounded-md w-72 flex">
            <p className="h-fit w-fit m-auto text-[#944B0A] text-xl font-bold">{pollutionType.name}</p>
          </div>
        })}

        <div className="mx-auto h-12 bg-red-400 border border-slate-400 rounded-md w-72 flex">
          <p className="h-fit w-fit m-auto text-[#944B0A] text-xl font-bold">Voltar para o mapa</p>
        </div>
      </div>}


      {!menuMarkStatus && <div
        className="fixed bottom-6 right-5 z-40 cursor-pointer"
      >
        <img
          className="w-[60px] animate-pulse"
          src={MarkPng}
          onClick={handleMarkPoint}
        />
      </div>}
    </div>
  );
}
