import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const AddReviewForm = ({ WorkersId, userId ,fullname}) => {
    const API_END_POINT = "https://rozgar-server.onrender.com/api/v1/Workers";
    axios.defaults.withCredentials = true;
  const [input, setInput] = useState({
    rating: 5, // Default rating
    comment: "", // Comment field
  });

  // Handle input change
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_END_POINT}/reviews/${WorkersId}`,
        { userId,fullname, rating: input.rating, comment: input.comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Review submitted successfully!");
      setInput({ rating: 5, comment: "" }); // Reset form
    } catch (error) {
      alert("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  <h3 className="text-2xl font-bold tracking-tight">Leave a Review</h3>
  
  <div className="space-y-2">
    <Label htmlFor="rating">Rating</Label>
    <Select 
      name="rating"
      value={input.rating.toString()}
      onValueChange={(value) => changeEventHandler({ target: { name: "rating", value } })}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a rating" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 Star</SelectItem>
        <SelectItem value="2">2 Stars</SelectItem>
        <SelectItem value="3">3 Stars</SelectItem>
        <SelectItem value="4">4 Stars</SelectItem>
        <SelectItem value="5">5 Stars</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="space-y-2">
    <Label htmlFor="comment">Your Review</Label>
    <Textarea
      name="comment"
      value={input.comment}
      onChange={changeEventHandler}
      placeholder="Share your experience..."
      className="min-h-[120px]"
    />
    <p className="text-sm text-muted-foreground">
      Your review will help others make better decisions.
    </p>
  </div>

  <Button type="submit" className="w-full sm:w-auto">
    Submit Review
  </Button>
</form>
  );
};

export default AddReviewForm;