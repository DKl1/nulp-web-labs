import React from "react";
import "./Home.css"

const Home = () => {
    const latestNews = [
        {
            title: "New Book Release: 'The Midnight Library' by Matt Haig",
            date: "May 1, 2023",
            summary: "We are excited to announce the release of 'The Midnight Library', a novel about life, death, and the choices we make. Visit the library to check it out today!"
        },
        {
            title: "Upcoming Author Event: Sarah J. Maas",
            date: "May 15, 2023",
            summary: "Join us on May 15 for a virtual author event with Sarah J. Maas, author of the bestselling Throne of Glass series. Register now on our Events page!"
        }
    ];
    return (
        <div>
            <div className="div-main">
                <div className="div-two">
                    <h1 className="h1-main">Welcome to Quill</h1>

                    <p>
                        We are thrilled to have you here and hope that you find everything you need to satisfy your
                        literary
                        interests.
                        Our library is a place where knowledge and imagination meet,
                        and we encourage you to explore the many resources we have available.
                    </p>
                </div>
            </div>
            <div className="div-news">
                <h2>Latest News</h2>

                {latestNews.map((newsItem, index) => (
                    <div key={index} className="news-item">
                        <h3>{newsItem.title}</h3>
                        <p className="news-date">{newsItem.date}</p>
                        <p>{newsItem.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Home;