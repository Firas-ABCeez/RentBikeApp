import { useState } from "react";

// UI COMPONENTS
import { Button } from "@/components/ui/button";

// ICONS
import realTimeWhite from '@/assets/icons/realTime_white.svg';
import realTimeColor from '@/assets/icons/realTime_color.svg';
import tf30minBlack from '@/assets/icons/tf30min_black.svg';
import tf30minColor from '@/assets/icons/tf30min_color.svg';
import tf60minBlack from '@/assets/icons/tf60min_black.svg';
import tf60minColor from '@/assets/icons/tf60min_color.svg';

export default function BottomRow() {

    // Collection of timeline btns
    const timelinesBtns = [
      {
            name: 'Real Time',
            inActiveIcon: realTimeColor,
            activeIcon: realTimeWhite,
            btnBgColor: 'bg-[#F53B57]',
            btnBgHoverColor: 'hover:bg-[#ff5e57]',
            textColor: 'text-white',
            borderColor: '#F53B57',
        },
        {
            name: 'In 30 Min',
            inActiveIcon: tf30minBlack,
            activeIcon: tf30minColor,
            btnBgColor: 'bg-[#FFA801]',
            btnBgHoverColor: 'hover:bg-[#ffc048]',
            textColor: 'text-white',
            borderColor: '#FFA801',
        },
        {
            name: 'In 60 Min',
            inActiveIcon: tf60minBlack,
            activeIcon: tf60minColor,
            btnBgColor: 'bg-[#05c46b]',
            btnBgHoverColor: 'hover:bg-[#0be881]',
            textColor: 'text-white',
            borderColor: '#05c46b',
        },
    ];

    // Dynamically store and update the active btn based on 'activeBtn' state
    const [activeBtn, setActiveBtn] = useState(0);

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
                text-sm
                rounded-full
                m-0
                shadow-sm
            ">
                {timelinesBtns.map((btn, i) => (
                    <Button
                        key={i}
                        onClick={() => setActiveBtn(i)}
                        variant="outline"
                        className={`
                            shadow-none
                            cursor-pointer 
                            px-5 
                            py-5
                            w-[138.333333333px]
                            text-sm
                            rounded-full
                            border-[1px]
                            border-white
                            // BG COLOR 
                            ${activeBtn === i ? btn.btnBgColor : 'white'}
                            ${activeBtn === i ? btn.btnBgHoverColor : 'hover:bg-gray-200'}
                            // TEXT
                            ${activeBtn === i ? btn.textColor : 'text-gray-700'}
                            ${activeBtn === i ? `hover:text-white` : 'hover:text-gray-700'}
                            ${activeBtn === i ? 'font-extrabold' : 'font-semibold'}
                            // SHADOW
                            ${activeBtn === i ? 'shadow-lg' : 'shadow-none'}
                            
                            
                        `}
                    >
                        {/* ICON */}
                        <span
                            style={{
                                backgroundImage: `url(${activeBtn === i ? btn.activeIcon : btn.inActiveIcon})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                display: 'inline-block',
                                width: '25px',
                                height: '25px',
                            }}
                        ></span>

                        {/* BTN TEXT */}
                        <span className="mt-[1px]">{btn.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}