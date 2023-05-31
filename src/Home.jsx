import { useState, useEffect } from 'react'
import users from '../celebrities.json'
import './App.css'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'



function Home() {

    const [data, setData] = useState(users);
    const [age, setAge] = useState();
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState('');



    let history = useNavigate();
    const handleEdit = (first, last, country, age, gender, description, picture, dob, id) => {
        localStorage.setItem('first', first)
        localStorage.setItem('last', last)
        localStorage.setItem('country', country)
        localStorage.setItem('picture', picture);
        localStorage.setItem('age', age)
        localStorage.setItem('dob', dob)
        localStorage.setItem('gender', gender)
        localStorage.setItem('description', description)
        localStorage.setItem('id', id);
    }

    const handleDelete = (id) => {
        swal({
            title: "Are you sure you want to Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var index = users.map(function (e) {
                        return e.id;
                    }).indexOf(id);
                    users.splice(index, 1);

                    history('/');

                } else {
                    swal("Your file is not deleted");
                }
            });
    }




    const years = (dob) => {

        setAge(moment().diff(dob, 'years'));

    }
    console.log(search)




    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }
        setSelected(i)

    }

    return (
        <div>


            <div className="search" style={{ position: 'relative', left: '36vw', margin: '4rem', width: "37vw", height: '34px', border: '1px solid', borderRadius: '5px' }}>
                <AiOutlineSearch />

                <input type='text'
                    placeholder='Search user...'
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "34vw", height: '24px', borderRadius: '5px', outline: 'none', border: 'none' }}
                />

            </div>




            {
                data && data.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.first.toLowerCase().includes(search) || item.last.toLowerCase().includes(search);
                }).map(({ first, last, id, dob, picture, gender, country, description, i }) => (
                    <div className="card" key={id} onClick={() => years(dob)}>
                        <div className="row-1" onClick={() => toggle(id)} >
                            <div className="img"><img src={picture} /></div>
                            <div className="name">{first} {last}</div>
                            <span>
                                {selected === id ? <AiOutlineMinus /> : <AiOutlinePlus />}
                            </span>


                        </div>

                        <div className={selected == id ? 'show' : 'hide'}>
                            <div className="row-2" >

                                <div className="dob">Age <br />{age} years</div>
                                <div className="gender"> Gender <br />{gender}</div>
                                <div className="country">Country<br />{country}</div>

                            </div>
                            <br />
                            <div className="row-3">
                                <div className="desc">Description<br />
                                    {description}</div>
                            </div>
                            <div className="row-4" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', gap: '10px', margin: '10px' }}>
                                <div onClick={() => handleDelete(id)}><RiDeleteBin6Line /></div>
                                {age >= 18 &&
                                    <Link to={`/edit`}>
                                        <div onClick={() => handleEdit(first, last, country, age, gender, description, picture, dob, id)}><GrEdit /></div>
                                    </Link>
                                }
                            </div>
                        </div>




                    </div>

                ))
            }





        </div >
    )
}

export default Home