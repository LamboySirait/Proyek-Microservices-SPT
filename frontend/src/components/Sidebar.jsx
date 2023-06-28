import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome, IoPersonAdd, IoFileTray, IoLogOut, IoJournal } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li>
                        <NavLink to={"/dashboard"} style={{ display: "flex" }}>
                            <IoHome className='mr-1' />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/lamarans"} style={{ display: "flex" }}>
                            <IoFileTray className='mr-1' />
                            Lamaran
                        </NavLink>
                    </li>
                </ul>

                {/* Admin Only */}
                {user && user.role === "admin" && (
                    <div>
                        <p className="menu-label">
                            Admin Only
                        </p>
                        <ul className="menu-list">
                            <li>
                                <NavLink to={"/users"} style={{ display: "flex" }}>
                                    <IoPersonAdd className='mr-1' />
                                    Users
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Setting */}
                <p className="menu-label">
                    Setting
                </p>
                <ul className="menu-list">
                    <li>
                        <button onClick={logout} className='button is-white'>
                            <IoLogOut className='mr-1' />
                            Log Out
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidebar