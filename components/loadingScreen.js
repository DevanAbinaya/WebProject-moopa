import React from "react";
import Typewriter from 'typewriter-effect';

const LoadingScreen = () => {
    return (
        <main className="flex items-center md:justify-center h-screen bg-white dark:bg-[#121212] md:pb-48 pb-56">
            <div className="flex flex-col w-screen items-center md:justify-center">
              
            <img src="https://media.discordapp.net/attachments/997882702751596674/1066581397533368401/Qiqi_1.png?width=701&height=701" alt="qiqi" className="md:scale-[85%] scale-[75%] translate-y-16"/>
                <div className="font-outfit font-medium text-2xl md:text-4xl">
                    <i>
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Loading...')
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .start();  
                            }}
                        />
                    </i>
                </div>
            </div>
        </main>
    )
}

export default LoadingScreen;