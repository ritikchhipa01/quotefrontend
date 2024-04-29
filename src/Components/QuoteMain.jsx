import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Quote from './Quote';
import axios from 'axios';
import Dialog from './Dialog';

const QuoteMain = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [quote, setQuote] = useState("");
    const fetchData = async () => {
        const data = await fetch('http://localhost:8080/user');
        const res = await data.json();
        // console.log(res[0].userName);
        setData(res);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const quotePost = async (e) => {
        e.preventDefault();
        if (!quote) return alert("Please enter a quote!");
        try {
            const data = await axios.post(`http://localhost:8080/quote`, { content: quote, user: { id: "3103" } });
            console.log('data====> ', data)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(quote);
    return (
        <>
            <div className='  w-1/2 mx-auto  '>
                <div className=' flex items-center justify-between px-3 py-2 my-4 w-full border border-gray-700 rounded-md '>
                    <input type="text"
                        placeholder='Search'
                        className='mx-2 outline-none '
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IoSearchOutline size={20} color='#000' />
                </div>
                <div className=''>
                    {data && !search &&
                        data.map((res) => {
                            return (
                                <Quote key={res.id} res={res} name={res.userName} />
                            )
                        })
                    }
                    {data && search &&
                        data.filter((res) => res.userName.toLowerCase().includes(search.toLowerCase())).map((res) => {
                            return (
                                <Quote key={res.id} res={res} name={res.userName} />
                            )
                        })
                    }
                </div>
            </div>

            {/* dialog of add quote */}

            <button
                className="absolute top-5 right-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setShow(true)}
            >
                Add Quote
            </button>

            <Dialog  show={show} setShow={setShow} setQuote={setQuote} quotePost={quotePost}/>
            
        </>
    )
}

export default QuoteMain
