// write your custom hook here to control your checkout form
import {useState} from 'react'

const useForm = (key, value) => {
    const [values, setValues] = useState(key, value);

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return ([values, handleChanges])
}

export default useForm
