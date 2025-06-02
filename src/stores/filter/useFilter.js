import { create } from 'zustand';

const useFilter = create((set) => ({
    filterBy: null,
    setFilterBy: (value) => set({ filterBy: value }),
}));

export default useFilter;
