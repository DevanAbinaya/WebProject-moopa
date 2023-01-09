import StickerWIP from "./media/sticker";

function UnderConstruction() {
    return (
        <>
            <main className="h-[700px] dark:bg-[#121212] flex justify-center md:pb-16">
                <div className="flex md:flex-row flex-col justify-center md:pb-0  items-center gap-14 md:scale-90 scale-75">
                    <div className="md:scale-125 scale-110">
                        <StickerWIP />
                    </div>
                    <h1 className="md:text-5xl text-4xl md:w-[820px] font-karla transition-colors duration-500 dark:text-red-400 text-red-600 text-center drop-shadow-sm">{'> Sabar yahhh, pagenya masih dalam pembuatan...'} {':)'}</h1>
                </div>
            </main>
        </>
    )
}

export default UnderConstruction;