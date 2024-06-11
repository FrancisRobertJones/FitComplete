import AuthComponent from "@/components/AuthComponent";
import { Homepagecard } from "@/components/PlanCard";
import HomepageDashboard from "@/components/homepageDashboard";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";

const Homepage = () => {
  const { authedUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(authedUser, "this is the auth state")
  }, [authedUser])

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-28">
          <div className="flex flex-col">
            <h1 className="text-8xl mb-12 font-bold">FitComplete</h1>
            <h4 className="text-5xl mb-12 leading-relaxed">
              Unlock Your Best Self with FitComplete
            </h4>
            {/* <p className="text-xl mb-12">
              At FitComplete, we believe that fitness and wellness should be
              accessible to everyone. Our app provides a comprehensive platform
              where you can view, track, and complete workouts, all designed to
              help you achieve your fitness goals. Whether you’re a beginner or
              a seasoned athlete, FitComplete offers tailored solutions to fit
              your needs.
            </p> */}
            <div className="flex flex-col gap-4">
              <p className="text-xl">
                <strong>Why Choose FitComplete?</strong>
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  🥉 Free Workouts: Browse and view a wide variety of workouts
                  for free.
                </li>
                <li>
                  🥈 Video Access: Upgrade to unlock detailed video tutorials
                  for every workout.
                </li>
                <li>
                  🥇 Premium Recipes: Elevate your nutrition with exclusive,
                  delicious, and healthy recipes.
                </li>
              </ul>
            </div>
          </div>
          {authedUser.loggedIn ? <HomepageDashboard /> : <AuthComponent />}
        </div>



            <div className="flex justify-between items-center w-full gap-4 pl-16">
              <Homepagecard
                title={"Lite (FREE)"}
                description={"Ideal for getting started"}
                linkUrl={"/payment/lite"} price={"30"}            />
            <Homepagecard
                title={"Basic"}
                description={"For people looking for more"}
                linkUrl={"/payment/basic"} price={"60"}            />
            <Homepagecard
                title={"Premium"}
                description={"The full package"}
                linkUrl={"/payment/premium"} price={"200"}            />
          </div>

      </div>
    </>
  );
};

export default Homepage;
