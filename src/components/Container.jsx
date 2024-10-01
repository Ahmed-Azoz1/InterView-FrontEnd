import React from 'react';

const Container = ({ children }) => {
    return (
        <section className="w-full max-w-[1280px] md:min-h-96 px-5 md:px-10 mx-auto my-20">
            {children}
        </section>
    );
};

export default Container;