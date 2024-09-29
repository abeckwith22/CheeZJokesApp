import {useEffect, useState} from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

const JokeList = (numJokesToGet=5) => {
    const [jokes, setJokes] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const runOnce = async () =>{
            await getJokes();
        }
        runOnce();
    });

    const getJokes = async () => {
        try {
            // load jokes one at a time, adding not-yet-seen jokes
            let jokes = [];
            let seenJokes = new Set();

            while(jokes.length < numJokesToGet){
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });

                let { ...joke }  = res.data;

                if (!seenJokes.has(joke.id)){
                    seenJokes.add(joke.id);
                    jokes.push({ ...joke, votes: 0});
                } else {
                    console.log("duplicate found!");
                }
            }

            // sets jokes to built jokes array and sets loading to false
            setJokes(jokes);
            setIsLoading(false);


        } catch (err) {
            console.error(err)
        }
    }

    const generateNewJokes = async () => {
        setIsLoading(true);
        await getJokes();
    }

    const vote = (id, delta) => {
        setJokes(jokes => jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j));
    }
    
    const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    if(isLoading){
        return (
            <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin"/>
            </div>
        );
    }

    return (

        <div className="JokeList">
            <button className="JokeList-getmore" onClick={async () => await generateNewJokes()}>
                Get New Jokes
            </button>

            {sortedJokes.map(j => (
                <Joke
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={vote}
                />
            ))}
        </div>
    );
};

export default JokeList;