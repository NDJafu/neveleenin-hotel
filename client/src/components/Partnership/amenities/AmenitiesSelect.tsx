import { useEffect, useState } from "react";
import { Amenity } from "../../../app/types";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  addAmenityToRoom,
  removeAmenityFromRoom,
} from "../../../features/partnership/partnershipSlice";

const AmenitiesSelect = (amenity: Amenity) => {
  const [addThisAmenity, setAddThisAmenity] = useState(false);
  const [allRooms, setAllRooms] = useState(true);
  const rooms = useAppSelector((state) => state.partnership.rooms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addThisAmenity && allRooms) {
      for (let index = 0; index < rooms.length; index++) {
        if (!rooms[index].amenities.includes(amenity._id))
          dispatch(addAmenityToRoom({ index, selectedAmenity: amenity._id }));
      }
    } else {
      for (let index = 0; index < rooms.length; index++) {
        dispatch(
          removeAmenityFromRoom({ index, selectedAmenity: amenity._id })
        );
      }
    }
  }, [addThisAmenity, allRooms]);

  return (
    <div className="p-4 border-b border-neutral-300 flex flex-col gap-2 hover:bg-black/10">
      <div className="flex self-stretch justify-between">
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={addThisAmenity}
            onChange={() => {
              setAddThisAmenity(!addThisAmenity);
            }}
          />
          {amenity.name}
        </label>
        {addThisAmenity && (
          <div className="flex gap-8">
            <label className="flex gap-2">
              <input
                type="radio"
                checked={allRooms}
                onChange={() => setAllRooms(true)}
              />
              All room
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                checked={!allRooms}
                onChange={() => setAllRooms(false)}
              />
              Some room
            </label>
          </div>
        )}
      </div>
      {!allRooms && addThisAmenity && (
        <>
          <p>Select where this amenity is available.</p>
          <div>
            {rooms.map((room, index) => (
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={room.amenities.includes(amenity._id)}
                  onChange={() => {
                    if (!room.amenities.includes(amenity._id)) {
                      dispatch(
                        addAmenityToRoom({
                          index,
                          selectedAmenity: amenity._id,
                        })
                      );
                      console.log("added");
                    } else {
                      dispatch(
                        removeAmenityFromRoom({
                          index,
                          selectedAmenity: amenity._id,
                        })
                      );
                      console.log("removed");
                    }
                  }}
                />
                {room.name}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AmenitiesSelect;
