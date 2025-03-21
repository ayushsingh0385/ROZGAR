import { useWorkersStore } from "@/store/useWorkersStore";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge.jsx";
import { Timer } from "lucide-react";
import { PhoneOutgoing } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddReviewForm from "./AddReviewForm";
import WorkersReviews from "./WorkersReviews";

const WorkersDetail = () => {
  const params = useParams();
  const { singleWorkers, getSingleWorkers } = useWorkersStore();
  const user = JSON.parse(localStorage.getItem("user-name"));
  const state=user.state.user
  const userId = {id:(state ? state._id : null),name:(state ? state.fullname : null)};
  useEffect(() => {
    getSingleWorkers(params.id); 
  }, [params.id]);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleWorkers?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">
              {singleWorkers?.WorkersName || "Loading..."}
            </h1>
            <div className="flex gap-2 my-2">
              {singleWorkers?.cuisines.map((cuisine, idx) => (
                <Badge key={idx}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <PhoneOutgoing className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Contect No.:
                  <span className="text-[#D19254]">
                    {singleWorkers?.contactNo || "NA"}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {singleWorkers?.menus && <AvailableMenu menus={singleWorkers.menus} />}
        <AddReviewForm WorkersId={params.id} userId={userId.id} fullname={userId.fullname} />
        <WorkersReviews WorkersId={params.id} />
      </div>
    </div>
  );
};

export default WorkersDetail;