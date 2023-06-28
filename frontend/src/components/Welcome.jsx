import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <section className="hero is-info is-medium">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title has-text-centered">
                        Welcome Back,
                        <strong style={{ color: "black", fontWeight: "bold" }}>{user && user.name}</strong>

                    </h1>
                    <h2 className="subtitle has-text-centered">
                        Hope You Have A Nice Day !
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default Welcome