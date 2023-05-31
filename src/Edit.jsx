import React from 'react'
import { useState, useEffect } from 'react';
import users from '../celebrities.json'
import { Form, Link, useNavigate } from 'react-router-dom'
import { RxCrossCircled } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';

import './App.css';




function Edit() {

    const [First, setFirst] = useState('');
    const [Last, setLast] = useState('');
    const [age, setAge] = useState('');
    const [Country, setCountry] = useState('');
    const [gender, setGender] = useState('')
    const [id, setId] = useState('');
    const [dob, setDob] = useState('');
    const [Picture, setPicture] = useState('');
    const [Description, setdescription] = useState('');
    const [change, setChange] = useState(false);

    const cursor = () => {
        setChange(true)
    }



    let history = useNavigate();

    // console.log(dob);
    // const years = (dob) => {
    //     setAge(moment().diff(dob, 'years'));

    // }

    const handleCancel = () => {

        history('/');

    }


    const handleSubmit = (e) => {

        

        e.preventDefault();
        // var index = users.map(function (e) {
        //     return e.id;
        // }).indexOf(id);

        if (First.trim() === '' || Last.trim() === '' || age.trim() === '' || Country.trim() === '' || gender.trim() === '' || Description.trim() === '') {
            alert('You cannot submit this as some fields are empty');
            return;
          }
        var index = users.findIndex(x => x.id == id)

        let a = users[index];
        a.first = First;
        a.last = Last;
        a.country = Country;
        const d = new Date();
        var year = d.getFullYear();
        var finalYear = year - age;
        console.log(finalYear);
        var month = d.getMonth() + 1;
        console.log(month);
        a.dob = finalYear + '-' + month;


        a.description = Description;
        console.log(gender);
        a.gender = gender;
        console.log(gender);
        history('/');

    }


    useEffect(() => {
        setId(localStorage.getItem('id'))
        setFirst(localStorage.getItem('first'))
        setLast(localStorage.getItem('last'))
        setCountry(localStorage.getItem('country'))
        setGender(localStorage.getItem('gender'))
        setDob(localStorage.getItem('dob'))
        setAge(localStorage.getItem('age'))
        setdescription(localStorage.getItem('description'))
        setPicture(localStorage.getItem(('picture')))
    }, [])
    return (

        <form className='card' onChange={cursor}>
            <div className="row-1">
                <div className="img"><img src={Picture} alt='img' /></div>
                <input className='name first' type='text' value={First} required onChange={(e) => setFirst(e.target.value)} style={{ marginLeft: '1rem' }} />
                <input className='last' type='text' value={Last} required onChange={(e) => setLast(e.target.value)} style={{ position: 'relative', right: '16rem' }} />
                {/* <i className='arrow down'></i> */}

            </div>
            <div className="row-2">
                <div className="age">
                    Age <br />
                    <input label className='dob' type='number' value={age} required onChange={(e) => setAge(e.target.value)} style={{ width: '4rem' }} />
                </div>
                <div className="gender-edit">
                    Gender<br />
                    <select id="gender" value={gender} onChange={e => setGender(e.target.value)}>
                        <option value={gender}>{gender}</option>
                        <option value='male' >Male</option>
                        <option value="female">female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Rather not to say">Rather not to say</option>
                        <option value='others'>
                            Others
                        </option>
                    </select>
                </div>

                <div className="country-edit">
                    Country <br />
                    <input className='country' type='text' value={Country} required onChange={(e) => setCountry(e.target.value.replace(/[^a-z\s]/gi,''))} style={{ position: 'relative', rigth: '4rem', width: '5.5rem' }} />
                </div>

            </div>
            <br />

            <div className="row-3">
                Description <br />
                <textarea value={Description} required onChange={(e) => setdescription(e.target.value)} rows='8' cols='70' />
            </div>
            <div className="row-4" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px', margin: '10px' }}>
                <div className='cancel' onClick={(e) => handleCancel(e)} type='submit' style={{ cursor: 'pointer' }}><RxCrossCircled /></div>
                <div className={change ? 'submit clickable' : 'submit notClickable'} onClick={(e) => handleSubmit(e)} type='submit' ><TiTick style={{ border: '1px solid green', borderRadius: '50%' }} /></div>
            </div>
        </form >

    )
}

export default Edit