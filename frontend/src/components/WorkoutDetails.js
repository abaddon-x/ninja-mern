import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const response = await fetch(
        `https://ninja-mern-server.vercel.app/api/workouts/${workout._id}`,
        {
          method: "DELETE",
          // Add headers for authentication if required by your API route
          // headers: {
          //   Authorization: `Bearer ${yourAuthToken}`,
          // },
        }
      );

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "DELETE_WORKOUT", payload: json });
        // Optionally, fetch the updated workout list here for immediate UI update
      } else {
        console.error("Error deleting workout:", response.statusText);
        // Display an error message to the user
      }
    } catch (error) {
      console.error("Network error:", error);
      // Display a network error message to the user
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
