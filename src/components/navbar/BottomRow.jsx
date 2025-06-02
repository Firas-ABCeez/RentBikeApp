// UI COMPONENTS
import { Button } from "@/components/ui/button";

// ICONS
import normalBike_color from '@/assets/icons/normalBike_color.svg';
import normalBike_white from '@/assets/icons/normalBike_white.svg';
import electricBike_white from '@/assets/icons/electricBike_white.svg';
import electricBike_color from '@/assets/icons/electricBike_color.svg';
import parking_white from '@/assets/icons/parking_white.svg';
import parking_color from '@/assets/icons/parking_color.svg';

// STORES
import useFilter from '@/stores/filter/useFilter.js';

export default function BottomRow() {

    // Collection of menu items of Bikes to select from
    const bikesBtns = [
        {
            name: 'Classic',
            inActiveIcon: normalBike_color,
            activeIcon: normalBike_white,
            btnBgColor: 'bg-[#6c5ce7]',
            btnBgHoverColor: 'hover:bg-[#a29bfe]',
            textColor: 'text-white',
            borderColor: '#6c5ce7',
        },
        {
            name: 'E-Bike',
            inActiveIcon: electricBike_color,
            activeIcon: electricBike_white,
            btnBgColor: 'bg-[#22a6b3]',
            btnBgHoverColor: 'hover:bg-[#7ed6df]',
            textColor: 'text-white',
            borderColor: '#22a6b3',
        },
        {
            name: 'Parking',
            inActiveIcon: parking_color,
            activeIcon: parking_white,
            btnBgColor: 'bg-[#d35400]',
            btnBgHoverColor: 'hover:bg-[#e67e22]',
            textColor: 'text-white',
            borderColor: '#d35400',
        },
    ];

    const { filterBy, setFilterBy } = useFilter();

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
                        onClick={() => {
                            if (filterBy === i) {
                                setFilterBy(null)
                            } else {
                                setFilterBy(i)
                            }
                        }}
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
                            ${filterBy === i ? btn.btnBgColor : 'white'}
                            ${filterBy === i ? btn.btnBgHoverColor : 'hover:bg-gray-100'}
                            // TEXT
                            ${filterBy === i ? btn.textColor : 'text-gray-700'}
                            ${filterBy === i ? `hover:text-white` : 'hover:text-black'}
                            ${filterBy === i ? 'font-extrabold' : 'font-semibold'}
                            // SHADOW
                            ${filterBy === i ? 'shadow-lg' : 'shadow-none'} 
                        `}>

                        {/* ICON */}
                        <span
                            style={{
                                backgroundImage: `url(${filterBy === i ? btn.activeIcon : btn.inActiveIcon})`,
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