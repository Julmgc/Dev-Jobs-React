import customStyles from "../../../utils/customStyles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToken } from "../../../providers/TokenProvider/";
import api from "../../../services/api";
import Input from "../../Input";
import Button from "../../Button";
import { Container } from "../styles";

export const Education = () => {
  const { userId } = useToken();
  const schema = yup.object().shape({
    degree: yup.string().required("Degree required"),
    school: yup.string().required("School required"),
    dateFrom: yup.string().required("Starting data required"),
    dateTo: yup.string().required("Finish data required"),
    description: yup.string().required("Description required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunctionEducation = (data) => {
    const Education = { Education: data, userId: userId };
    api
    .post(`/education`,Education)
    .then((response) => {})
    .catch((err) => {console.log(Education, err)});
  };

  return (
    <Container>
      <form>
        <h2>Add Education</h2>
        <Input
          name="degree"
          placeholder="Degree"
          type="text"
          register={register}
          error={errors.degree?.message}
          setHeight="60px"
          setWidth="70%"
        />
        <Input
          name="school"
          placeholder="School"
          type="text"
          register={register}
          error={errors.school?.message}
          setHeight="60px"
          setWidth="70%"
        />
        <Input
          name="dateFrom"
          placeholder="Date From"
          type="text"
          register={register}
          error={errors.dateFrom?.message}
          setHeight="60px"
          setWidth="70%"
        />
        <Input
          name="dateTo"
          placeholder="Date To"
          type="text"
          register={register}
          error={errors.dateTo?.message}
          setHeight="60px"
          setWidth="70%"
        />
        <Input
          name="description"
          placeholder="Description"
          type="text"
          register={register}
          error={errors.description?.message}
          setHeight="60px"
          setWidth="70%"
        />
        <div className="buttonBox">
          <Button
            type="submit"
            setSize="large"
            setColor="var(--blue)"
            setClick={handleSubmit(onSubmitFunctionEducation)}
          >
            Submit
          </Button>
          <Button setSize="large" setColor="var(--red)" setClick={''}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};