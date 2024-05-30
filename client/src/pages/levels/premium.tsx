import { IWorkout } from '@/models/interfaces/content';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Premium = () => {
  const [contents, setContents] = useState<IWorkout[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const response = await axios.get(
        "http://localhost:3000/content?type=recipes"
      );
      setContents(response.data);
    };
    fetchContents();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl">THIS IS PREMIUM PAGE</h1>
      <h2 className="text-3xl">All recipes</h2>
      <div className="flex flex-wrap gap-12 px-10">
        {contents.map((content) => (
          <a
            key={content.id}
            href=""
            className="relative w-80 h-64 rounded-xl overflow-hidden bg-cover bg-center grayscale bg-[url('https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] duration-200 hover:scale-110 hover:grayscale-0"
          >
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-white">
              <h3 className="">{content.title}</h3>
              <p className="">{content.description}</p>
              {/* <img src={content.imageUrl} alt={content.title} /> */}
            </div>
          </a>
        ))}
      </div>
      {/* <ButtonSecondary text={"Subscribe"} url={""} height={"Medium"} /> */}
    </div>
  );
}

export default Premium