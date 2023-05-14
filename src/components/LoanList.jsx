// LoanList.js

import React from "react";

const LoanList = ({ loans }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Préstamos realizados</h2>
            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left bg-gray-100">
                    <th className="px-4 py-2">Libro</th>
                    <th className="px-4 py-2">Usuario</th>
                    <th className="px-4 py-2">Fecha de préstamo</th>
                    <th className="px-4 py-2">Fecha de devolución prevista</th>
                </tr>
                </thead>
                <tbody>
                {loans.map((loan, index) => (
                    <tr key={loan.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="px-4 py-2">{loan.book.title}</td>
                        <td className="px-4 py-2">{loan.user.name}</td>
                        <td className="px-4 py-2">{loan.loanDate}</td>
                        <td className="px-4 py-2">{loan.returnDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;
