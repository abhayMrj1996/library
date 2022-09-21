import { useNavigate } from "react-router-dom";
import React from 'react';
import ResponsiveAppBar from "../appBar/ResponsiveAppBar";
import { useSelector } from "react-redux";


function NavBar() {
    const initialLogIn = useSelector((state) => state.loginAuth.initialLogIn);
    const navigate = useNavigate();
    const goToLibrary = () => {
        if (initialLogIn.loginState) {
            navigate("/book-library")
        }
    }
    const goToStudentList = () => {
        if (initialLogIn.loginState) {
            navigate("/student-library")
        }
    }
    const goToLogin = () => {
        if (!initialLogIn) {
            navigate("/")
        }
    }
    return (
        <div>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}>
                <ResponsiveAppBar
                    goToLibrary={goToLibrary}
                    goToStudentList={goToStudentList}
                    goToLogin={goToLogin}
                    check='passed' />

            </nav>

        </div>
    )
}
export default NavBar