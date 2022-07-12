import Head from 'next/head'
import Link from "next/link";

import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import Footer from "../components/footer/Footer";

export default function Home() {
    const router = useRouter();

    const [ city, setCity ] = useState('');

    const getWeather = (e) => {
        e.preventDefault();

        router.push(`/weather/${city}`);
    }

  return (
    <div>
      <Head>
        <title>Weather in Azerbaijan</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
          <div className={"title"}>
              Hava Temperaturu
          </div>
          <div className="subtitle">
              <small>Aşağıdakı formadan istifadə edərək şəhəri daxil edin</small>
          </div>
          <form onSubmit={getWeather} className={"app"}>
              <input type="text" className={"cityField"} placeholder={"Şəhər adını daxil edin..."} id={"city"} name={"city"} value={city} onChange={(e) => {
                  setCity(e.target.value);
              }} />
              <input type="submit" className={"submitField"} value={"Axtar"} />
          </form>
          <Footer />
      </main>

        <style jsx>
            {`
              main {
                height: 95vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .title {
                font-weight: 600;
                font-size: 30px;
                margin-bottom: 5px;
              }

              .subtitle {
                margin-top: 5px;
                color: gray;
              }

              .app {
                margin-top: 20px;
              }

              .cityField,
               .submitField{
                padding: 20px;
                font-size: 15px; 
                border: none;
                outline: none;
              }
              
              .cityField {
                background: #E5E5E5;
                border-bottom-left-radius: 30px;
                border-top-left-radius: 30px; 
              }
              
              .submitField {
                background: #0070f3;
                border-top-right-radius: 30px;
                border-bottom-right-radius: 30px;
                color: #FFFFFF;
                padding-right: 25px;
                cursor: pointer;
                -webkit-appearance: none;
              }
            `}
        </style>
    </div>
  )
}
