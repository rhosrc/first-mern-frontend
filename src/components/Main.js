import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
    const [people, setPeople] = useState([]);

    const URL = 'https://mern-first-build.herokuapp.com/people/';

    // retrieve all the people

    const getPeople = async function () {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    }

    const createPeople = async function (person) {
        await fetch(URL, {
            method: "POST",
            headers: { // you need headers whenever data changes
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person)
        })
        getPeople();
    }

const updatePeople = async function (person, id) {
    await fetch (URL + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(person)
    })
    getPeople();
}

const deletePeople = async function (id) {
    await fetch(URL + id, {
        method: 'DELETE'
    })
    getPeople();
}

// run getPeople one time once component is mounted
    useEffect(() => getPeople(), []);

    return(
        <main>
            <Switch>
            <Route exact path="/">
                <Index people={people} createPeople={createPeople}/>
            </Route>
            <Route path="/people/:id" render={(rp) => ( // no curly braces because it's an implicit return (we're returning only one cluster of things)
            <Show 
            {...rp}
            updatePeople={updatePeople}
            deletePeople={deletePeople}
            people={people} 
            />
            )}/>
            </Switch>
        </main>
    );
}

export default Main;