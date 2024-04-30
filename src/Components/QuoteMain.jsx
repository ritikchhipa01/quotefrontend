import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Quote from "./Quote";
import axios from "axios";
import Dialog from "./Dialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../slice";

const QuoteMain = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [quote, setQuote] = useState("");
    const [logout, setLogOut] = useState({});

    const storeData = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const fetchData = async () => {
        const data = await fetch("http://localhost:8080/user");
        const res = await data.json();
        setData(res);
    };

    const quotePost = async (e) => {
        e.preventDefault();
        if (!quote) return alert("Please enter a quote!");
        try {
            await axios.post(`http://localhost:8080/quote`, {
                content: quote,
                user: { id: storeData.id },
            });
            setShow(false);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddQuote = () =>
        Object.keys(storeData).length === 0 ? navigate("/login") : setShow(true);
    const LogOutHandler = () => {
        localStorage.removeItem("userInfo");
        setLogOut({});
        dispatch(addUser({}));
    };

    useEffect(() => {
        fetchData();
        setLogOut(storeData);
    }, []);

    useEffect(() => { }, [logout]);

    return (
        <>
            
            <div className=" mx-3 my-20 sm:my-0 sm:w-1/2 sm:mx-auto  ">
                <div className=" flex items-center justify-between px-3 py-2 my-4 w-full border border-gray-700 rounded-md ">
                    <input
                        type="text"
                        placeholder="Search"
                        className=" flex-1 mx-2 outline-none "
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IoSearchOutline size={20} color="#000" />
                </div>

                <div className="">
                    {data &&
                        !search &&
                        data.map((res) => {
                            return (
                                <Quote
                                    key={res.id}
                                    res={res}
                                    name={res.userName}
                                    fetchData={fetchData}
                                />
                            );
                        })}
                    {data &&
                        search &&
                        data
                            .filter((res) =>
                                res.userName.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((res) => {
                                return (
                                    <Quote
                                        key={res.id}
                                        res={res}
                                        name={res.userName}
                                        fetchData={fetchData}
                                    />
                                );
                            })}
                </div>
            </div>

            {/* dialog of add quote */}
            <div className=" right-5 top-5 sm:fixed absolute text-xl font-bold">
                {storeData && storeData.userName}
            <button
                className=" ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => handleAddQuote()}
            >
                Add Quote
            </button>
            </div>

            <button
                className="sm:fixed absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                    Object.keys(storeData).length === 0
                        ? navigate("/login")
                        : LogOutHandler();
                }}
            >
                {Object.keys(logout).length === 0 ? "Log In" : "Log Out"}
            </button>

            <Dialog
                show={show}
                setShow={setShow}
                setQuote={setQuote}
                quotePost={quotePost}
            />
        </>
    );
};

export default QuoteMain;
