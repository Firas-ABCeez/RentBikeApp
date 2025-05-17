// UI COMPONENTS
import { Button } from "@/components/ui/button"


// ICONS
import realTime_white from '@/assets/icons/realTime_white.svg';
import tf30min_black from '@/assets/icons/tf30min_black.svg';
import tf60min_black from '@/assets/icons/tf60min_black.svg';



export default function BottomRow() {
    return (
        <div className="flex flex-row justify-between px-5">


            {/* CONTAINER SECTION */}
            <div className="
                            min-w-[415px] 
                            flex 
                            justify-evenly 
                            items-center 
                            bg-white
                            border-[1px]
                            border-gray-400 
                            font-semibold 
                            !text-sm
                            rounded-full
                            m-0
                            shadow-sm
                            ">

                {/* REAL TIME BTN */}
                <Button
                    variant="outline"
                    className="
                            w-[138.333333333px]
                            flex
                            flex-row 
                            items-center 
                            justify-between 
                            cursor-pointer 
                            !px-5 
                            py-5 
                            bg-[#F53B57]
                            hover:bg-[#ff5e57] 
                            border-[1px] 
                            border-[#F53B57]
                            hover:text-white
                            text-white 
                            rounded-full 
                            font-extrabold 
                            !text-sm 
                            float-end
                            shadow-md
                            hover:shadow-lg">

                    {/* ICON */}
                    <span
                        style={{
                            backgroundImage: `url(${realTime_white})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                        }}
                    ></span>

                    {/* BTN TEXT */}
                    <span className="mt-[1px]">Real time</span>
                </Button>

                {/* 30 MIN BTN */}
                <Button
                    variant="outline"
                    className="
                            w-[138.333333333px]
                            flex
                            flex-row 
                            items-center 
                            justify-between 
                            cursor-pointer 
                            !px-5 
                            py-5 
                            bg-white
                            hover:bg-[#ffbf8b]  
                            hover:border-[#ffbf8b]
                            border-[1px] 
                            border-white
                            text-gray-700 
                            rounded-full 
                            font-semibold 
                            !text-sm 
                           ">

                    {/* ICON */}
                    <span
                        style={{
                            backgroundImage: `url(${tf30min_black})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                        }}
                    ></span>

                    {/* BTN TEXT */}
                    <span className="mt-[1px]">In 30 Min</span>
                </Button>

                {/* 60 MIN BTN */}
                <Button
                    variant="outline"
                    className="
                            w-[138.333333333px]
                            flex
                            flex-row 
                            items-center 
                            justify-between 
                            cursor-pointer 
                            !px-5 
                            py-5 
                            bg-white
                            hover:bg-[#8fffc7]  
                            hover:border-[#8fffc7]
                            border-[1px] 
                            border-white
                            text-gray-700 
                            rounded-full 
                            font-semibold 
                            !text-sm 
                           ">

                    {/* ICON */}
                    <span
                        style={{
                            backgroundImage: `url(${tf60min_black})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                        }}
                    ></span>

                    {/* BTN TEXT */}
                    <span className="mt-[1px]">In 60 Min</span>
                </Button>
            </div>
        </div>
    )
}
