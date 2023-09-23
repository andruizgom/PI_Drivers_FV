import { useState } from 'react';
import { validateInputs, validateSubmit } from "../Form/validation";
import { useDispatch } from 'react-redux';
import { putDriver } from '../../redux/actions';
import style from "./UpdateForm.module.css";
import { useNavigate, useParams } from 'react-router-dom';



function UpdateForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [driverData, setDriverData] = useState({
        forename: '',
        surname: '',
        image: null,
        dob: '',
        nationality: '',
        teams: '',
        description: '',
    });

    const [errors, setErrors] = useState({
        forename: '',
        surname: '',
        dob: '',
        nationality: '',
        teams: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'image') {
            const selectedImage = event.target.files[0];
            setDriverData({ ...driverData, [name]: selectedImage });
        } else {
            setDriverData({ ...driverData, [name]: value })
        }
        setErrors(validateInputs({ name, value }, errors));
    }

    const handleSubmit = async (evento) => {
        try {
            evento.preventDefault();
            const formData = new FormData();
            formData.append('forename', driverData.forename);
            formData.append('surname', driverData.surname);
            formData.append('dob', driverData.dob);
            formData.append('nationality', driverData.nationality);
            formData.append('image', driverData.image);
            formData.append('teams', driverData.teams);
            formData.append('description', driverData.description);



            await dispatch(putDriver(id, formData));
            navigate('/home');

        } catch (error) {
            alert("Driver could not be updated")
        }
    };


    return (
        <form className={style.form} onSubmit={handleSubmit}>

            <label className={style.forename} htmlFor="forename">Name</label>
            <input autoComplete='off' className={style.forenameInput} type="text" name="forename" value={driverData.email} onChange={handleChange} placeholder="Enter driver's name" />
            {errors.forename && <p className={style.forenameError}>{errors.forename}</p>}

            <label className={style.surname} html For="surename">Last name</label>
            <input autoComplete='off' className={style.surnameInput} type="text" name="surname" value={driverData.surname} onChange={handleChange} placeholder="Enter driver's last name" />
            {errors.surname && <p className={style.surnameError}>{errors.surname}</p>}

            <label className={style.image} html For="image">Image</label>
            <input autoComplete='off' className={style.imageInput} type="file" accept="image/*" name="image" onChange={handleChange} placeholder="Enter the link to the image" />

            <label className={style.dob} html For="dob">Date of birth</label>
            <input autoComplete='off' className={style.dobInput} type="text" name="dob" value={driverData.dob} onChange={handleChange} placeholder="Enter driver's birthdate" />
            {errors.dob && <p className={style.dobError}>{errors.dob}</p>}

            <label className={style.nationality} html For="nationality">Nationality</label>
            <input autoComplete='off' className={style.nationalityInput} type="text" name="nationality" value={driverData.nationality} onChange={handleChange} placeholder="Enter driver's nationality" />
            {errors.nationality && <p className={style.nationalityError}>{errors.nationality}</p>}

            <label className={style.teams} html For="teams">Team/s</label>
            <input autoComplete='off' className={style.teamsInput} type="text" name="teams" value={driverData.teams} onChange={handleChange} placeholder="Enter driver's team/s" />
            {errors.teams && <p className={style.teamsError}>{errors.teams}</p>}

            <label className={style.description} html For="description">Description</label>
            <textarea rows="4" cols="50" autoComplete='off' className={style.descriptionInput} type="text" name="description" value={driverData.description} onChange={handleChange} placeholder="Enter driver's description" />
            {errors.description && <p className={style.descriptionError}>{errors.description}</p>}

            <button className={style.submit} type="submit" disabled={validateSubmit(errors)}>Submit</button>
        </form>
    )
}

export default UpdateForm;