import customStyles from "../../../utils/customStyles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToken } from "../../../providers/TokenProvider/";
import api from "../../../services/api";
import Input from "../../Input";
import Button from "../../Button";
import { Container } from "../styles";
import { useResume } from "../../../providers/ResumeDownload";

export const Objective = ({setModal}) => {
  const  userId  = localStorage.getItem("@DevJobs:User:Id");

  const { getResumeInfo } = useResume();

  const schema = yup.object().shape({
    objective: yup.string().required("Degree required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFunction = ({ objective }) => {
    const infos = { objective: objective, userId: userId };
    api
      .patch(`/users/${userId}`, infos)
      .then((response) => {
        getResumeInfo(userId);
        reset()
        setModal()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(submitFunction)}>
        <h2>Objective</h2>
        <Input
          name="objective"
          placeholder="Describe your Objective"
          type="text"
          register={register}
          error={errors.objective?.message}
          setHeight="200px"
          setWidth="70%"
        />

        <div className="buttonBox">
          <Button
            type="submit"
            setSize="large"
            setColor="var(--blue)"
          >
            Submit
          </Button>
          <Button
            setSize="large"
            setColor="var(--red)"
            setClick={() => setModal()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};