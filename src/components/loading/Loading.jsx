// ANIMATION 
import loading from '@/assets/loading.gif';

export default function Loading() {
    
  return (
    <div className={`flex items-center justify-center min-h-screen bg-[#fbfdfb]`}>
      <div className="text-center">
        <h1 className='text-7xl font-bold mb-10 poetsen-one-regular bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent'>RentBike App <i className='text-sm font-thin'>Beta</i></h1>
        <div style={{
            backgroundImage: `url(${loading})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
            padding: '100px',
        }}></div>
        <h1 className="text-md font-semibold mt-[50px] animate-pulse bg-gradient-to-r from-blue-400 to-green-800 bg-clip-text text-transparent">Please wait</h1>
      </div>
    </div>
  );
};
