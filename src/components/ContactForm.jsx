import React from 'react';
import { useForm } from '../hooks/useForm';

const initialForm = {
    name: "",
    email: "",
    subject: "",
    comments: ""
}

const validationForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;


    if(!form.name.trim()){
        errors.name = "Name field is required";
    }else if(!regexName.test(form.name.trim())){
        errors.name = "Only letters and white spaces on this fields";
    }

    if(!form.email.trim()){
        errors.email = "Email field is required";
    }else if(!regexEmail.test(form.email.trim())){
        errors.email = "No special characters needed";
    }

    if(!form.subject.trim()){
        errors.subject = "Subject field is required";
    }

    if(!form.comments.trim()){
        errors.comments = "Comments are required";
    }else if(!regexComments.test(form.comments.trim())){
        errors.comments = "Only 255 characteres allowed";
    }



    return errors;
}

let styles = {
    fontWeight: "bold",
    color: "#dc3545",
}

export default function ContactForm(formComponent){

    const { form,errors,loading,response,handleChange,handleBlur,handleSubmit } = useForm(initialForm,validationForm);


    return(
        <div>
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    name='name' 
                    placeholder='write a name' 
                    value={form.name} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    required>
                </input>
                {errors.name && <p style={styles}>{errors.name}</p>}
                <br></br>
                <input 
                    type='email' 
                    name='email' 
                    placeholder='write an email' 
                    value={form.email} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    required>
                </input>
                {errors.email && <p style={styles}>{errors.email}</p>}
                <input
                    type='text' 
                    name='subject' 
                    placeholder='write an subject' 
                    value={form.subject} 
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    required>
                </input>
                {errors.subject && <p style={styles}>{errors.subject}</p>}
                <textarea
                    name="comments"
                    cols="50"
                    rows="5"
                    placeholder='Write some comments'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value= {form.comments}
                    required>
                </textarea>
                {errors.comments && <p style={styles}>{errors.comments}</p>}
                <input type="submit" value="Send"></input>
            </form>
        </div>
    );
}