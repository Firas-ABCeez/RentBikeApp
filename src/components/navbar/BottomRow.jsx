import { useEffect, useState } from "react";

// UI COMPONENTS
import { Button } from "@/components/ui/button";

// ICONS
import normalBike_color from '@/assets/icons/normalBike_color.svg';
import normalBike_white from '@/assets/icons/normalBike_white.svg';
import electricBike_white from '@/assets/icons/electricBike_white.svg';
import electricBike_color from '@/assets/icons/electricBike_color.svg';
import parking_white from '@/assets/icons/parking_white.svg';
import parking_color from '@/assets/icons/parking_color.svg';

export default function BottomRow() {

    // Collection of menu items of Bikes to select from
    const bikesBtns = [
        {
            name: 'Classic',
            inActiveIcon: normalBike_color,
            activeIcon: normalBike_white,
            btnBgColor: 'bg-[#8c7ae6]',
            btnBgHoverColor: 'hover:bg-[#9c88ff]',
            textColor: 'text-white',
            borderColor: '#8c7ae6',
        },
        {
            name: 'E-Bike',
            inActiveIcon: electricBike_color,
            activeIcon: electricBike_white,
            btnBgColor: 'bg-[#8c7ae6]',
            btnBgHoverColor: 'hover:bg-[#9c88ff]',
            textColor: 'text-white',
            borderColor: '#8c7ae6',
        },
        {
            name: 'Station',
            inActiveIcon: parking_color,
            activeIcon: parking_white,
            btnBgColor: 'bg-[#8c7ae6]',
            btnBgHoverColor: 'hover:bg-[#9c88ff]',
            textColor: 'text-white',
            borderColor: '#8c7ae6',
        },
    ];

    // Collected all the selected items 
    const [selectedItems, setSelectedItems] = useState([]);

    // Check if the item is already selected and been added to the selectedItems list then Remove it, otherwise, add it.
    function selectThisItem(selectedItem) {
    const isSelected = selectedItems.includes(selectedItem);

    if (isSelected) {
        setSelectedItems(prev =>
            prev.filter(item => item !== selectedItem)
        );
    } else {
        setSelectedItems(prev => [...prev, selectedItem]);
    }
}

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
                shadow-sm">

                {bikesBtns.map((btn, i) => (
                    <Button
                        key={i}
                        onClick={() => selectThisItem(i)}
                        variant="outline"
                        className={`
                            shadow-none
                            cursor-pointer 
                            px-5 
                            py-5
                            space-x-2
                            w-[138.333333333px]
                            text-sm
                            rounded-full
                            border-[1px]
                            border-white
                            // BG COLOR 
                            ${selectedItems.includes(i) ? btn.btnBgColor : 'white'}
                            ${selectedItems.includes(i) ? btn.btnBgHoverColor : 'hover:bg-gray-100'}
                            // TEXT
                            ${selectedItems.includes(i) ? btn.textColor : 'text-gray-700'}
                            ${selectedItems.includes(i) ? `hover:text-white` : 'hover:text-black'}
                            ${selectedItems.includes(i) ? 'font-extrabold' : 'font-semibold'}
                            // SHADOW
                            ${selectedItems.includes(i) ? 'shadow-lg' : 'shadow-none'}
                            
                            
                        `}>

                        {/* ICON */}
                        <span
                            style={{
                                backgroundImage: `url(${selectedItems.includes(i) ? btn.activeIcon : btn.inActiveIcon})`,
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