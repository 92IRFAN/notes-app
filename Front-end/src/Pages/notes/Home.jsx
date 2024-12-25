import React, { useEffect } from "react";
import Carousel from "../../Components/Carousel";
import CreateNote from "../../Components/CreateNote";
import { getNotes } from "../../../actions/NotesAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { trigger } = useSelector((state) => state.notes);

  // Fetch notes whenever 'trigger' changes
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch, trigger]);

  return (
    <>
      <Carousel />
      <CreateNote />
    </>
  );
};

export default Home;
