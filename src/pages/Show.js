import { useState } from 'react';

function Show (props) {
    const id = props.match.params.id;
    const person = props.people.find(p => p._id === id);
    
    const [ editForm, setEditForm ] = useState(person);

    const handleChange = function (event) {
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value // bracket notation for computed property names
        })
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        props.updatePeople(editForm, id);
        props.history.push('/'); // returns us to the root directory
    }

    const handleClick = function (event) {
        event.preventDefault();
        props.deletePeople(id);
        props.history.push('/');
    }

    return (
        <>
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        {
            person.image && <img src={person.image} alt={person.name} />
        }
        <button id ="delete" onClick={handleClick}>DELETE</button>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name" 
            placeholder="Name"
            value={editForm.name}
            onChange={handleChange}
            />
            <br />
            <input 
            type="text" 
            name="image" 
            placeholder="Image URL"
            value={editForm.image}
            onChange={handleChange}
            />
            <br />
            <input 
            type="text" 
            name="title" 
            placeholder="Title"
            value={editForm.title}
            onChange={handleChange}
            />
            <br />
            <input type="submit" value="Update Person" />
            
        </form>
        </>
    )
}

export default Show;