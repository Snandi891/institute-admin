"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  duration: existingDuration,
  format: existingFormat,
  topics: existingTopics,
  shedule: existingShedule,
  tools: existingTools,
  certificate: existingCertificate,
  prerequisites: existingPrerequisites,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [duration, setDuration] = useState(existingDuration || "");
  const [format, setFormat] = useState(existingFormat || "");
  const [tools, setTools] = useState(
    Array.isArray(existingTools) ? existingTools.join(", ") : ""
  );

  const [topics, setTopics] = useState(existingTopics?.join(", ") || "");
  const [shedule, setShedule] = useState(existingShedule || "");
  const [certificate, setCertificate] = useState(existingCertificate || "");
  const [prerequisites, setPrerequisites] = useState(
    existingPrerequisites || ""
  );

  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function createCourse(ev) {
    ev.preventDefault();

    const data = {
      title,
      description,
      price,
      images,
      duration,
      format,
      topics: topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      tools: tools
        .split(",")
        .map((tool) => tool.trim())
        .filter((tool) => tool.length > 0),
      shedule,
      certificate,
      prerequisites,
    };

    try {
      if (_id) {
        await axios.put("/api/products", { ...data, _id });
        toast.success("Course successfully updated!");
      } else {
        await axios.post("/api/products", data);
        toast.success("Course successfully created!");
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course.");
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        if (res.data?.links) {
          setImages((oldImages) => [...oldImages, ...res.data.links]);
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        toast.error("Image upload failed");
      }
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  return (
    <form onSubmit={createCourse}>
      <div className="mx-auto max-w-2xl">
        {/* Title */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Course Title
        </label>
        <input
          type="text"
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Description */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Course Description
        </label>
        <textarea
          placeholder="Course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Price */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Course Price (in ₹)
        </label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          min={0}
          required
        />

        {/* Duration */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Duration
        </label>
        <input
          type="text"
          placeholder="e.g. 2 months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Format */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Format
        </label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Select format</option>
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
        </select>

        {/* Topics */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Topics (comma-separated)
        </label>
        <input
          type="text"
          placeholder="e.g. Networking, Linux, Hacking"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Schedule */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Schedule
        </label>
        <textarea
          placeholder="e.g. Week 1: Basics, Week 2: Linux, ..."
          value={shedule}
          onChange={(e) => setShedule(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* tools */}

        <label className="block mb-2 text-md font-medium text-gray-900">
          Tools (comma-separated)
        </label>
        <textarea
          placeholder="e.g. Kali Linux, Wireshark, Nmap"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Certificate */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Certificate Details
        </label>
        <input
          type="text"
          placeholder="e.g. Completion certificate included"
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Prerequisites */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Prerequisites
        </label>
        <textarea
          placeholder="e.g. Basic computer knowledge"
          value={prerequisites}
          onChange={(e) => setPrerequisites(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Images */}
        <label className="block mb-2 text-md font-medium text-gray-900">
          Course Images
        </label>
        <div className="mb-4 flex flex-wrap gap-2">
          <ReactSortable
            list={images}
            setList={updateImagesOrder}
            className="flex gap-2 flex-wrap"
          >
            {!!images?.length &&
              images.map((link, index) => (
                <div key={index} className="h-24 w-24 relative">
                  <img
                    src={link}
                    className="rounded-lg border object-cover h-full w-full"
                    alt="Course"
                  />
                </div>
              ))}
          </ReactSortable>

          {isUploading && (
            <div className="h-24 w-24 flex items-center justify-center">
              <Spinner />
            </div>
          )}

          <label className="h-24 w-24 flex items-center justify-center border bg-white text-sm cursor-pointer rounded-md shadow-sm">
            Upload
            <input
              type="file"
              onChange={uploadImages}
              className="hidden"
              multiple
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Course
        </button>
      </div>
    </form>
  );
}
