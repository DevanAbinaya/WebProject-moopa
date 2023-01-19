import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout";

export default function ChapterRead() {

    const [data, setData] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const router = useRouter();
    const item = router.query.item ? JSON.parse(router.query.item) : {};

    if(!item) {
        return <p>no data</p>;
    }

    useEffect(() => {
        let isMounted = true;
        const storedData = localStorage.getItem('chapter_image_link');
        if (storedData) {
          setData(JSON.parse(storedData));
          setIsLoading(false);
        } else {
          async function fetchData() {
            if (isMounted) {
            setIsLoading(true);
            const { data } = await axios.get(`https://manga-api-production-30a1.up.railway.app/api/chapter/${item}`);
            setData(data);
            setIsLoading(false);
            localStorage.setItem('chapter_image_link', JSON.stringify(data));
            }
          }
          fetchData();
        }
        return () => {
            isMounted = false;
            localStorage.removeItem('chapter_image_link');
        }
    }, [item]);
      

    return(
        <Layout>
            <div className="pt-[5.5rem] md:w-[1600px] w-screen flex justify-center min-h-screen h-auto relative">
                {isloading ? <p>Loading...</p> : data && (
                    <div className="flex flex-col justify-center">
                        {data.chapter_image.map(({ chapter_image_link, image_number }, index) => {
    
                            return(
                            <div key={index} className='flex flex-col object-contain justify-center'>
                                <img src={chapter_image_link} alt={image_number} />
                            </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </Layout>
    )
}