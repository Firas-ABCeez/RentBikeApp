// UI COMPONENTS
import {
    Bike,
    Clock,
    MapPin,
    Battery,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Smartphone,
    HeadphonesIcon,
} from "lucide-react"

import { formatDistanceToNow } from "date-fns"

import {
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { toast } from 'sonner'



export default function CustomDrawer({ data }) {

    // Format the last updated time
    const lastUpdatedFormatted = formatDistanceToNow(new Date(data.data?.lastUpdated), { addSuffix: true })

    // Calculate total bikes and percentage for progress bar
    const totalBikes = data.data?.classicBikes + data.data?.eBikes
    const totalCapacity = totalBikes + data.data?.openDocks
    const availabilityPercentage = Math.round((totalBikes / totalCapacity) * 100)

    return (
        <>
            <div className="w-full h-full p-4">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {/* Left column - Station info */}
                    <div className="col-span-3 flex flex-col">
                        <DrawerHeader className="p-0 pb-2">
                            <DrawerTitle className="text-lg font-bold truncate">
                                {data.data?.stationName ?? "Unnamed Station"}
                            </DrawerTitle>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {data.data?.neighborhood ?? "Unknown"}
                            </div>
                        </DrawerHeader>

                        {/* Status */}
                        <div className="flex items-center gap-1 mt-1">
                            {data.data?.status === "operational" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium capitalize">
                                {data.data?.status ?? "unknown"}
                            </span>
                        </div>

                        {/* Last updated */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated {lastUpdatedFormatted ?? "N/A"}</span>
                        </div>

                        {/* Services */}
                        <div className="mt-auto">
                            <h3 className="text-xs font-semibold mb-1">Services</h3>
                            <div className="flex flex-col gap-1">
                                {Array.isArray(data.data?.services) && data.data.services.length > 0 ? (
                                    data.data.services.map((service, index) => (
                                        <Badge key={index} variant="outline" className="justify-start text-xs py-0.5">
                                            {service.includes("24h") ? (
                                                <HeadphonesIcon className="h-3 w-3 mr-1" />
                                            ) : service.includes("mobile") ? (
                                                <Smartphone className="h-3 w-3 mr-1" />
                                            ) : null}
                                            {service}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-xs text-muted-foreground">No services listed</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Vertical separator */}
                    <div className="col-span-1 flex justify-center">
                        <Separator orientation="vertical" className="h-full" />
                    </div>

                    {/* Middle column - Bike availability */}
                    <div className="col-span-4">
                        <h3 className="text-sm font-semibold mb-3">Bike Availability</h3>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                <Bike className="h-5 w-5 mb-1 text-primary" />
                                <span className="text-xl font-bold">{data.data?.classicBikes ?? 0}</span>
                                <span className="text-xs text-muted-foreground">Classic</span>
                            </div>

                            <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                <Battery className="h-5 w-5 mb-1 text-primary" />
                                <span className="text-xl font-bold">{data.data?.eBikes ?? 0}</span>
                                <span className="text-xs text-muted-foreground">E-Bikes</span>
                            </div>

                            <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                                <div className="h-5 w-5 mb-1 flex items-center justify-center border-2 border-dashed border-muted-foreground rounded-full">
                                    <span className="text-xs">P</span>
                                </div>
                                <span className="text-xl font-bold">{data.data?.openDocks ?? 0}</span>
                                <span className="text-xs text-muted-foreground">Docks</span>
                            </div>
                        </div>

                        {/* Availability bar */}
                        <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>{totalBikes ?? 0} bikes available</span>
                                <span>{availabilityPercentage ?? 0}% full</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${availabilityPercentage ?? 0}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vertical separator */}
                    <div className="col-span-1 flex justify-center">
                        <Separator orientation="vertical" className="h-full" />
                    </div>

                    {/* Right column - Pricing and action */}
                    <div className="col-span-3">
                        <h3 className="text-sm font-semibold flex items-center gap-1 mb-3">
                            <DollarSign className="h-4 w-4" />
                            Pricing
                        </h3>

                        <div className="space-y-2">
                            <div className="p-2 bg-muted rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-xs">Classic Bike</span>
                                    <span className="text-xs font-medium">
                                        {data.data?.classicBikePrice != null
                                            ? `${data.data.classicBikePrice.toFixed(3)} TND`
                                            : "N/A"}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground">per minute</span>
                            </div>

                            <div className="p-2 bg-muted rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-xs">E-Bike</span>
                                    <span className="text-xs font-medium">
                                        {data.data?.eBikePrice != null
                                            ? `${data.data.eBikePrice.toFixed(3)} TND`
                                            : "N/A"}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground">per minute</span>
                            </div>
                        </div>

                        <DrawerFooter className="p-0 mt-auto">
                            <Button
                                size="sm"
                                className="w-full mt-2 font-bold cursor-pointer"
                                onClick={() => toast.error("Whoops — You need to login to send this station details to your app.")}>
                                Continue through App
                            </Button>
                        </DrawerFooter>
                    </div>
                </div>
            </div>


        </>

    )
}
