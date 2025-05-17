// UI COMPONENTS
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


// ICONS
import { IoLogInOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import electricBike_white from '@/assets/icons/electricBike_white.svg';


export default function UpperRow() {
    return (
        <div className="flex flex-row justify-between px-5">

            {/* LEFT SECTION */}
            <div className="min-w-[415px] flex justify-between items-center">

                {/* CONTAINER: Controllers */}
                <div className="flex flex-row items-center">

                    {/* SEARCH ICON */}
                    <span className="!px-4 w-min border-0 m-l-[-20px] absolute">
                        <CiSearch className="size-[20px] text-gray-500" />
                    </span>

                    {/* SEARCH INPUT */}
                    <Input
                        type="text"
                        placeholder="Where are you going?"
                        className="
                            bg-white
                            !px-5
                            !pl-12
                            py-5
                            border-[1px]
                            border-gray-400 
                            font-semibold 
                            !text-sm
                            rounded-full
                            m-0
                            shadow-sm
                            hover:shadow-lg
                        "/>
                </div>


                {/* SELECT MENU */}
                <Button
                    variant="outline"
                    className="
                            flex
                            flex-row 
                            items-center 
                            justify-between 
                            cursor-pointer 
                            !px-5 
                            py-5 
                            bg-[#019b94]
                            hover:bg-[#0fb9b1] 
                            border-[1px] 
                            border-[#019b94]
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
                            backgroundImage: `url(${electricBike_white})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                        }}
                    ></span>

                    {/* BTN TEXT */}
                    <span className="mt-[1px]">Electric Bike</span>
                </Button>

            </div>

            {/* RIGHT SECTION: Auth Btn */}
            <div className="w-full">
                <Button
                    variant="outline"
                    className="
                        flex 
                        flex-row 
                        items-center 
                        justify-between 
                        cursor-pointer 
                        !px-5 
                        py-5 bg-[#2e86de]
                        hover:bg-[#54a0ff] 
                        border-[1px] 
                        border-[#54a0ff]
                        hover:text-white
                        text-white 
                        rounded-full 
                        font-extrabold 
                        !text-sm 
                        float-end
                        shadow-md
                        hover:shadow-lg
                        ">
                    <IoLogInOutline className="size-[25px]" />
                    <span className="mt-[1px]">Join Now</span>
                </Button>
            </div>

        </div>
    )
}
