// UI COMPONENTS
import NavbarContainer from "../navbar/NavbarContainer";
import Map from './Map';

export default function HomeContainer() {
  return (
    <div className="h-screen w-screen">
      <NavbarContainer />
      <Map />
    </div>
  )
}
