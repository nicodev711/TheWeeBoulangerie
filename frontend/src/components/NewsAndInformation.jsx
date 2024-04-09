import React from 'react';

function NewsAndInformation() {
    // Placeholder for news data
    const news = [
        { id: 1, title: 'Lorem Ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, title: 'Dolor Sit Amet', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { id: 3, title: 'Consectetur Adipiscing', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">News and Information</h2>
            {news.map(item => (
                <div key={item.id} className="bg-white rounded shadow-md p-4 mb-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    );
}

export default NewsAndInformation;
