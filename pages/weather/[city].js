import { useRouter} from "next/router";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer/Footer";
import Head from "next/head";

const API_KEY = "6bff5757441168795c7c422284011b5d"

export default function City() {
    const router = useRouter();

    const [city, setCity] = useState('');

    const [ weather, setWeather ] = useState({});
    const [ date, setDate ] = useState({});

    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

    const userMessage = {
        Clear: `Bu gün ${city} ərazisində hava günəşlidir. Nazik geyinməyə üstünlük verin.`,
        Clouds: `Bu gün ${city} ərazisində hava buludludur. Kefinizi pozmayın :)`,
        Mist: `Bu gün ${city} ərazisində hava dumanlıdır. Avtomobildən istifadə edərkən diqqətli olun!`,
        Rain: `Bu gün ${city} ərazisində hava yağışlıdır. Çətir götürməyi unutmayın :)`
    }

    const getWeather = async (city) => {
        try {
            const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)

            setWeather(data);
        } catch (error) {
            setWeather({
                type: "error",
                code: 404
            })
        }
    }

    const getDate = () => {
        const date = new Date();

        const dateSet = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        setDate(dateSet);
    }

    useEffect(() => {
        if(router.isReady) {
            const { city } = router.query;

            setCity(city);
            getWeather(city);
            getDate();
        }
    }, [router.isReady])

    return (
        <>
            <Head>
                <title>Weather in {city}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
                      integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            </Head>

            <div className={"container"}>
                {
                    Object.keys(weather).length === 0 ? (
                        <div className={"loading"}>
                            <Image src={"/svg/loading.svg"} layout={"fixed"} width={"128px"} height={"128px"} />
                        </div>
                    ) : (
                        <>{weather.type === "error" ? (
                            <div className={"error-container"}>
                                <div className={"error"}>
                                    {weather.code === 404 ? (
                                        <>🫤 <span className="city-error-text">{city}</span> haqqında hava məlumatı tapılmadı</>
                                    ) : (
                                        <>🫤 Sistem tərəfindən başa düşülməyən xəta baş verdi</>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={"temperature-card"}>
                                    <div className="time">
                                        Bu gün, <span className="city-important-text">{city}</span> {date['day']} {months[date['month']]} {date['year']}
                                    </div>
                                    <div className="temperature-icon">
                                        <Image src={`/temperature/${weather.weather[0]['main']}.png`} layout={"fixed"} width={"128px"} height={"128px"} />
                                    </div>
                                    <div className="to-user-message">
                                        {userMessage[weather.weather[0]['main']]}
                                    </div>
                                    <div className="temperature-number">
                                        {parseInt(weather.main.temp)}°
                                    </div>
                                </div>
                            </>
                        )}</>
                    )
                }
                <Footer />
            </div>

            <style jsx>
                {`
                  .container {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    height: 95vh;
                    justify-content: center;
                    align-items: center;
                  }

                  .city-error-text,
                  .city-important-text {
                    font-weight: bold;
                  }

                  .error {
                    color: #FFFFFF;
                    background: tomato;
                    padding: 20px;
                    border-radius: 10px;
                    width: 300px;
                    text-align: center;
                    line-height: 30px;
                  }

                  footer {
                    position: absolute;
                    bottom: 20px;
                  }

                  .temperature-card {
                    width: 300px;
                    padding: 20px;
                    border-radius: 20px;
                    background: #75aef5;
                    color: #FFFFFF;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                  }

                  .temperature-number {
                    font-size: 50px;
                    font-weight: bold;
                  }
                `}
            </style>
        </>
    )
}