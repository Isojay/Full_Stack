import {useState} from "react";
import {FaStar} from "react-icons/fa";

export const LeaveReview: React.FC<{ submitReview: any }> = (props) => {
    const [starReview, setStarReview] = useState(0);
    const [reviewDescription, setReviewDescription] = useState("");
    const [showDescription, setShowDescription] = useState(false);
    const [hover, setHover] = useState(0);

    function setStarValue(value: number) {
        setStarReview(value);
        setShowDescription(true);
    }

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currenRating: number = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currenRating}
                            onClick={() => setStarValue(currenRating)}
                        />

                        <FaStar
                            className="star"
                            size={32}
                            color={
                                currenRating <= (hover || starReview) ? "#ffc107" : "#e4e5e9"
                            }
                            onMouseEnter={() => setHover(currenRating)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                );
            })}
            {showDescription && (
                <form method="POST" action="#">
                    <hr/>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="submitReviewDescription"
                            placeholder="Optional"
                            rows={3}
                            onChange={(e) => setReviewDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <button type="button" onClick={() => props.submitReview(starReview, reviewDescription)}
                                className="btn btn-primary mt-3">
                            Submit Review
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
