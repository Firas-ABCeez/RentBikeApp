import { useState, useEffect, useRef } from "react";

// UI COMPONENTS
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


// ICONS
import { IoLogInOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import normalBike_white from '@/assets/icons/normalBike_white.svg';
import electricBike_white from '@/assets/icons/electricBike_white.svg';
import parking_white from '@/assets/icons/parking_white.svg';
import electricBike_color from '@/assets/icons/electricBike_color.svg';
import normalBike_color from '@/assets/icons/normalBike_color.svg';
import parking_color from '@/assets/icons/parking_color.svg';
import logo from '@/assets/icons/logo.png';
import { BiLogInCircle } from "react-icons/bi";
import googleIcon from '@/assets/icons/googleIcon.svg';


export default function UpperRow() {

    // Collection of menu items of Bikes to select from
    const menuItems = [
        {
            title: 'Normal Bicycle',
            description: 'Enjoy a healthy, eco-friendly ride on a classic bicycle. Perfect for short commutes, leisurely rides, and those who love to pedal their way through the city.',
            iconInColor: normalBike_color,
            iconInWhite: normalBike_white,
        },
        {
            title: 'Electric (EV) Bike',
            description: 'Go farther with ease—experience the power of electric cycling. Ideal for longer distances, uphill routes, and anyone wanting a smooth, sweat-free journey.',
            iconInColor: electricBike_color,
            iconInWhite: electricBike_white
        },
        {
            title: 'General Parking',
            description: 'Secure your spot! Enjoy hassle-free parking for your ride, anytime. Find convenient and safe spaces to leave your bicycle or EV bicycle—no more circling or worrying.',
            iconInColor: parking_color,
            iconInWhite: parking_white,
        }
    ];

    // States to dynamically trigger the Menu btn click and items selections
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);

    // Ref for the menu container to detect outside clicks
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (item) => {
        setSelectedMenuItem(item);
        setIsMenuOpen(false);
    };

    // Effect to handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

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
                            max-w-[220px]
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
                <div ref={menuRef}>
                    <Button
                        variant="outline"
                        className="
                                flex
                                flex-row
                                items-center
                                justify-evenly
                                cursor-pointer
                                !px-5
                                py-5
                                !min-w-[190px]
                                bg-[#019b94]
                                hover:bg-[#0fb9b1]
                                border-[1px]
                                border-[#0fb9b1]
                                hover:text-white
                                text-white
                                rounded-full
                                font-extrabold
                                !text-sm
                                float-end
                                shadow-md
                                hover:shadow-lg"
                        onClick={toggleMenu}
                    >

                        {/* ICON */}
                        <span
                            style={{
                                backgroundImage: `url(${selectedMenuItem.iconInWhite})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                display: 'inline-block',
                                width: '25px',
                                height: '25px',
                            }}
                        ></span>

                        {/* BTN TEXT */}
                        <span className="mt-[1px]">{selectedMenuItem.title}</span>
                    </Button>

                    {/* SELECT MENU */}
                    {isMenuOpen && (
                        <div className={`
                            bg-white
                            p-2
                            w-[450px]
                            absolute
                            mt-[51px] {
                            ml-0
                            rounded-md
                            shadow-lg
                            space-y-2`}>

                            {menuItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="
                                    flex
                                    flex-row
                                    w-full
                                    items-center
                                    p-2
                                    space-x-5
                                    hover:bg-[rgba(15,185,176,0.17)]
                                    cursor-pointer
                                    rounded-md"
                                    onClick={() => handleMenuItemClick(item)}
                                >

                                    {/* ELEMENT ICON */}
                                    <span style={{
                                        backgroundImage: `url(${item.iconInColor})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        display: 'inline-block',
                                        minWidth: '60px',
                                        minHeight: '60px',
                                    }}></span>

                                    <div className="flex flex-col">
                                        {/* ELEMENT TITLE */}
                                        <h1 className="
                                    font-bold
                                    text-[14px]
                                    ">
                                            {item.title}
                                        </h1>

                                        {/* ELEMENT DESCRIPTION */}
                                        <p className="
                                    text-[13px]
                                    text-gray-800
                                    ">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </div>

            {/* RIGHT SECTION: Auth Btn */}
            <div className="w-full flex items-center justify-end">

                {/* AUTH DIALOG */}
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant="outline"
                            className="
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
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                <span style={{
                                    backgroundImage: `url(${logo})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    display: 'inline-block',
                                    width: '300px',
                                    height: '200px',
                                }}></span>
                            </DialogTitle>
                            <DialogDescription className="-mt-[45px]">

                                {/* FORM SECTION (EMAIL + PASSWORD + LOGIN BTN + FORGOT PASSWORD LINK) */}
                                <div className="max-w-[400px] mx-auto space-y-3">

                                    {/* EMAIL INPUT */}
                                    <div>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address..."
                                            className="
                                          bg-gray-100
                                           border-[1px]
                                         border-gray-200
                                           p-5
                                           text-black
                                           font-semibold
                                           !text-sm
                                           rounded-full
                                           m-0
                                           hover:shadow-sm
                                          "/>
                                    </div>

                                    <div className="flex flex-row space-x-3">

                                        {/* PASSWORD INPUT */}
                                        <div>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password..."
                                                className="
                                                bg-gray-100
                                                border-[1px]
                                                border-gray-200
                                                p-5
                                                w-[295px]
                                                font-semibold
                                                !text-sm
                                                text-black
                                                rounded-full
                                                hover:shadow-sm
                                                m-0
                                            "/>
                                        </div>

                                        {/* LOGIN BTN */}
                                        <div>
                                            <Button
                                            type="submit"
                                                placeholder="Enter your email address..."
                                                className="
                                                bg-[#2E86DE]
                                                hover:bg-[#2ea9de]
                                                p-5
                                                text-white
                                                font-semibold
                                                border-[1px]
                                                border-[#2ea9de]
                                                rounded-full
                                                !text-sm
                                                shadow-sm
                                                m-0
                                                hover:shadow-md
                                                cursor-pointer
                                                flex
                                                flex-row 
                                                items-center
                                                justify-evenly
                                          ">
                                                <BiLogInCircle className="size-[25px]" />
                                                <span className="font-bold">
                                                    Login
                                                </span>
                                            </Button>
                                        </div>
                                    </div>

                                    {/* FORGOT PASSWORD LINK */}
                                    <div className="mt-5">
                                        <a href="#"
                                            className="
                                            hover:text-blue-500 
                                           text-blue-600 
                                            font-normal
                                            ml-2
                                            text-sm">
                                            Forgot your password?
                                        </a>
                                    </div>

                                    {/* BREAK */}
                                    <p className="text-center font-medium text-gray-400 text-[13px]">—OR—</p>

                                    {/* CREATE ACCOUNT + 3RD PARTY AUTH BTN */}
                                    <div className="flex flex-row items-center justify-between space-x-2 mt-4">

                                        {/* CREATE ACCOUNT */}
                                        <div>
                                            <Button
                                                type="text"
                                                placeholder="Enter your email address..."
                                                className="
                                                bg-[#22D074]
                                                hover:bg-[#22d059]
                                                p-5
                                                text-white
                                                border-[1px]
                                                border-[#22d059]
                                                rounded-full
                                                !text-sm
                                                shadow-sm
                                                m-0
                                                hover:shadow-md
                                                cursor-pointer
                                                w-[180px]
                                                flex
                                                flex-row 
                                                items-center
                                                justify-evenly
                                                font-bold
                                          ">
                                                Start new account
                                            </Button>
                                        </div>

                                        {/* 3RD PARTY AUTH BTN */}
                                        <div>
                                            <Button
                                                type="text"
                                                placeholder="Enter your email address..."
                                                className="
                                                bg-gray-5
                                                hover:bg-gray-100
                                                p-5
                                                text-gray-800
                                                border-[1px]
                                                border-gray-200
                                                rounded-full
                                                !text-sm
                                                shadow-sm
                                                m-0
                                                hover:shadow-md
                                                cursor-pointer
                                                w-[210px]
                                                flex
                                                flex-row 
                                                items-center
                                                justify-evenly
                                          ">
                                                <span style={{
                                                    backgroundImage: `url(${googleIcon})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover',
                                                    display: 'inline-block',
                                                    padding: '20px',
                                                }}
                                                className="mr-[-5px] ml-[-13px]"
                                                ></span>
                                                <span className="font-bold">
                                                    Continue with Google
                                                </span>
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>

        </div>
    )
}