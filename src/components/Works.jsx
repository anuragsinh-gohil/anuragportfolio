import React, { useRef, useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import Carousel from "@itseasy21/react-elastic-carousel";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
      >
        <div className="relative w-full h-[250px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-black opacity-70 hover:opacity-100 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const carouselRef = useRef(null); // Reference to the carousel
  const [itemPadding, setItemPadding] = useState([0, 48]); // Default itemPadding

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 720, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1080, itemsToShow: 3, itemsToScroll: 1 },
  ];

  // Adjust padding on window resize
  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth <= 768) {
        setItemPadding([0, 10]); // Set padding to 0 for mobile
      } else {
        setItemPadding([0, 48]); // Set padding to 48 for larger screens
      }
    };

    updatePadding(); // Check on initial load
    window.addEventListener("resize", updatePadding); // Add resize listener

    return () => {
      window.removeEventListener("resize", updatePadding); // Cleanup on unmount
    };
  }, []);

  const handlePrevClick = () => {
    if (carouselRef.current) {
      console.log("Previous button clicked");
      carouselRef.current.slidePrev(); // Use slidePrev method
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      console.log("Next button clicked");
      carouselRef.current.slideNext(); // Use slideNext method
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          // variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          These projects showcase my skills through real-world examples. Each project is described with links to code repositories and live demos.
        </motion.p>
      </div>

      {/* Carousel for Projects */}
      <div className="mt-20">
        {/* Custom Next and Previous buttons */}
        <div className="mt-4 mb-4 flex justify-between space-x-4">
          <button
            onClick={handlePrevClick}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Previous
          </button>
          <button
            onClick={handleNextClick}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Next
          </button>
        </div>
        <Carousel
          ref={carouselRef}
          isRTL={false}
          pagination={true}
          transitionMs={2000}
          easing={"ease"}
          tiltEasing={"ease"}
          enableTilt={true}
          breakPoints={breakPoints}
          initialActiveIndex={0}
          showArrows={false}
          focusOnSelect={false}
          itemPadding={itemPadding} // Dynamic itemPadding
          enableAutoPlay={true}
          autoPlaySpeed={2000}
        >
          {projects.map((project, index) => (
            <div key={`project-${index}`}>
              <ProjectCard index={index} {...project} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
