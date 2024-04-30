import axios from 'axios';
import React, { useEffect } from 'react'
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Quote = ({ res, name, fetchData }) => {
    // console.log("likes", res.userName);
    const navigate = useNavigate();
    const storeData = useSelector((store) => store.user);

    const handleLike = async (e, id) => {
        e.preventDefault();
        try {
            if (Object.keys(storeData).length === 0) return navigate("/login");
            const response = await axios.post("http://localhost:8080/like", {
                countLike: true,
                quote: { id: id },
                user: {
                    id: storeData.id
                }
            });
            fetchData();


            // console.log("resp>>>>", response);
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=' '>
            {res &&
                res.quotes.map((quote) => {
                    return (
                        <div key={quote.id} className=' p-4 border   rounded-md border-[#135D66] my-2'>
                            <div className='  flex justify-between'>
                                <h3 className=' font-semibold  w-[85%] text-justify'>{quote.content}</h3>
                                <div
                                    className='mt-2  cursor-pointer text-black text-wrap flex gap-x-2 items-center'
                                    onClick={(e) => handleLike(e, quote.id)}
                                >
                                    <BiSolidLike size={20} /> {quote && quote.likes.length}
                                </div>
                            </div>
                            <p className=' text-[18px] font-bold '> - {name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Quote
