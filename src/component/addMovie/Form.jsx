import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';

export const Form = () => {
    const schema = yup.object().shape({
        movieName : yup.string().required("Please provide valid Movie Name !!"),
        seats : yup.string().required("Please provide seats (10 - 20)"),
        cost : yup.string().required("Please provide cost (100 - 1000)")
    })

    const {register , handleSubmit , formState : {errors}} = useForm({
        resolver : yupResolver(schema),
    });

    const onSubmit = async (data) => {
        // make API call
        const api_url = 'http://127.0.0.1:5000/api/movie'
        const result = await Axios.post(api_url , data)
        console.log(result);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Please add Movie Name...." {...register("movieName")}/>
                <p>{errors.movieName?.message}</p>
                <input type="number" placeholder="Please add total seats...." {...register("seats")}/>
                <p>{errors.seats?.message}</p>
                <input type="number" placeholder="Please add ticket cost per head..." {...register("cost")}/>
                <p>{errors.cost?.message}</p>
                <input type="submit"/>
            </form>
        </div>
    )
}