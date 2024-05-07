import { useEffect, useState } from "react";
import axios from 'axios';

let initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

let initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

let initialTouched = {
    firstName: false,
    lastName: false,
    email: false,
    password: false
};

export default function RegisterForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [touched, setTouched] = useState(initialTouched);
    const [userId, setUserId] = useState(null);
    const [isValid, setIsValid] = useState(false);

    const validateForm = () => {
        let valid = true;
        let newErrors = { ...initialErrors }; // Başlangıçta tüm hataları temizle

        if (formData.firstName.length <= 3) {
            newErrors.firstName = "Ad en az 3 karakter olmalıdır.";
            valid = false;
        }

        if (formData.lastName.length <= 3) {
            newErrors.lastName = "Soyad en az 3 karakter olmalıdır.";
            valid = false;
        }

        if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
            newErrors.email = "Geçerli bir email girin.";
            valid = false;
        }

        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(formData.password)) {
            newErrors.password = 'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir sembol içermelidir.';
            valid = false;
        }

        setErrors(newErrors);
        setIsValid(valid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setTouched({ ...touched, [name]: true }); // Kullanıcı bu alanı değiştirdi
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) {
            return;
        }
        axios.post('https://reqres.in/api/users', formData)
            .then(response => {
                setUserId(response.data.id);
                clearForm();
            })
            .catch(error => console.error(error));
    }

    const clearForm = () => {
        setFormData(initialFormData);
        setErrors(initialErrors);
        setIsValid(false);
        setTouched(initialTouched);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Kayıt Formu</h1>
                <div>
                    <label htmlFor="firstName">Ad:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName">Soyad:</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
                    {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit" disabled={!isValid}>Kayıt Ol</button>
                {userId && <p> Kayıt Id: {userId}</p>}
            </form>
        </>
    );
}
