import AuthComponent from "@/components/AuthComponent";
import { HomepageCard } from "@/components/PlanCard";
import HomepageDashboard from "@/components/homepageDashboard";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useRef, useState } from "react";

const Homepage = () => {
  const { authedUser } = useContext(AuthContext);
  const PlansTargetref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(authedUser, "this is the auth state")
  }, [authedUser])

  const scrollToTarget = () => {
    if (PlansTargetref.current) {
      PlansTargetref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between mb-28">
          <div className="flex flex-col">
            <h1 className="text-8xl mb-12 font-bold">FitComplete</h1>
            <h4 className="text-5xl mb-12 leading-relaxed">
              Unlock Your Best Self with FitComplete
            </h4>

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
          {authedUser.loggedIn ? <HomepageDashboard scrollToTarget={scrollToTarget} /> : <AuthComponent />}
        </div>


        {authedUser.isPaymentSuccess === true ||
          authedUser.isPaymentSuccess === undefined ? (
          <div className="flex justify-between items-center w-full gap-4">
            <HomepageCard
              ref={PlansTargetref}
              title={"Lite"}
              description={"Ideal for getting started"}
              linkUrl={"/payment/lite"} price={"30"} />
            <HomepageCard
              ref={PlansTargetref}
              title={"Basic"}
              description={"For people looking for more"}
              linkUrl={"/payment/basic"} price={"60"} />
            <HomepageCard
              ref={PlansTargetref}
              title={"Premium"}
              description={"The full package"}
              linkUrl={"/payment/premium"} price={"200"} />
          </div>
        ) : null}
      </div>

    </>)
}


export default Homepage;
