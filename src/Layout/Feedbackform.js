import React, { useEffect, useState } from 'react';
import '../Style/FeedBack.css';
import RatingStars from 'react-rating-stars-component';
import GfreshLogo from '../assets/GfreshLogo.png';
import { useNavigate } from 'react-router-dom';

function Feedbackform() {
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        phoneNumber: '',
        review: '',
        rating: 0,
        branchValue: '0',
        DateOfBirth: ''
    });
    const [loading, setLoading] = useState(true);
    const [validationMessages, setValidationMessages] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setValidationMessages(prevState => ({ ...prevState, [name]: "" }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prevState => ({ ...prevState, rating }));
        setValidationMessages(prevState => ({ ...prevState, rating: "" }));
    };

    const validateForm = () => {
        let newValidationMessages = {};
        let isValid = true;

        if (!formData.Name) {
            newValidationMessages.Name = "Name is required";
            isValid = false;
        }

        if (!formData.phoneNumber) {
            newValidationMessages.phoneNumber = "Phone No. is required";
            isValid = false;
        }

        if (!formData.DateOfBirth) {
            newValidationMessages.DateOfBirth = "Date is required";
            isValid = false;
        }

        if (!formData.review) {
            newValidationMessages.review = "Review is required";
            isValid = false;
        }

        if (formData.rating === 0) {
            newValidationMessages.rating = "Rating is required";
            isValid = false;
        }

        if (formData.branchValue === "0" || !formData.branchValue) {
            newValidationMessages.branchValue = "Please select atleast one option";
            isValid = false;
        }

        setValidationMessages(newValidationMessages);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const url = '';
            const raw = JSON.stringify({
                Parlour: formData.branchValue,
                Name: formData.Name,
                PhoneNumber: formData.phoneNumber,
                Email: formData.email,
                DateOfBirth: formData.DateOfBirth,
                ReviewMsg: formData.review,
                RatingVal: formData.rating
            })
            console.log(raw)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: raw,
            };
            setLoading(true);
            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                if (data.result === "success") {
                    navigate('/thankYou');
                } else {
                    console.log('error')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {loading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loader"></div>
                </div>
            }
            {!loading &&
                <div className='px-5'>
                    <div className='text-center pt-4 pb-4'>
                        <img src={GfreshLogo} height='100px' alt="Gfresh Logo" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='Field-label'>Parlour *</label>
                            <select className='dropdown-style' name="branchValue" value={formData.branchValue} onChange={handleChange}>
                                <option value="0">Select</option>
                                <option value="Zanzarda">Zanzarda - Junagadh</option>
                                <option value="Madhuram">Madhuram - Junagadh</option>
                                <option value="Keshod">Keshod</option>
                                <option value="Maliya">Maliya</option>
                                <option value="Talala">Talala</option>
                            </select>
                            {validationMessages.branchValue && <div className="validation-error">{validationMessages.branchValue}</div>}
                        </div>
                        <div className="form-group">
                            <label className='Field-label'>Name *</label>
                            <input type="text" name="Name" value={formData.Name} onChange={handleChange} autoComplete="new-name" />
                            {validationMessages.Name && <div className="validation-error">{validationMessages.Name}</div>}
                        </div>
                        <div className="form-group">
                            <label className='Field-label'>Phone Number * </label>
                            <input type="number" className='dropdown-style' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} autoComplete='new-tel' />
                            {validationMessages.phoneNumber && <div className="validation-error">{validationMessages.phoneNumber}</div>}
                        </div>
                        <div className="form-group">
                            <label className='Field-label'>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete='new-email' />
                        </div>
                        <div className="form-group">
                            <label className='Field-label'>Date Of Birth *</label>
                            <input className='dropdown-style' type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} autoComplete='bday' />
                            {validationMessages.DateOfBirth && <div className="validation-error">{validationMessages.DateOfBirth}</div>}
                        </div>
                        <div className="form-group">
                            <label className='Field-label'>Review Message *</label>
                            <textarea name="review" value={formData.review} onChange={handleChange} rows={2} autoComplete='off' />
                            {validationMessages.review && <div className="validation-error">{validationMessages.review}</div>}
                        </div>
                        <div className="form-group">
                            <label className='pb-0 Field-label'>Rating *</label>
                            <RatingStars classNames='ratting-style' count={5} size={40} value={formData.rating} onChange={handleRatingChange}
                                isHalf={true} activeColor="#7f8f6e" />
                            {validationMessages.rating && <div className="validation-error">{validationMessages.rating}</div>}
                        </div>
                        <button className='mb-5 submit-btn fw-600' type="submit">Submit</button>
                    </form>
                </div>
            }
        </>
    );
}

export default Feedbackform;



