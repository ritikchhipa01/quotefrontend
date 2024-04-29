import axios from 'axios';
import React from 'react'
import { BiSolidLike } from "react-icons/bi";


const Quote = ({ res, name }) => {
    // console.log("likes", res.userName);

    const handleLike = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/like", {
                countLike: true,
                quote: { id: id },
                user: {
                    id: "3156"
                }
            });
            console.log("resp>>>>", response);
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
                        <div key={quote.id} className=' p-4 border  rounded-md border-[#135D66] my-2'>
                            <div className=' font-semibold flex justify-between'>
                                <h3 className=' text-xl w-[75%] text-justify'>{quote.content}</h3>
                                <p className=' w-[20%]'> Author : {name}</p>
                            </div>
                            <div
                                className='mt-2  text-black text-wrap flex gap-x-2 items-center'
                                onClick={(e) => handleLike(e, quote.id)}
                            >
                                <BiSolidLike size={20} /> {quote && quote.likes.length}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Quote
