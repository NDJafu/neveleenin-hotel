import { createSlice } from "@reduxjs/toolkit";
import { CreateRoom, HotelBasicInfo } from "../../app/types";

type Partnership = {
  basicInfo: HotelBasicInfo;
  rooms: CreateRoom[];
  services: string[];
  policies: string[];
  images: string[];
};

const initialState: Partnership = {
  basicInfo: { hotelName: "", street: "", country: "", city: "" },
  rooms: [],
  services: [],
  policies: [],
  images: [],
};

const partnershipSlice = createSlice({
  name: "partnership",
  initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    removeRoom: (state, action) => {
      state.rooms.splice(action.payload, 1);
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        (service) => service != action.payload
      );
    },
    addAmenityToRoom: (state, action) => {
      const { index, selectedAmenity } = action.payload;
      state.rooms[index].amenities.push(selectedAmenity);
    },
    removeAmenityFromRoom: (state, action) => {
      const { index, selectedAmenity } = action.payload;
      state.rooms[index].amenities = state.rooms[index].amenities.filter(
        (amenity) => amenity != selectedAmenity
      );
    },
    addHotelPhotos: (state, action) => {
      state.images = action.payload;
    },
    addPolicy: (state, action) => {
      state.policies.push(action.payload);
    },
    removePolicy: (state, action) => {
      state.policies = state.policies.filter(
        (policy) => policy != action.payload
      );
    },
  },
});

export const {
  setBasicInfo,
  addRoom,
  removeRoom,
  addService,
  removeService,
  addAmenityToRoom,
  removeAmenityFromRoom,
  addHotelPhotos,
  addPolicy,
  removePolicy,
} = partnershipSlice.actions;

export default partnershipSlice.reducer;
