import React, { useState } from 'react';

function NewsAndInformationManagement() {
    // Hardcoded news data
    const [newsItems, setNewsItems] = useState([
        { id: 1, title: 'Title 1', content: 'Content 1' },
        { id: 2, title: 'Title 2', content: 'Content 2' },
        { id: 3, title: 'Title 3', content: 'Content 3' },
    ]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">News and Information Management</h2>
            <div className="mb-4">
                <button className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition">
                    Add News
                </button>
            </div>
            <div>
                {newsItems.map(news => (
                    <div key={news.id} className="bg-white rounded-lg shadow p-6 mb-4">
                        <h3 className="text-xl font-bold">{news.title}</h3>
                        <p className="mt-2">{news.content}</p>
                        <div className="mt-4">
                            <button className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition">
                                Edit
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsAndInformationManagement;
