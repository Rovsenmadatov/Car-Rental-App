import Hero from '../../components/Hero'
import SearchBar from '../../components/SearchBar'
import Filter from '../../components/Filter'
import { useEffect, useRef, useState } from 'react'
import { fetchCars } from '../../utils/fetchCars.ts'
import { CarType } from '../../types.ts'
import Card from "../../components/Card/index.tsx"
import ShowMore from '../../components/ShowMore/index.tsx'
import { useSearchParams } from 'react-router-dom'
import { fuels, years } from '../../constants.ts'

const MainPage = () => {
  const [cars,setCars] = useState<CarType[] | null>(null)
  const [isError, setIsError] = useState<boolean>(false);

  const catalogRef = useRef<HTMLDivElement>(null)

  const [params] = useSearchParams() 

  useEffect(()=>{

   const paramsObj = Object.fromEntries(params.entries());

    fetchCars(paramsObj)
    .then((data)=> setCars(data))
    .catch(()=>setIsError(true))
  },[params])

  return (
    <div className='mb-40'>
      <Hero element={catalogRef} />

      <div ref={catalogRef} className='m-12 padding-x padding-y max-width'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Araba Katoloğu</h1>
          <p>Beğenebileceğin arabaları keşfet</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <Filter paramName="fuel_type" data={fuels}  />
            <Filter paramName="year" data={years} />
          </div>
        </div>


        { !cars ? <div className='warn-container'>
            <h2>Yükleniyor...</h2>
          </div> 
          : isError 
          ?<div className='warn-container'>
          <h2>Üzgünüz verileri alırken bir hata oluştu</h2>
        </div> 
          : cars.length < 1 ? (
            <div className='warn-container'>
          <h2>Aranılan kriterlere uygun araba bulunamadı</h2>
        </div>
          )
          :(
            <section>
              <div className='home__cars-wrapper'>
                {cars.map((car)=>(
                  <Card car={car} />
                ))}
              </div>

              
            </section>
          )
        }
        <ShowMore/>
      </div>


    </div>
  )
}

export default MainPage
