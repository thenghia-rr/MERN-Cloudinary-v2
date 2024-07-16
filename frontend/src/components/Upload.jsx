import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createUser } from "../services/uploads";

const Upload = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ name, avatar }) => {
      return createUser({ name, avatar });
    },
    onSuccess: (data) => {
      alert("Upload successfully");
      console.log("Success", data);
      queryClient.invalidateQueries("users"); // Làm mới danh sách người dùng sau khi mutation thành công
    },
    onError: (error) => {
      alert("Upload failed");
      console.log("Faild", error);
    },
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Name and image are required");
      return;
    }
    mutate({ name, avatar: image });
  };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />{" "}
      <br />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} /> <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Upload;
