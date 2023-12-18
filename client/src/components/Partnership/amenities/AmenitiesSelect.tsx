import { useState } from "react";
import { Amenity } from "../../../app/types";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import {
  addAmenityToRoom,
  removeAmenityFromRoom,
} from "../../../features/partnership/partnershipSlice";

const AmenitiesSelect = (amenity: Amenity) => {
  const rooms = useAppSelector((state) => state.partnership.rooms);
  const ifAllRoomHasThisAmenity = rooms.every((room) =>
    room.amenities.includes(amenity._id)
  );
  const ifAtleastOneHasThisAmentity = rooms.some((room) =>
    room.amenities.includes(amenity._id)
  );
  const [addThisAmenity, setAddThisAmenity] = useState(
    ifAtleastOneHasThisAmentity
  );
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border-b border-neutral-300 flex flex-col gap-2 hover:bg-black/10">
      <div className="flex self-stretch justify-between">
        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={addThisAmenity}
            onChange={() => {
              if (!ifAtleastOneHasThisAmentity) {
                setAddThisAmenity(true);
                rooms.forEach((_room, index) =>
                  dispatch(
                    addAmenityToRoom({ index, selectedAmenity: amenity._id })
                  )
                );
              } else {
                setAddThisAmenity(false);
                rooms.forEach((_room, index) =>
                  dispatch(
                    removeAmenityFromRoom({
                      index,
                      selectedAmenity: amenity._id,
                    })
                  )
                );
              }
            }}
          />
          {amenity.name}
        </label>
        {addThisAmenity && (
          <div className="flex gap-8">
            <label className="flex gap-2">
              <input
                type="radio"
                checked={ifAllRoomHasThisAmenity}
                onChange={() =>
                  rooms.forEach((_room, index) =>
                    dispatch(
                      addAmenityToRoom({ index, selectedAmenity: amenity._id })
                    )
                  )
                }
              />
              All room
            </label>
            <label className="flex gap-2">
              <input
                type="radio"
                checked={!ifAllRoomHasThisAmenity}
                onChange={() =>
                  rooms.forEach((_room, index) =>
                    dispatch(
                      removeAmenityFromRoom({
                        index,
                        selectedAmenity: amenity._id,
                      })
                    )
                  )
                }
              />
              Some room
            </label>
          </div>
        )}
      </div>
      {!ifAllRoomHasThisAmenity && addThisAmenity && (
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
                    } else {
                      dispatch(
                        removeAmenityFromRoom({
                          index,
                          selectedAmenity: amenity._id,
                        })
                      );
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
