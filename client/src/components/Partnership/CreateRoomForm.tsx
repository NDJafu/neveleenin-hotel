import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import { v4 } from "uuid";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAppDispatch } from "../../utils/hooks";
import { addRoom } from "../../features/partnership/partnershipSlice";
import { useGetAllAmenitiesQuery } from "../../features/hotel/hotelApiSlice";

type CreateRoomFormType = {
  name: string;
  price: string;
  roomNumber: number;
  amenities: string[];
};

const CreateRoomForm = ({ finish }: { finish: () => void }) => {
  const dispatch = useAppDispatch();
  const { data: amenities } = useGetAllAmenitiesQuery();
  const [createRoomForm, setCreateRoomForm] = useState<CreateRoomFormType>({
    name: "",
    price: "",
    roomNumber: 1,
    amenities: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setImageFiles((prev) => [...prev, ...acceptedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg"],
    },
  });

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (createRoomForm.amenities.length == 0) {
      alert("Please pick the room type!");
      return;
    }

    if (imageFiles.length == 0) {
      alert("Please upload at least 1 image of this room");
      return;
    }

    setLoading(true);

    try {
      const imageURLs: string[] = await Promise.all(
        imageFiles.map(async (image) => {
          const imageRef = ref(storage, `images/${image.name + v4()}`);
          const snapshot = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          return url;
        })
      );

      setLoading(false);
      dispatch(
        addRoom({
          ...createRoomForm,
          price: parseInt(createRoomForm.price),
          images: imageURLs,
        })
      );
      finish();
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateRoom}
      className="bg-white p-4 rounded-xl flex flex-col gap-2 w-4/5"
    >
      <label className="text-sm text-neutral-500">Room type</label>
      <select
        onChange={(e) =>
          setCreateRoomForm((prev) => ({
            ...prev,
            amenities: [e.target.value],
          }))
        }
        className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
        required
      >
        <option
          disabled
          selected
          hidden
          className="disabled:text-neutral-500"
          value="none"
        >
          Select room type
        </option>
        {amenities?.map((amenity) => {
          if (amenity.category == "Type of unit")
            return (
              <option key={amenity._id} value={amenity._id}>
                {amenity.name}
              </option>
            );
        })}
      </select>

      <label className="text-sm text-neutral-500">Room name</label>
      <input
        type="text"
        className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/2"
        placeholder="Room Name"
        value={createRoomForm.name}
        onChange={(e) =>
          setCreateRoomForm((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        required
      />
      <label className="text-sm text-neutral-500">Pricing</label>
      <input
        type="text"
        className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-1/4"
        placeholder="Enter room price"
        value={createRoomForm.price}
        onChange={(e) =>
          setCreateRoomForm((prev) => ({
            ...prev,
            price: e.target.value,
          }))
        }
        required
      />
      <label className="text-sm text-neutral-500">
        Number of rooms (of this type)
      </label>
      <input
        type="number"
        className="px-6 py-3 border border-neutral-300 placeholder:text-neutral-500 rounded-lg outline-none w-24"
        value={createRoomForm.roomNumber}
        min={1}
        onChange={(e) =>
          setCreateRoomForm((prev) => ({
            ...prev,
            roomNumber: e.target.valueAsNumber,
          }))
        }
        required
      />
      <label className="text-sm text-neutral-500">
        Room images (need at least 1)
      </label>
      <div
        {...getRootProps()}
        className="w-1/2 p-10 border-2 border-dashed border-neutral-500 rounded-lg text-center text-neutral-500"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="w-1/2 grid grid-cols-3 gap-2">
        {imageFiles.map((image, index) => (
          <div className="relative" key={index}>
            <img
              src={URL.createObjectURL(image)}
              className="rounded-md aspect-square object-cover"
            />
            <AiFillCloseCircle
              size={22}
              className="fill-neutral-500/75 absolute top-1 right-1"
              onClick={() =>
                setImageFiles((prev) => {
                  prev.splice(index, 1);
                  return [...prev];
                })
              }
            />
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <button
          type="submit"
          className="w-fit py-3 px-6 bg-green-100 text-green-700 font-semibold float-right rounded-full 
          disabled:bg-black/20 disabled:text-neutral-500"
          disabled={loading}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default CreateRoomForm;
