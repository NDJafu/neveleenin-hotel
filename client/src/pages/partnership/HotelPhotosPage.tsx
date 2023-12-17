import { useCallback, useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../app/firebase";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import { addHotelPhotos } from "../../features/partnership/partnershipSlice";

const HotelPhotosPage = () => {
  const dispatch = useAppDispatch();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (imageFiles.length == 0) {
      alert("Please upload at least 1 image");
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

      dispatch(addHotelPhotos(imageURLs));

      setLoading(false);
      navigate("../policies");
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-3/5 mx-auto my-10">
      <h1 className="text-3xl font-bold text-neutral-900">Hotel Photos</h1>
      <p className="text-neutral-500 my-2">
        Great photos invite guests to get the full experience of your property,
        so upload some high-resolution photos that represent all your hotel has
        to offer. We'll display these photos on your hotel's page.
      </p>
      <form
        onSubmit={handleCreateRoom}
        className="bg-white p-4 rounded-xl flex flex-col gap-2 w-4/5"
      >
        <h2 className="text-xl text-neutral-700">Photo Gallery</h2>
        <div
          {...getRootProps()}
          className="p-10 border-2 border-dashed border-neutral-500 rounded-lg text-center text-neutral-500"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {imageFiles.map((image, index) => (
            <div className="relative" key={index}>
              <img
                src={URL.createObjectURL(image)}
                className="rounded-md aspect-square object-cover"
              />
              <AiFillCloseCircle
                size={32}
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
        <button
          type="submit"
          className="w-fit py-3 px-6 bg-green-100 text-green-700 font-semibold ml-auto rounded-full 
          disabled:bg-black/20 disabled:text-neutral-500"
          disabled={loading}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default HotelPhotosPage;
