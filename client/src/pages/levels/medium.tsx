import { IVideo, IWorkout } from "@/models/interfaces/content";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Medium = () => {
  const [contents, setContents] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await axios.get(
        "http://localhost:3000/content?type=videos"
      );
      setContents(response.data);
    };
    fetchContents();
  }, [contents]);

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl">THIS IS MEDIUM PAGE</h1>
      <h2 className="text-3xl">All videos</h2>
      <div className="flex flex-wrap gap-12 px-10">
        {contents.map((content) => (
          <a
            key={content.id}
            href="https://youtu.be/cbKkB3POqaY?si=JVM1ncpncAIjqf2m"
            target="_blank"
            className="relative w-80 h-64 rounded-xl overflow-hidden bg-cover bg-center grayscale bg-[url('https://img.youtube.com/vi/cbKkB3POqaY/hqdefault.jpg')] duration-200 hover:scale-110 hover:grayscale-0"
          >
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-white">
              <h3 className="">{content.title}</h3>
              <p className="">{content.description}</p>
            </div>
          </a>
        ))}
      </div>
      {/* <ButtonSecondary text={"Subscribe"} url={""} height={"Medium"} /> */}
    </div>
  );
};

export default Medium;
