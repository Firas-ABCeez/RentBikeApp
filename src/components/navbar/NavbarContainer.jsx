// UI COMPONENTS
import UpperRow from "./UpperRow";
import BottomRow from "./BottomRow";

export default function NavbarContainer() {
    return (
        <div className="w-full h-fit space-y-2 py-2 fixed z-10">

            {/* UPPER ROW: Controllers + Auth BTN */}
            <UpperRow />

            {/* BOTTOM ROW: Timeline Controllers */}
            <BottomRow />

        </div>
    )
}
