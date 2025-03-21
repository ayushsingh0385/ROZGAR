// components/WorkersReviews.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Separator } from "./ui/separator";
const WorkersReviews = ({ WorkersId }) => {
  const [reviews, setReviews] = useState([]);
  const API_END_POINT = "https://rozgar-server.onrender.com/api/v1/Workers";
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/reviews/${WorkersId}`);
        console.log(res)
        setReviews(res.data.reviews);
        console.log(setReviews)
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, [WorkersId]);

  return (
    <div className="space-y-6">
  <h3 className="text-2xl font-bold tracking-tight">Customer Reviews</h3>
  
  {reviews.length === 0 ? (
    <div className="flex items-center justify-center h-32 rounded-lg bg-muted/50">
      <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
    </div>
  ) : (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review._id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Add Avatar component if you have user images */}
              {/* <Avatar>
                <AvatarImage src={review.userId.avatar} />
                <AvatarFallback>{review.userId.fullname[0]}</AvatarFallback>
              </Avatar> */}
              <div>
                <h4 className="font-medium">{review.userId.fullname}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {/* Star rating display */}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30 fill-transparent'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({review.rating}/5)
                  </span>
                </div>
              </div>
            </div>
            {/* You could add a relative time display here if you have createdAt date */}
            {/* <span className="text-sm text-muted-foreground">
              {format(new Date(review.createdAt), 'MMM dd, yyyy')}
            </span> */}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {review.comment}
          </p>

          <Separator className="bg-muted-foreground/20" />
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default WorkersReviews;