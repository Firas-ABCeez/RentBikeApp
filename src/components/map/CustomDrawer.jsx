
// UI COMPONENTS
import {
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

export default function CustomDrawer({data}) {

    return (
        <>
            <DrawerHeader>
                <DrawerTitle>{data?.info}</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <button>Submit</button>
                <DrawerClose>
                    <button>Cancel</button>
                </DrawerClose>
            </DrawerFooter>
        </>
    )
}
